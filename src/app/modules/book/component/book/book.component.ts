import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookResponse } from 'src/app/services/models';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
  @Input() book: BookResponse = {};
  @Input() actionResult = {resultCode: '', resultMessage: '', bookId: 0};
  @Input() manage: boolean = false;

  @Output() private share: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private archive: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private addToWaitingList: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private borrow: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private edit: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private details: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();

  onArchive() {
    this.archive.emit(this.book);
  }

  onShare() {
    this.share.emit(this.book);
  }

  onEdit() {
    this.edit.emit(this.book);
  }

  onAddToWaitingList() {
    this.addToWaitingList.emit(this.book);
  }

  onBorrow() {
    this.borrow.emit(this.book);
  }

  onShowDetails() {
    this.details.emit(this.book);
  }

}
