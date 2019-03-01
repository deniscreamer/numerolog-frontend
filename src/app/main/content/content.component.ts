import { Component, OnInit, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';

import { MainService } from '../main.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  @ViewChild('content') components: ElementRef;

  constructor(private mainService: MainService) {}

  ngOnInit() {
    this.mainService.countLoadedComponents = this.components.nativeElement.childElementCount;
  }
}
