import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuoteComponent implements OnInit {

  quote: any;

  constructor(private mainService: MainService) {
    this.mainService.getDataFromDatabase('quote').subscribe(result => {
      this.quote = result['quote'];
      this.mainService.yesImLoaded();
    });
   }

  ngOnInit() {
  }

}
