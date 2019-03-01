import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlankComponent } from './blank.component';
import { Blank1Component } from './blank1/blank1.component';
import { Blank2Component } from './blank2/blank2.component';
import { Blank3Component } from './blank3/blank3.component';
import { MainBlankComponent } from './main-blank/main-blank.component';

const routes: Routes = [
  { path: '', component: BlankComponent, children: [
    { path: '', component: MainBlankComponent, pathMatch: 'full' },
    { path: '1', component: Blank1Component },
    { path: '2', component: Blank2Component },
    { path: '3', component: Blank3Component }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlankRoutingModule { }
