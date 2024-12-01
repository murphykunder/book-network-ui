import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookResponse, PageResponseBookResponse } from 'src/app/services/models';
import { BookService } from 'src/app/services/services';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit{
  defaultPage: number = 0;
  size: number = 4;
  bookResponse: PageResponseBookResponse = {};
  actionResult = {resultCode: '', resultMessage: '', bookId: 0};;

  constructor(
    private bookService: BookService
  ){}

  resetActionResult(){
    this.actionResult = {resultCode: '', resultMessage: '', bookId: 0};
  }

  ngOnInit(): void {
    this.findAllBooks(this.defaultPage);
  }

  findAllBooks(page: number){
    this.resetActionResult();
    this.bookService.findAllBooks({
      page: page,
      size: this.size
    })
    .subscribe({
      next:(response: PageResponseBookResponse) => {
        this.bookResponse = response;
      },
      error: (err) => {
        // if(err.error){
        // }
        // else if(err instanceof HttpErrorResponse){
        // }
      }
    })
  }

  onBorrow(book: BookResponse){
    this.resetActionResult();
    this.bookService.borrowBook({
      'book-id': book.id as number
    })
    .subscribe({
      next: () => {
        this.actionResult.resultCode="OK";
        this.actionResult.resultMessage="You have successfully borrowed the book";
        this.actionResult.bookId=book.id as number
      },
      error: (err) => {
        this.actionResult.resultCode="KO";
        this.actionResult.bookId=book.id as number
        if(err.error){
          this.actionResult.resultMessage=err.error.error;
        }
        else if(err instanceof HttpErrorResponse){
          this.actionResult.resultMessage = err.message;
        }
      }
    })
  }

}
