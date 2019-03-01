import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-streak-question',
  templateUrl: './streak-question.component.html',
  styleUrls: ['./streak-question.component.scss']
})
export class StreakQuestionComponent implements OnInit {

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.mainService.yesImLoaded();
  }

  onScrolltoContacts() {
    this.mainService.onScrollTo('contacts');
  }

}
