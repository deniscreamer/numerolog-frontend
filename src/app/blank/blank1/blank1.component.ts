import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';

import { BlankService } from '../blank.service';
import { BlankComponent } from '../blank.component';

import { MaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-blank1',
  templateUrl: './blank1.component.html',
  styleUrls: ['./blank1.component.scss'],
})
export class Blank1Component implements OnInit, OnDestroy {
  @ViewChild('nativeForm') nativeForm: HTMLFormElement;
  @ViewChild('buttonSubmit') buttonSubmit: HTMLButtonElement;

  public destinyForm: FormGroup;

  fio_now = false;
  fio_now_husband = true;
  date_birth_passport = false;
  date_cdie = false;

  showMaskDateBirth = false;
  showMaskTimeBirth = false;
  showMaskDateBirthReal = false;
  showMaskTimeBirthReal = false;
  showMaskClinicDie = false;

  subFioNow: Subscription;
  subBirthReal: Subscription;
  subClinicDie: Subscription;

  isSending = false;
  isSended = false;
  isSendError = false;

  constructor(
    @Inject(BlankComponent) private parent: BlankComponent,
    private maskpipe: MaskPipe,
    private serviceBlank: BlankService
  ) {}

  ngOnInit() {
    this.destinyForm = this.onBuildForm();
    this.subFioNow = this.destinyForm
      .get('fio_chbox')
      .valueChanges.subscribe(value => {
        this.setValidatorsToInput('fio_now', value, [
          Validators.required,
          this.familiaControlNow,
        ]);
      });
    this.subBirthReal = this.destinyForm
      .get('birth_chbox')
      .valueChanges.subscribe(value => {
        this.setValidatorsToInput('birth_chbox_realdate', value, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
        ]);
      });
    this.subClinicDie = this.destinyForm
      .get('clinic_die_chbox')
      .valueChanges.subscribe(value => {
        this.setValidatorsToInput('clinic_die_date', value, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
        ]);
      });
    // this.destinyForm.get('birth_date').touched
  }

  ngOnDestroy() {
    this.subBirthReal.unsubscribe();
    this.subFioNow.unsubscribe();
    this.subClinicDie.unsubscribe();
  }

  onBuildForm(): FormGroup {
    return new FormGroup({
      fio: new FormControl('', {
        validators: [Validators.required, this.serviceBlank.fioControl],
      }),
      fio_chbox: new FormControl(false),
      fio_now: new FormControl(''),
      fio_chbox_husband_chbox: new FormControl(true),
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
      birth_chbox: new FormControl(false),
      birth_chbox_realdate: new FormControl(''),
      birth_chbox_realtime: new FormControl(''),
      fromCity: new FormControl('', {
        validators: [Validators.required, this.serviceBlank.fioControl],
      }),
      clinic_die_chbox: new FormControl(false),
      clinic_die_date: new FormControl(''),
      contacts: new FormControl('', { validators: [Validators.required] }),
    });
  }

  setValidatorsToInput(
    formControlName: string,
    value: any,
    anyvalidators = []
  ) {
    const formControl = this.destinyForm.get(formControlName);
    formControl.clearValidators();
    value
      ? formControl.setValidators(anyvalidators)
      : formControl.setValidators(null);
    formControl.updateValueAndValidity();
  }

  onSubmit() {
    const postData = this.onPrepareFormToSend(); // Prepare Object with data from FormGroup to Send
    const obSendToApi = this.serviceBlank.onSendOrderToApi(postData);
    const obSendToEmail = this.serviceBlank.onSendOrderToEmail(
      postData,
      this.parent.typeBlank.indexOf(this.parent.currentBlank) + 1
    ); // indx of consultation

    if (!this.isSending) {
      this.isSending = true;

      combineLatest(obSendToApi, obSendToEmail).subscribe(
        () => {
          this.isSending = false;
          this.isSended = true;
          this.isSendError = false;
          this.serviceBlank.onOrderLocalStorage(); // ordered
          console.log('SUCCESS');
          this.serviceBlank.onRedirectToPay(); // redirect to Pay Page
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
    formObject['fio'] = this.destinyForm.get('fio').value;
    formObject['fio_chbox'] = this.destinyForm.get('fio_chbox').value;
    formObject['fio_now'] = this.destinyForm.get('fio_now').value;
    formObject['fio_chbox_husband_chbox'] = this.destinyForm.get(
      'fio_chbox_husband_chbox'
    ).value;
    formObject['birth_date'] = this.maskpipe.transform(
      this.destinyForm.get('birth_date').value,
      '00/00/0000'
    );
    formObject['birth_time'] = this.maskpipe.transform(
      this.destinyForm.get('birth_time').value,
      '00:00'
    );
    formObject['birth_chbox'] = this.destinyForm.get('birth_chbox').value;
    formObject['birth_chbox_realdate'] = this.maskpipe.transform(
      this.destinyForm.get('birth_chbox_realdate').value,
      '00/00/0000'
    );
    formObject['birth_chbox_realtime'] = this.maskpipe.transform(
      this.destinyForm.get('birth_chbox_realtime').value,
      '00:00'
    );
    formObject['from_city'] = this.destinyForm.get('fromCity').value;
    formObject['clinic_die_chbox'] = this.destinyForm.get(
      'clinic_die_chbox'
    ).value;
    formObject['clinic_die_date'] = this.maskpipe.transform(
      this.destinyForm.get('clinic_die_date').value,
      '00/00/0000'
    );
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

  // auto add "+" to input phone field in form
  onSetPlasToPhone(input: HTMLInputElement, touched: Boolean) {
    if (!touched) {
      input.value = '+';
      this.serviceBlank.onFocusInput(input, touched, '+');
    }
  }

  onFocusInput(input: HTMLInputElement, touched: Boolean, underChar: any) {
    this.setShowMask(input.getAttribute('formcontrolname'));
    this.serviceBlank.onFocusInput(input, touched, underChar);
  }

  // Move text-cursor when reach mask '/' in Date
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
      case 'birth_chbox_realdate':
        this.showMaskDateBirthReal = true;
        break;
      case 'birth_chbox_realtime':
        this.showMaskTimeBirthReal = true;
        break;
      case 'clinic_die_date':
        this.showMaskClinicDie = true;
        break;
    }
  }

  familiaControlNow(control: FormControl) {
    if (/[^-А-ЯA-Z(\x27)|(\s)а-яa-z]/.test(control.value)) {
      return {
        patternFamiliaError: true,
      };
      return null;
    }
  }
}
