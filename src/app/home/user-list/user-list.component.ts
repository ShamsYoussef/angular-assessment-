import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/Users';
import { UsersService } from 'src/app/_services/users/users.service';
import { AlertService } from "ngx-alerts";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  allUsers: User[] = []
  current_page: number = 1;
  last_page: number;
  loading: boolean = false;

  constructor(
    private usersService: UsersService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.loadUsers(this.current_page);
  }

/*============ function to list all users  ===============*/

  loadUsers(page) {
    this.loading = true;
    this.usersService.fetchAllUsers(page)
      .subscribe((res: any) => {
        this.loading = false;
        this.allUsers = [...this.allUsers, ...res.data];
        this.last_page = res.total_pages;
        this.current_page++;
        if (this.current_page <= this.last_page) {
          this.loadUsers(this.current_page)
        }},
        error => {
          this.loading = false;
          this.alertService.danger("Something went wrong, Please try again");
        })
    
  }

/*============  edit button  ===============*/

  editUserHandler(user: User) {
    this.usersService.formData = Object.assign({}, user);
  }


}
