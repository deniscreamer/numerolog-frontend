import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { BlankService } from '../blank.service';
import { BlankComponent } from '../blank.component';
import { MaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-blank3',
  templateUrl: './blank3.component.html',
  styleUrls: ['./blank3.component.scss'],
})
export class Blank3Component implements OnInit {
  destinyForm: FormGroup;

  // show status Mask for inputs
  showMaskDateBirth = false;
  showMaskTimeBirth = false;
  showMaskDateBirthParentOne = false;
  showMaskTimeBirthParentOne = false;
  showMaskDateBirthParentTwo = false;
  showMaskTimeBirthParentTwo = false;

  // status of send-button
  isSending = false;
  isSended = false;
  isSendError = false;

  constructor(
    @Inject(BlankComponent) private parent: BlankComponent,
    private serviceBlank: BlankService,
    private maskpipe: MaskPipe
  ) {
    this.destinyForm = this.onBuildForm(); // generate reactive form with controls and validators
  }

  ngOnInit() {}

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
          this.serviceBlank.onClearLocalStorage(); // remove steps from order
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

  onBuildForm() {
    return new FormGroup({
      fio: new FormControl('', {
        validators: [Validators.required, this.serviceBlank.fioControl],
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
      fio_parent_one: new FormControl('', {
        validators: [Validators.required, this.serviceBlank.fioControl],
      }),
      birth_date_parent_one: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
        ],
      }),
      birth_time_parent_one: new FormControl('', {
        validators: [Validators.minLength(0), Validators.maxLength(4)],
      }),
      fio_parent_two: new FormControl('', {
        validators: [Validators.required, this.serviceBlank.fioControl],
      }),
      birth_date_parent_two: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
        ],
      }),
      birth_time_parent_two: new FormControl('', {
        validators: [Validators.minLength(0), Validators.maxLength(4)],
      }),
      contacts: new FormControl('', { validators: [Validators.required] }),
    });
  }

  onPrepareFormToSend() {
    const formObject = {};
    formObject['fio'] = this.destinyForm.get('fio').value;
    formObject['fio_parent_one'] = this.destinyForm.get('fio_parent_one').value;
    formObject['fio_parent_two'] = this.destinyForm.get('fio_parent_two').value;
    formObject['birth_date'] = this.maskpipe.transform(
      this.destinyForm.get('birth_date').value,
      '00/00/0000'
    );
    formObject['birth_time'] = this.maskpipe.transform(
      this.destinyForm.get('birth_time').value,
      '00:00'
    );
    formObject['birth_date_parent_one'] = this.maskpipe.transform(
      this.destinyForm.get('birth_date_parent_one').value,
      '00/00/0000'
    );
    formObject['birth_time_parent_one'] = this.maskpipe.transform(
      this.destinyForm.get('birth_time_parent_one').value,
      '00:00'
    );
    formObject['birth_date_parent_two'] = this.maskpipe.transform(
      this.destinyForm.get('birth_date_parent_two').value,
      '00/00/0000'
    );
    formObject['birth_time_parent_two'] = this.maskpipe.transform(
      this.destinyForm.get('birth_time_parent_two').value,
      '00:00'
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
      case 'birth_date_parent_one':
        this.showMaskDateBirthParentOne = true;
        break;
      case 'birth_time_parent_one':
        this.showMaskTimeBirthParentOne = true;
        break;
      case 'birth_date_parent_two':
        this.showMaskDateBirthParentTwo = true;
        break;
      case 'birth_time_parent_two':
        this.showMaskTimeBirthParentTwo = true;
        break;
    }
  }
}
