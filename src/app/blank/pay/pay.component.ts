import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BlankService } from '../blank.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PayComponent implements OnInit {
  sent = false;

  constructor(
    private snackBar: MatSnackBar,
    private serviceBlank: BlankService
  ) {
    if (localStorage['ordered']) {
      this.sent = true;
      this.serviceBlank.onClearLocalStorage(); // clear steps about the order
    }
  }

  ngOnInit() {}

  copyInBuffer(message: string) {
    let msg: string;
    this._copyTextToClipboard(message)
      ? (msg = 'Скопировано в буфер обмена')
      : (msg = 'Ошибка');
    this.snackBar.open(msg, '', {
      duration: 1500,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  private _copyTextToClipboard(text: any) {
    const txtArea = document.createElement('textarea');
    txtArea.id = 'txt';
    txtArea.style.position = 'fixed';
    txtArea.style.top = '0';
    txtArea.style.left = '0';
    txtArea.style.opacity = '0';
    txtArea.value = text;
    document.body.appendChild(txtArea);
    txtArea.select();
    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
      if (successful) {
        return true;
      }
    } catch (err) {
      console.log('Oops, unable to copy');
    } finally {
      document.body.removeChild(txtArea);
    }
    return false;
  }
}
