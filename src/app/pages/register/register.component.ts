import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationRequest } from 'src/app/services/models';
import { AuthenticationService } from 'src/app/services/services';
import { SuccessModalComponent } from '../common/success-modal/success-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild(SuccessModalComponent) modal?: SuccessModalComponent;

  // this will hold any error message returned by backend if the registration fails
  errorMessage: Array<string> = [];
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    // the register form should be of the same structure as the RegistrationRequest
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  get registerFormControls() {
    return this.registerForm.controls;
  }

  register(){
    this.submitted = true;

    if(this.registerForm.valid){
        // reset the error messages to display only the new error messages that could occur if login fails
      this.errorMessage = [];

      this.authenticationService.register({
        body: this.registerForm.value
      }).subscribe({
        next: (response) => {
          if(this.modal){
            this.modal.openModal("Your account has been created successfully. You will receive a mail shortly on " + this.registerForm.value?.email + " to activate your account.", "login");  
          }
        },
        error: (err) => {
          if(err.error.validationErrors){
            this.errorMessage = err.error.validationErrors;
          }
          else{
            this.errorMessage.push(err.error.error);
          }
        },

      });

    }

  }

  login() {
    this.router.navigate(['login']);
  }

}
