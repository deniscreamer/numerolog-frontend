import { Component, OnInit, Host } from '@angular/core';
import { Consultation } from './consultations.modal';
import { MainService } from '../../main.service';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.scss'],
})
export class ConsultationsComponent implements OnInit {

  titleConsultations: any;
  consultations: Consultation[];

  /*
  consultations: Consultation[] = [
    {
      title: 'Предназначение',
      img: 'consultation_1.jpg',
      animation: 'slideInLeft',
      itemsDescription: [
        { title: 'Талант', description: 'Расскажу про Ваш характер, талант и то, что мешает ему проявиться' },
        { title: 'Предназначение', description: 'Ваше предназначение в жизни, подходящая профессия, цели в жизни' },
        { title: 'Задачи', description: 'Задачи рода, воплощения, метациклов' },
        { title: 'Грубые ошибки', description: 'Ошибки которые нельзя допускать, чтобы в жизни всё получалось' },
      ],
      typesContact: [
        { title: 'Скайп', ico: 'fab fa-skype', price: '1000 ₽' },
        { title: 'Звонок', ico: 'fab fa-whatsapp', price: '1000 ₽' },
        { title: 'Текстовая', ico: 'far fa-file-alt', price: '1500 ₽' }
      ],
      time: '1 час'
    },
    {
      title: 'Взаимоотношения',
      img: 'consultation_2.jpg',
      animation: 'slideInUp',
      itemsDescription: [
        { title: 'Цель партнёрства', description: 'Цели партнеров, для чего пара вместе' },
        { title: 'Эмоции', description: 'Что чувствуют партнеры друг к другу' },
        { title: 'Конфликты', description: 'Причины конфликтов и рекомендации по их преодолению' },
        { title: 'Задачи', description: 'Задачи друг перед другом в этих отношениях и в обществе' },
      ],
      typesContact: [
        { title: 'Скайп', ico: 'fab fa-skype', price: '1000 ₽' },
        { title: 'Звонок', ico: 'fab fa-whatsapp', price: '1000 ₽' },
        { title: 'Текстовая', ico: 'far fa-file-alt', price: '1500 ₽' }
      ],
      time: '1 час'
    },
    {
      title: 'Счастливый ребёнок',
      img: 'consultation_3.jpg',
      animation: 'slideInRight',
      itemsDescription: [
        { title: 'Талант', description: 'Характер и талант ребёнка' },
        { title: 'Предназначение', description: 'Предназначение, цели и задачи в жизни' },
        { title: 'Отношения в семье', description: 'Взаимоотношения с родителями. Какой подход необходим' },
        { title: 'Кружки ВУЗы', description: 'Советы по кружкам, секциям, ВУЗам' },
      ],
      typesContact: [
        { title: 'Скайп', ico: 'fab fa-skype', price: '1000 ₽' },
        { title: 'Звонок', ico: 'fab fa-whatsapp', price: '1000 ₽' },
        { title: 'Текстовая', ico: 'far fa-file-alt', price: '1500 ₽' }
      ],
      time: '1 час'
    },
  ];
  */

  constructor(private mainService: MainService) {
    this.mainService.getDataFromDatabase('consultations').subscribe(result => {
      this.titleConsultations = result['title'];
      this.consultations = <Consultation[]>result['consultations'];
      this.mainService.yesImLoaded();
    });
  }

  ngOnInit() {}

  onScrolltoOrder(title: String) {
    localStorage.setItem('select', (+title + 1).toString());
    this.mainService.onScrollTo('order');
  }

}
