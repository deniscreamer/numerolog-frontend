import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/internal/operators/map';

import { AppSettings } from '../shared/global.constants';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class BlankService {
  constructor(private http: HttpClient) {}

  public onSendOrderToApi(value: Object) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(
      `${AppSettings.API_ENDPOINT}/orders`,
      JSON.stringify(value),
      httpOptions
    );
  }

  public onSendOrderToEmail(value: Object, type: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(
      `${AppSettings.API_ENDPOINT}/sendorder/${type.toString()}`,
      JSON.stringify(value),
      httpOptions
    );
  }

  public getDataFromDatabase(type: string) {
    return this.http
      .get(`${AppSettings.API_ENDPOINT}/${type}`, {
        observe: 'response',
      })
      .pipe(map(result => result.body));
  }

  // Clear all information from localStorage (about 'select', date order)
  public onClearLocalStorage() {
    localStorage.clear();
  }

  /* ------------- General Functions to Forms ---------------- */
  // Move text-cursor when reach mask '/' in Date
  // input HTMLInputElement - Any => need modify HTMLInputElement (add custom property)
  public onMoveSelectionCursor(input: any) {
    const currentSelection = input.selectionStart;
    const previousSelection = input.previousSelection
      ? input.previousSelection
      : 0;

    if (previousSelection < currentSelection) {
      if (currentSelection === 2) {
        this.setSelectionRange(input, 3, 3);
      } else if (currentSelection === 5) {
        this.setSelectionRange(input, 6, 6);
      }
    }
    input.previousSelection = currentSelection; // Modify Input Element => Add property Previous Position
  }

  public onFocusInput(
    input: HTMLInputElement,
    touched: Boolean,
    underChar: any
  ) {
    const indexFirst = input.value.indexOf(underChar);
    setTimeout(() => {
      if (indexFirst === -1) {
        if (!touched) {
          this.setSelectionRange(input, 0, 0);
        }
      } else if (indexFirst > 1) {
        this.setSelectionRange(input, indexFirst, indexFirst);
      }
    }, 100);
  }

  private setSelectionRange(
    input: any,
    selectionStart: any,
    selectionEnd: any
  ) {
    // console.log(input);
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(selectionStart, selectionEnd);
    } else if (input.createTextRange) {
      const range = input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', selectionEnd);
      range.moveStart('character', selectionStart);
      range.select();
    }
  }

  // Global Customs Controlls for Forms
  public fioControl(control: FormControl) {
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
