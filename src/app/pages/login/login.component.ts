import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/services/models';
import { AuthenticationService } from 'src/app/services/services';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // this will hold the username and password entered by the user
  authRequest: AuthenticationRequest = {email: '', password: ''};
  // this will hold any error returned by the backend if the authentication fails
  errorMsg: Array<string> = [];
  loginForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  login() {
    // reset the error messages to display only the new error messages that could occur if login fails
    this.errorMsg = [];
    this.submitted = true;

    if(this.loginForm.valid) {
      this.authenticationService.authenticate({
        body: this.loginForm.value
      }).subscribe({
        next: (response) => {
          // if authenticated successfully, add the token you received in response to the localStorage
          this.tokenService.token = response.jwtToken as string;
          this.router.navigate(['books']);
        },
        error: (err) => {
          if(err.error.validationErrors){   // if validationErrors is returned in the response from backend api
            this.errorMsg = err.error.validationErrors;
          }
          else {
            this.errorMsg.push(err.error.error);  // else use the default error object returned by Angular
          }
        }
      })
    }
  }

  register() {
    this.router.navigate(['register']);
  }

}
