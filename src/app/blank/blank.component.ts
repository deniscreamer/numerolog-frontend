import {
  Component,
  OnInit,
  Renderer,
  HostListener,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router, ChildActivationEnd } from '@angular/router';

import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';

import { BlankService } from './blank.service';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BlankComponent implements OnInit {
  public currentBlank: any;
  consultationsBody: any;
  typeBlank = [];

  constructor(
    private preLoader: MDBSpinningPreloader,
    // tslint:disable-next-line: deprecation
    private renderer: Renderer,
    private router: Router,
    private acRoute: ActivatedRoute,
    private blankService: BlankService
  ) {
    this.blankService.getDataFromDatabase('consultations').subscribe(result => {
      this.consultationsBody = result;
      this.typeBlank = this.consultationsBody.consultations.map(
        res => res.title
      );
      this.onUpdateTitlePage();
    });
    this.router.events.subscribe(res => {
      if (res instanceof ChildActivationEnd) {
        this.onUpdateTitlePage();
      }
    });
  }

  @HostListener('touchmove', ['$event.target'])
  onTouchMove(element: any) {
    this.onRemoveFocus(element);
  }

  @HostListener('touchstart', ['$event.target'])
  onStartTouch(element: any) {
    this.onRemoveFocus(element);
  }

  ngOnInit() {
    this.preLoader.stop();
  }

  onUpdateTitlePage() {
    this.currentBlank = this.typeBlank[
      parseInt(this.acRoute.snapshot.firstChild.routeConfig.path, 10) - 1
    ];
    if (!this.currentBlank) { this.currentBlank = 'Запись онлайн'; }
  }

  // Function Remove focus from input when touchmove
  onRemoveFocus(element: any) {
    if (!(element instanceof HTMLInputElement)) {
      this.renderer.invokeElementMethod(document.activeElement, 'blur');
    }
  }
}
