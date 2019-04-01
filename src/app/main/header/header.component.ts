import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HomeContent } from './header.modal';
import { MainService } from '../main.service';
import { NavbarComponent } from 'projects/ng-uikit-pro-standard/src/public_api';
import { ParallaxConfig } from 'ngx-parallax';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Metrika } from 'ng-yandex-metrika';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('navbar') navbar: NavbarComponent;
  @ViewChild('mainView') mainView: ElementRef;
  img: string;
  menuItems: any;
  homeContent: HomeContent = new HomeContent();

  parallaxConfig: ParallaxConfig = {
    initialValue: 0,
    ratio: 0.26,
  };

  constructor(
    private mainService: MainService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private metrika: Metrika
  ) {
    this.menuItems = this.mainService.menuItems;
  }

  ngOnInit() {
    const subGetDataFromDatabase = this.mainService.getDataFromDatabase('home');
    const subGetImgToBackgroundImg = this.loadBackgroundImage(
      this.mainView.nativeElement.getAttribute('url-background')
    );
    combineLatest(subGetDataFromDatabase, subGetImgToBackgroundImg).subscribe(
      ([subGet1, subGet2]) => {
        this.homeContent = <HomeContent>subGet1;
        this.img = <any>subGet2;
        setTimeout(() => {
          this.mainService.yesImLoaded();
        }, 200);
      }
    );
  }

  loadBackgroundImage(url: string): Observable<any> {
    return this.http
      .get('../../../assets/' + url, { responseType: 'blob' })
      .pipe(
        map(image => {
          const blob: Blob = new Blob([image], { type: 'image/jpeg' });
          const imageStyle = `url(${window.URL.createObjectURL(blob)})`;
          return this.sanitizer.bypassSecurityTrustStyle(imageStyle);
        })
      );
  }

  onScrollTo(id: String) {
    this.mainService.onScrollTo(id);
    if (window.innerWidth < 992) {
      this.navbar.hide();
    } // if width mobile - close navbar (mini)
  }

  detectInstagramBrowser() {
    return navigator.userAgent.match(/Instagram/i);
  }

  onNavigateToInstagram() {
    this.metrika.fireEvent('instagram');
    window.open('https://www.instagram.com/numerolog_valeria', '_blank');
  }
}
