import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../_services/users/users.service';
import { AlertService } from "ngx-alerts";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  loading: boolean = false;

  constructor(
    private usersService: UsersService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.resetForm()
  }

  /*============ function to reset form ===============*/

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.usersService.formData = {
      id: null,
      first_name: '',
      last_name: '',
      email: '',
      avatar: '',
    }
  }

  /*============ function on submit form [add or update user based on "id"] ===============*/

  onSubmit(form: NgForm) {
    this.loading = true;
    let data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null) {
      this.usersService.createUser(data).subscribe(
        data => {
          this.loading = false;
          this.alertService.success("User added successfully");
        },
        error => {
          this.loading = false;
          this.alertService.danger("Something went wrong, Please try again");
        });
    }
    else {
      this.usersService.UpdateUser(data, form.value.id).subscribe(
        data => {
          this.loading = false;
          this.alertService.success("User edited successfully");
        },
        error => {
          this.loading = false;
          this.alertService.danger("Something went wrong, Please try again");
        });
    }
    this.resetForm(form);
  }

  /*============ function to delete user ===============*/

  deleteUserHandler(form) {

    if (confirm("Are you sure to delete this User?")) {
      this.loading = true;
      this.usersService.deleteUser(form.value.id)
        .subscribe(
          data => {
            this.loading = false;
            this.alertService.warning("User deleted successfully");
          },
          error => {
            this.loading = false;
            this.alertService.danger("Something went wrong, Please try again");
          });
    }
    this.resetForm(form);
  }
}
