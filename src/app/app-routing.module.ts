import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './main/main.module#MainModule' },
  { path: 'blank', loadChildren: './blank/blank.module#BlankModule' },
  { path: 'анкета', redirectTo: '/blank', pathMatch: 'full' },
  { path: 'предназначение', redirectTo: '/blank/1', pathMatch: 'full' },
  { path: 'взаимоотношения', redirectTo: '/blank/2', pathMatch: 'full' },
  { path: 'детская', redirectTo: '/blank/3', pathMatch: 'full' },
  { path: 'оплата', redirectTo: '/blank/pay', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
