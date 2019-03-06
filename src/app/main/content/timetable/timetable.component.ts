import {
  Component,
  OnInit,
  HostListener,
  ViewEncapsulation,
} from '@angular/core';
import { DayTable } from './timetable.model';
import { MainService } from '../../main.service';

import * as moment from 'moment/moment';
import 'moment/locale/ru';
import * as momentTz from 'moment-timezone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TimetableComponent implements OnInit {
  public innerWidth: any = window.innerWidth; // set initial innerWidth display page
  slides: any = [[]]; // init empty slides before CountSlides function

  dayTable: DayTable[];

  moment = moment();
  momentTz = momentTz();

  /*
  dayTable: DayTable[] = [
    {
      date: '18.02.2019',
      weekday: 'Понедельник',
      times: [
        { time_at: '11:00', time_to: '12:00', free: true },
        { time_at: '14:00', time_to: '15:00', free: false },
        { time_at: '15:00', time_to: '16:00', free: true },
        { time_at: '17:00', time_to: '18:00', free: true },
        { time_at: '19:00', time_to: '20:00', free: true }
      ],
    }
  ];
  */

  constructor(private mainService: MainService, private router: Router) {
    this.setTimeNowTimeZone(); // set correct TimeZone And Now global date
    this.mainService.getDataFromDatabase('daytable').subscribe(result => {
      this.dayTable = this.onFilterDates(<DayTable[]>result, 3); // filter dates from today to next days (second value - days)
      this.changeCountSlides(); // count slides to timetable from width display
      this.mainService.yesImLoaded(); // send flag that a component is loaded
    });
  }

  ngOnInit() {
    // console.log(nowTime.yet);
    // console.log(moment.now(), this.nowTime.format());
    // console.log(moment().add('1', 'days').format());
    // console.log(moment().add('4', 'days').format());
  }

  showViewDate(date: string) {
    return moment(+date).format('L');
  }

  setTimeNowTimeZone() {
    moment.locale('rus');
    moment.tz.setDefault('Europe/Moscow');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.changeCountSlides(); // count slides to timetable from width display
  }

  // count slides to timetable from width display
  changeCountSlides(): void {
    if (this.innerWidth >= 1200) {
      this.slides = this.mainService.chunkSlides(this.dayTable, 4);
    } else if (this.innerWidth > 991) {
      this.slides = this.mainService.chunkSlides(this.dayTable, 3);
    } else if (this.innerWidth < 991 && this.innerWidth > 767) {
      this.slides = this.mainService.chunkSlides(this.dayTable, 2);
    } else if (this.innerWidth < 767 && this.innerWidth > 647) {
      this.slides = this.mainService.chunkSlides(this.dayTable, 1);
    } else if (this.innerWidth < 647) {
      this.slides = this.mainService.chunkSlides(this.dayTable, 1);
    }
  }

  // Send data to Order
  onOrder(date: string, time_at: string, time_to: string) {
    console.log(date + ': ' + time_at + ' => ' + time_to);
    localStorage.setItem('date', date.toString());
    localStorage.setItem('time_at', time_at.toString());
    localStorage.setItem('time_to', time_to.toString());
    this.router.navigate(['/blank']);
  }

  onFilterDates(dates: DayTable[], days: number) {
    return dates.filter(res => moment(moment.now()).add(days, 'days').isBefore(res.date));
  }
}
