import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

import { MDBBootstrapModulesPro } from '../../../projects/ng-uikit-pro-standard/src/lib/mdb.module';

import {
  MDBSpinningPreloader,
  CardsModule,
} from '../../../projects/ng-uikit-pro-standard/src/lib/pro/mdb-pro.module';

import {
  NavbarModule,
  WavesModule,
  ButtonsModule,
  IconsModule,
  CarouselModule,
} from '../../../projects/ng-uikit-pro-standard/src/lib/free/mdb-free.module';

import { MainService } from './main.service';
import { ParallaxModule } from 'ngx-parallax';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './content/about/about.component';
import { QuoteComponent } from './content/quote/quote.component';
import { ConsultationsComponent } from './content/consultations/consultations.component';
import { ServicesComponent } from './content/services/services.component';
import { TimetableComponent } from './content/timetable/timetable.component';
import { FaqComponent } from './content/faq/faq.component';
import { StreakQuestionComponent } from './content/streak-question/streak-question.component';
import { FeedbacksComponent } from './content/feedbacks/feedbacks.component';
import { ContactsComponent } from './content/contacts/contacts.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MainComponent,
    ContentComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    QuoteComponent,
    ConsultationsComponent,
    ServicesComponent,
    TimetableComponent,
    FaqComponent,
    StreakQuestionComponent,
    FeedbacksComponent,
    ContactsComponent
  ],
  imports: [
  CommonModule,
    FormsModule,
    MainRoutingModule,
    MDBBootstrapModulesPro.forRoot(),
    NavbarModule,
    WavesModule,
    ButtonsModule,
    IconsModule,
    ParallaxModule,
    CardsModule,
    CarouselModule
  ],
  providers: [MDBSpinningPreloader, MainService],
  schemas: [],
})
export class MainModule {}
