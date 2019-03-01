import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MenuItem } from './header/menu.modal';

import { map, tap, filter } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { MDBSpinningPreloader } from 'projects/ng-uikit-pro-standard/src/lib/pro/preloader/preloader.service';
import { WOW } from 'wowjs';
import { AppSettings } from '../shared/global.constants';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private LoadedComponents: Subject<any> = new Subject();
  public countLoadedComponents = 0;
  public menuItems: MenuItem[] = [
    { id: 'about', name: 'Обо мне' },
    { id: 'consultations', name: 'Консультации' },
    { id: 'services', name: 'Услуги' },
    { id: 'order', name: 'Запись онлайн' },
    { id: 'questions', name: 'Вопросы' },
    { id: 'feedbacks', name: 'Отзывы' },
    { id: 'contacts', name: 'Контакты' },
  ];

  constructor(
    private http: HttpClient,
    private preLoader: MDBSpinningPreloader
  ) {
    this.LoadedComponents.subscribe(() => {
      if (this.countLoadedComponents <= 0) {
        this.allowToAnimateWow();
        setTimeout(() => {
          this.preLoader.stop();
        }, 500);
      }
    });
  }

  private allowToAnimateWow() {
    new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: false,
    }).init();
  }

  public yesImLoaded() {
    this.countLoadedComponents--;
    this.LoadedComponents.next();
  }

  public getDataFromDatabase(type: string) {
    return this.http
      .get(`${AppSettings.API_ENDPOINT}/${type}`, {
        observe: 'response',
      })
      .pipe(map(result => result.body));
  }

  // Scroll View to 'id' from 'menuItems'
  public onScrollTo(id: String) {
    setTimeout(() => {
      window.document.getElementById(id.toString()).scrollIntoView();
    }, 400);
  }

  // count slides to Feedbacks from width display
  public changeCountSlidesFeedbacks(innerWidth: any, feedbacks: {}[]): any[][] {
    if (innerWidth >= 1200) {
      return this.chunkSlides(feedbacks, 4);
    } else if (innerWidth > 991) {
      return this.chunkSlides(feedbacks, 3);
    } else if (innerWidth < 991 && innerWidth > 767) {
      return this.chunkSlides(feedbacks, 2);
    } else if (innerWidth < 767 && innerWidth > 647) {
      return this.chunkSlides(feedbacks, 2);
    } else if (innerWidth < 647) {
      return this.chunkSlides(feedbacks, 1);
    }
  }

  public chunkSlides(arr: any, chunkSize: number) {
    const R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
}
