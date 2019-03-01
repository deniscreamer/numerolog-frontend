import { Component, OnInit } from '@angular/core';
import { Service } from './services.model';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {

  services: Service[];

  /*
  services: Service[] = [
    {
      title: 'Подбор Вашего камня',
      description: 'Я подберу для Вас подходящий камень',
      ico: 'fas fa-gem',
      color: 'blue',
      price: '500 ₽',
    }
  ];
  */

  constructor(private mainService: MainService) {
    this.mainService.getDataFromDatabase('services').subscribe(result => {
      this.services = <Service[]>result;
      this.mainService.yesImLoaded();
    });
  }

  ngOnInit() {}

  onOrderService(idService: number) {
    console.log(idService);
  }
}
