import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BookResponse, PageResponseBorrowedBookResponse } from 'src/app/services/models';
import { BookService } from 'src/app/services/services';
//@ts-ignore
const $ = window['$'];

@Component({
  selector: 'app-borrowed-book-list',
  templateUrl: './borrowed-book-list.component.html',
  styleUrls: ['./borrowed-book-list.component.scss']
})
export class BorrowedBookListComponent implements OnInit {

  borrowedBookResponse: PageResponseBorrowedBookResponse = {};
  page: number = 0;
  size: number = 5;
  errorMessage: string = '';
  returnBookSelected: BookResponse = {};
  @ViewChild('open',{read: ElementRef}) openRef!:ElementRef;
  @ViewChild('close',{read: ElementRef}) closeRef!:ElementRef;


  constructor(
    private bookService: BookService
  ){}

  ngOnInit(): void {
    this.bookService.findAllBorrowedBooks({
      page: this.page,
      size: this.size
    })
    .subscribe({
      next: (response: PageResponseBorrowedBookResponse) => {
        this.borrowedBookResponse = response;
      },
      error: (err) => {
        if(err.error?.error)
          this.errorMessage = err.error.error;
        else if(err instanceof HttpErrorResponse)
          this.errorMessage = err.message;
      }
    });
  }

  returnBook(book: BookResponse) {
    console.log('return book');
    this.returnBookSelected = book;
    this.openRef.nativeElement.click();
  }

  closeReturnBookModal(){
    this.returnBookSelected = {}
    console.log("closeReturnBookModal");
  }

}
