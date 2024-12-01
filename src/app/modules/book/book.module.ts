import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { MainComponent } from './pages/main/main.component';
import { NavigationMenuComponent } from './component/navigation-menu/navigation-menu.component';
import { FooterComponent } from './component/footer/footer.component';
import { BookListComponent } from './pages/book-list/book-list.component';
import { BookComponent } from './component/book/book.component';
import { RatingComponent } from './component/rating/rating.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import { MyBooksComponent } from './pages/my-books/my-books.component';
import { ManageBookComponent } from './pages/manage-book/manage-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BorrowedBookListComponent } from './pages/borrowed-book-list/borrowed-book-list.component';

@NgModule({
  declarations: [
    MainComponent,
    NavigationMenuComponent,
    FooterComponent,
    BookListComponent,
    BookComponent,
    RatingComponent,
    PaginationComponent,
    MyBooksComponent,
    ManageBookComponent,
    BorrowedBookListComponent,
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    ReactiveFormsModule
  ]
})
export class BookModule { }
