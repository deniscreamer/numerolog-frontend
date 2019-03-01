import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BlankRoutingModule } from './blank-routing.module';
import { BlankComponent } from './blank.component';

import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { NgxMaskModule, MaskPipe } from 'ngx-mask';
import { Blank1Component } from './blank1/blank1.component';
import { Blank2Component } from './blank2/blank2.component';
import { Blank3Component } from './blank3/blank3.component';
import { MainBlankComponent } from './main-blank/main-blank.component';

@NgModule({
  declarations: [
    BlankComponent,
    Blank1Component,
    Blank2Component,
    Blank3Component,
    MainBlankComponent
  ],
  imports: [
    CommonModule,
    BlankRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    MDBSpinningPreloader,
    MaskPipe
  ]
})
export class BlankModule { }
