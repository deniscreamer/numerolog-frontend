import { Component, OnInit, Host } from '@angular/core';

import { BlankService } from '../blank.service';

import { Order } from './order.model';
import { DayTable } from '../../main/content/timetable/timetable.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-blank',
  templateUrl: './main-blank.component.html',
  styleUrls: ['./main-blank.component.scss'],
})
export class MainBlankComponent implements OnInit {
  order: Order = new Order();
  dayTable: DayTable;
  category: string;
  isOrder = false;
  isFree = true;

  constructor(private blankService: BlankService, private router: Router, private route: ActivatedRoute) {
    if (localStorage['select']) {
      this.category = localStorage['select'];
      localStorage.removeItem('select');
    }
    if (
      localStorage['date'] &&
      localStorage['time_at'] &&
      localStorage['time_to']
    ) {
      this.order.date = localStorage.date;
      this.order.time_at = localStorage.time_at;
      this.order.time_to = localStorage.time_to;
      this.checkIsFree(); // check date for free
    }
    if (this.category && this.isFree) {
      this.router.navigate([this.category], { relativeTo: this.route });
    }
  }

  ngOnInit() {
  }

  checkIsFree() {
    this.blankService
      .getDataFromDatabase(
        'daytable?date=' + encodeURIComponent(this.order.date)
      )
      .subscribe(result => {
        if (result[0]) {
          this.dayTable = result[0];
          this.dayTable.times.map(res => this.checkIsNotFreeInTimes(res));
        }
      });
  }

  private checkIsNotFreeInTimes(time: any) {
    if (
      time.time_at === this.order.time_at &&
      time.time_to === this.order.time_to &&
      time.free === false
    ) {
      this.isFree = false;
    }
  }
}
