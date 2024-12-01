import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookResponse, PageResponseBookResponse } from 'src/app/services/models';
import { BookService } from 'src/app/services/services';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent {

  defaultPage: number = 0;
  size: number = 4;
  bookResponse: PageResponseBookResponse = {};
  errorMessage: string = '';

  constructor(
    private bookService: BookService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.findAllBooks(this.defaultPage);
  }

  findAllBooks(page: number){
    this.errorMessage = '';
    this.bookService.findAllBooksByOwner({
      page: page,
      size: this.size
    })
    .subscribe({
      next:(response: PageResponseBookResponse) => {
        this.bookResponse = response;
      },
      error: (err) => {
        if(err.error){
          this.errorMessage = err.error.error;
        }
        else if(err instanceof HttpErrorResponse){
          this.errorMessage = err.message;
        }
      }
    })
  }

  onShare(book: BookResponse) {
    this.bookService.updateShareableStatus({
      'book-id': book.id as number
    })
    .subscribe({
      next: () => {
        book.shareable = !book.shareable;
      }
    })
    ;
  }

  onEdit(book: BookResponse) {
    this.router.navigate(['books','manage', book.id]);
  }

  onArchive(book: BookResponse) {
    this.bookService.updateArchivedStatus({
      'book-id': book.id as number
    })
    .subscribe({
      next: () => {
        book.archived = !book.archived
      }
    })
  }

}
