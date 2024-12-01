import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookResponse } from 'src/app/services/models';
import { BookService } from 'src/app/services/services';

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrls: ['./manage-book.component.scss']
})
export class ManageBookComponent implements OnInit {

  submitted: boolean = false;
  errorMsg: string = '';
  selectedBookCover: any;
  selectedPicture: string | undefined;
  manageBookForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  get manageBookFormControls() {
    return this.manageBookForm?.controls;
  }


  ngOnInit(): void {

    this.manageBookForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      authorName: ['', Validators.required],
      isbn: ['', Validators.required],
      synopsis: ['', Validators.required],
      bookCover: [''],
      shareable: ['']
    });

    const selectedBookId = this.activatedRoute?.snapshot?.params['bookId'];
    if(selectedBookId){
      this.bookService.findBookById({
        'book-id': selectedBookId
      })
      .subscribe({
        next: (selectedBook: BookResponse) => {
          this.manageBookFormControls['id'].setValue(selectedBook.id);
          this.manageBookFormControls['title'].setValue(selectedBook.title);
          this.manageBookFormControls['authorName'].setValue(selectedBook.authorName);
          this.manageBookFormControls['synopsis'].setValue(selectedBook.synopsis);
          this.manageBookFormControls['isbn'].setValue(selectedBook.isbn);
          this.manageBookFormControls['bookCover'].setValue(selectedBook.bookCover);
          this.manageBookFormControls['shareable'].setValue(selectedBook.shareable);
        }
      })
      ;
    }

  }

  onFileSelected(event: any) {
    this.selectedBookCover = event.target.files[0];  // only 1 file will be uploaded
    console.log(this.selectedBookCover);
    if(this.selectedBookCover){  // if the selectedBookCover is not null or empty or undefined
      const reader = new FileReader();
      // the load event of the FileReader interface is fired when a file has been read successfully.
      // the below code will be executed after the user uploads the file
      reader.onload = () => {
        this.manageBookFormControls['bookCover'].setValue(reader.result as string);
      }

      /**
       * The readAsDataURL() method of the FileReader interface is used to read the contents of the specified Blob or File. 
       * When the read operation is finished, the readyState property becomes DONE, and the loadend event is triggered. 
       * At that time, the result attribute contains the data as a data: URL representing the file's data as a base64 
       * encoded string.
       */
      reader.readAsDataURL(this.selectedBookCover);  // this will trigger onload

    }
  }

  onCancel() {
    this.router.navigate(['/books/my-books']);
  }

  saveBook() {
    this.submitted = true;
    this.errorMsg = '';

    if(this.manageBookForm.valid){
      this.bookService.saveBook({
        body: this.manageBookForm.value
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/books/my-books']);
        },
        error: (err) => {
          if(err instanceof HttpErrorResponse){
            this.errorMsg = err.message;
          }
          else{
            this.errorMsg = err.error.error;
          }
        }
      });
    }
  }

  get picture(){
    return this.manageBookForm.value.bookCover || '../../../../../assets/images/No_image.png'
  }
}
