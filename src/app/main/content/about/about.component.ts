import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { AboutContent } from './about.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  aboutContent: AboutContent = new AboutContent();

  constructor(private mainService: MainService) {
    this.mainService.getDataFromDatabase('about').subscribe(result => {
      this.aboutContent = <AboutContent>result;
      this.mainService.yesImLoaded();
    });
  }

  ngOnInit() {}
}
