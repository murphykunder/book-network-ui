import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {

  @Input()
  rating: number = 0;
  maxStars = 5;

  get fullStarsCount(){
    return Math.floor(this.rating);
  }

  get halfStar() {
    return this.rating % 1 != 0;
  }

  get emptyStarsCount(){
    return this.maxStars - Math.ceil(this.rating);
  }

}
