import { Component, OnInit, ViewChild } from '@angular/core';

import { ParallaxConfig } from 'ngx-parallax';
import { NavbarComponent } from 'projects/ng-uikit-pro-standard/src/public_api';
import { MainService } from '../main.service';
import { HomeContent } from './header.modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('navbar') navbar: NavbarComponent;
  menuItems: any;
  homeContent: HomeContent = new HomeContent();

  parallaxConfig: ParallaxConfig = {
    initialValue: 0,
    ratio: 0.26,
  };

  constructor(private mainService: MainService) {
    this.menuItems = this.mainService.menuItems;
    this.mainService
    .getDataFromDatabase('home')
    .subscribe(result => {
      this.homeContent = <HomeContent>result;
    });
  }

  ngOnInit() {
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
}
