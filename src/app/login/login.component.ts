import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from "ngx-alerts";
import { AuthenticationService } from '../_services/auth/auth.service'

@Component({
    templateUrl: 'login.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./login.component.css']

},
)
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;
    error: string;
    loading: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.loading= false
                    this.alertService.success(
                        "You have been logged in successfully, redirecting you to your account"
                    );
                    setTimeout(() => {
                        this.router.navigate([this.returnUrl]);
                    }, 1000);
                },
                error => {
                    this.alertService.danger("Invalid username or password");
                    this.error = "Invalid username or password";
                    this.loading = false;
                });
    }
}