import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit, AfterViewInit {
  constructor() {
    this.fixVhMobile(); // fix vh css on mobile
    this.detectMobileDevices(); // add css class to detect mobile devices
    localStorage.clear(); // remove client's trace
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  // Fix css vh on mobile for parallax (add property to html tag --vh in pixels)
  fixVhMobile() {
    window.addEventListener('load', function() {
      window.scrollTo(0, 0);
    });
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  // Add css class in tag <html> when detect mobile device
  detectMobileDevices() {
    const classNames = [];
    if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) {
      classNames.push('device-ios');
    }
    if (navigator.userAgent.match(/android/i)) {
      classNames.push('device-android');
    }

    const html = document.getElementsByTagName('html')[0];

    if (classNames.length) {
      classNames.push('on-device');
    }
    if (html.classList) {
      html.classList.add.apply(html.classList, classNames);
    }
  }
}
