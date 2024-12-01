import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() page!: number;
  @Input() totalPages!: number;
  @Input() isFirst: boolean = false;
  @Input() isLast: boolean = false;
  @Output() handleClick = new EventEmitter();

  goToLastPage() {
    this.page = this.totalPages as number - 1;
    this.handleClick.emit(this.page);
  }

  goToNextPage() {
    this.page++;
    this.handleClick.emit(this.page);
  }

  goToPage(selectedPage: number) {
    this.page = selectedPage;
    this.handleClick.emit(this.page);
  }

  goToPreviousPage() {
    this.page--;
    this.handleClick.emit(this.page);
  }

  goToFirstPage() {
    this.page = 0;
    this.handleClick.emit(this.page);
  }

}
