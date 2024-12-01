import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CodeInputComponent } from 'angular-code-input';
import { AuthenticationService } from 'src/app/services/services';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent {

  errorMessage: string = '';
  isSubmitted: boolean = false;
  isAccountActivated: boolean = false;

  @ViewChild('codeInput') codeInput !: CodeInputComponent;


  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ){}

  onCodeChange() {
    this.isSubmitted = false;
    this.errorMessage = '';
  }

  onCodeCompletion(inputToken: string) {

    this.authenticationService.activateAccount({
      token: inputToken
    }).subscribe({
      next: (response) => {
        this.isSubmitted = true;
        this.isAccountActivated = true;
      },
      error: (err) => {
        this.isSubmitted = true;
        this.isAccountActivated = false;
        this.errorMessage = err.error.error;
        this.codeInput?.reset();
      }
    });
  }

  login(){
    this.router.navigate(['login']);
  }
  // onCodeCompletion(inputToken: string) {
  //   console.log(inputToken);
  //   this.authenticationService.activateAccount({
  //     token: inputToken
  //   }).subscribe({
  //     next: () => {
  //       this.isSubmitted = true;
  //       this.isAccountActivated = true;
  //     },
  //     error: (err) => {
  //       this.isSubmitted = true;
  //       this.isAccountActivated = false;
  //       this.message = err.error.error;
  //     }
  //   });
  // }

  reActivateAccount() {
    this.isSubmitted = false;
  }

}
