import { Component, OnInit, HostListener, ViewChildren } from '@angular/core';
import { MainService } from '../../main.service';
import { ModalDirective } from 'projects/ng-uikit-pro-standard/src/lib/free/modals/modal.directive';
import { FeedBack } from './feedback.model';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss'],
})
export class FeedbacksComponent implements OnInit {
  public innerWidth: any = window.innerWidth; // set initial innerWidth display page
  feedbacks: FeedBack[];
  slides = [[]]; // init empty slides before CountSlides function

  @ViewChildren(ModalDirective) mdbModal: any;
  /*
  feedbacks: FeedBack[] = [
    {
      src: 'feedback_1.jpg',
    }
  ];
  */

  constructor(private mainService: MainService) {
    this.mainService.getDataFromDatabase('feedbacks').subscribe(result => {
      this.feedbacks = <FeedBack[]>result;
      this.changeCountSlides();
      this.mainService.yesImLoaded();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.changeCountSlides();
  }

  ngOnInit() {}

  changeCountSlides() {
    this.slides = this.mainService.changeCountSlidesFeedbacks(
      this.innerWidth,
      this.feedbacks
    );
  }
  // This function find by indexOf from array feedbacks.
  // Becouse impossible set correct counter from two-dimensional array 'slides'
  onOpen(feedBack: FeedBack) {
    const findIdBySrc = this.feedbacks.indexOf(feedBack);
    this.mdbModal._results[+findIdBySrc].show();
  }

  // This is correctly
  onClose(id: number) {
    this.mdbModal._results[+id].hide();
  }
}
