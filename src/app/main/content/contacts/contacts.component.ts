import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MainService } from '../../main.service';
import { Contacts } from './contacts.model';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  contacts: Contacts = new Contacts();
  @ViewChild('buttonBySend') buttonBySend: ElementRef;
  isSending = false;

  constructor(private mainService: MainService) {
    this.mainService.getDataFromDatabase('contacts').subscribe(result => {
      this.contacts = <Contacts>result;
      this.mainService.yesImLoaded();
    });
  }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const prepareObj = Object.assign(form.value, { answer: '', seen: false });
    const ObsSendToApi = this.mainService.onSendQuestionToApi(prepareObj);
    const ObsSendToEmail = this.mainService.onSendQuestionToEmail(prepareObj);
    this.isSending = true;
    combineLatest(ObsSendToApi, ObsSendToEmail).subscribe(
      () => {
        form.resetForm();
        this.buttonOnSuccess();
      },
      err => {
        this.buttonOnError();
      }
    );
    console.log(prepareObj);
  }

  buttonOnSuccess() {
    this.buttonBySend.nativeElement.innerText = 'Отправлено';
    setTimeout(() => {
      this.buttonBySend.nativeElement.innerText = 'Отправить';
      this.isSending = false;
    }, 1500);
  }

  buttonOnError() {
    this.buttonBySend.nativeElement.innerText = 'Ошибка';
    setTimeout(() => {
      this.buttonBySend.nativeElement.innerText = 'Отправить';
      this.isSending = false;
    }, 1500);
  }
}
