import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// @ts-ignore
const $ = window['$'];

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss']
})
export class SuccessModalComponent {

  @ViewChild('successModal') modal?: ElementRef;
  message: string = '';
  closeModalRedirectionUrl: string = '';

  constructor(
    private router: Router
  ){}

  openModal(message: string, closeModalRedirectionUrl: string){
    this.message = message;
    this.closeModalRedirectionUrl = closeModalRedirectionUrl;
    $(this.modal?.nativeElement).modal('show');
  }

  closeModal(){
    $(this.modal?.nativeElement).modal('hide');
    this.router.navigate([this.closeModalRedirectionUrl]);
  }

}
