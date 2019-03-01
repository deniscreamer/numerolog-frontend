import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MainService } from '../../main.service';
import { Contacts } from './contacts.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contacts: Contacts = new Contacts();

  constructor(private mainService: MainService) {
    this.mainService.getDataFromDatabase('contacts').subscribe(result => {
      this.contacts = <Contacts>result;
      this.mainService.yesImLoaded();
    });
   }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

}
