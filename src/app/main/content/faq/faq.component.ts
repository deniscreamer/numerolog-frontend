import { Component, OnInit } from '@angular/core';
import { FaqQuestion } from './faq.model';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  public itemsFaqQuestions: FaqQuestion[];

  /*
  public itemsFaqQuestions: FaqQuestion[] = [
    {
      question: 'Сколько стоит?',
      answer: 'Цена, пока что, 1000 рублей. Длительность 1 час.',
    }
  ];
  */

  constructor(private mainService: MainService) {
    this.mainService.getDataFromDatabase('faq').subscribe(result => {
      this.itemsFaqQuestions = <FaqQuestion[]>result;
      this.mainService.yesImLoaded();
    });
  }

  ngOnInit() {}
}
