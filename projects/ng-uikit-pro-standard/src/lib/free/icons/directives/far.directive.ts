import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({selector: '[far], [regular]'})
export class FarDirective {
  constructor(private _el: ElementRef, private _r: Renderer2) {
    this._r.addClass(this._el.nativeElement, 'far');
  }
}
