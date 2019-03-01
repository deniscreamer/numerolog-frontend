import { Component, OnInit, Host, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BlankService } from '../blank.service';
import { MaskPipe } from 'ngx-mask';
import { BlankComponent } from '../blank.component';
import { delay } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-blank2',
  templateUrl: './blank2.component.html',
  styleUrls: ['./blank2.component.scss'],
})
export class Blank2Component implements OnInit {
  destinyForm: FormGroup; // main Form

  // show status Mask for inputs
  showMaskDateBirth = false;
  showMaskTimeBirth = false;
  showMaskDateBirthPartner = false;
  showMaskTimeBirthPartner = false;

  // status of send-button
  isSending = false;
  isSended = false;
  isSendError = false;

  constructor(
    @Inject(BlankComponent) private parent: BlankComponent,
    private maskpipe: MaskPipe,
    private serviceBlank: BlankService
  ) {
    this.destinyForm = this.onBuildForm(); // generate reactive form with controls and validators
  }

  ngOnInit() {}

  onSubmit() {
    const postData = this.onPrepareFormToSend(); // Prepare Object with data from FormGroup to Send
    const obSendToApi = this.serviceBlank.onSendOrderToApi(postData);
    const obSendToEmail = this.serviceBlank.onSendOrderToEmail(postData, 2); // 2 - indx of consultation

    if (!this.isSending) {
      this.isSending = true;

      combineLatest(obSendToApi, obSendToEmail).subscribe(
        () => {
          this.isSending = false;
          this.isSended = true;
          this.isSendError = false;
          console.log('SUCCESS');
        },
        e => {
          this.isSending = false;
          this.isSended = false;
          this.isSendError = true;
          console.error(e);
        }
      );
    }
  }

  private onPrepareFormToSend() {
    const formObject = {};
    const dateRead = new Date();
    formObject['fio'] = this.destinyForm.get('fio').value;
    formObject['fio_partner'] = this.destinyForm.get('fio_partner').value;
    formObject['birth_date'] = this.maskpipe.transform(
      this.destinyForm.get('birth_date').value,
      '00/00/0000'
    );
    formObject['birth_time'] = this.maskpipe.transform(
      this.destinyForm.get('birth_time').value,
      '00:00'
    );
    formObject['birth_date_partner'] = this.maskpipe.transform(
      this.destinyForm.get('birth_date_partner').value,
      '00/00/0000'
    );
    formObject['birth_time_partner'] = this.maskpipe.transform(
      this.destinyForm.get('birth_time_partner').value,
      '00:00'
    );
    formObject['married'] = this.destinyForm.get('married').value;
    formObject['contacts'] = this.destinyForm.get('contacts').value;
    formObject['completed'] = false;
    formObject['payed'] = false;
    formObject['select'] = this.parent.currentBlank; // from Parent Component (BlankComponent) kind of consultation
    formObject['date'] = localStorage['date'] ? localStorage['date'] : '';
    formObject['dateread'] = localStorage['date']
      ? new Date(localStorage['date']).toLocaleDateString('ru-RU')
      : '';
    formObject['timeat'] = localStorage['time_at']
      ? localStorage['time_at']
      : '';
    formObject['timeto'] = localStorage['time_to']
      ? localStorage['time_to']
      : '';
    return formObject;
  }

  onBuildForm() {
    return new FormGroup({
      fio: new FormControl('', {
        validators: [Validators.required, this.fioControl],
      }),
      fio_partner: new FormControl('', {
        validators: [Validators.required, this.fioControl],
      }),
      birth_date: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
        ],
      }),
      birth_time: new FormControl('', {
        validators: [Validators.minLength(0), Validators.maxLength(4)],
      }),
      birth_date_partner: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
        ],
      }),
      birth_time_partner: new FormControl('', {
        validators: [Validators.minLength(0), Validators.maxLength(4)],
      }),
      married: new FormControl(false),
      contacts: new FormControl('', { validators: [Validators.required] }),
    });
  }

  onFocusInput(input: HTMLInputElement, touched: Boolean, underChar: any) {
    this.setShowMask(input.getAttribute('formcontrolname'));
    this.serviceBlank.onFocusInput(input, touched, underChar);
  }

  // Move text-cursor when reach mask char '/' in Date
  // input HTMLInputElement - Any => need modify HTMLInputElement (add custom property)
  onMoveSelectionCursor(input: any) {
    this.serviceBlank.onMoveSelectionCursor(input);
  }

  setShowMask(variable: string) {
    switch (variable) {
      case 'birth_date':
        this.showMaskDateBirth = true;
        break;
      case 'birth_time':
        this.showMaskTimeBirth = true;
        break;
      case 'birth_date_partner':
        this.showMaskDateBirthPartner = true;
        break;
      case 'birth_time_partner':
        this.showMaskTimeBirthPartner = true;
        break;
    }
  }

  // custom Validator for FIO
  fioControl(control: FormControl) {
    const valueFio = control.value.split(' ');

    if (valueFio.length < 2) {
      return {
        countWordsError: true,
      };
    }

    for (let i = 0; i < valueFio.length; i++) {
      if (/[^-А-ЯA-Z\x27а-яa-z]/.test(valueFio[i])) {
        return {
          patternFioError: true,
        };
      }
    }

    return null;
  }
}
