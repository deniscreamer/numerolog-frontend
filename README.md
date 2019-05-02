# Notifications Events

![screenshot](https://pix.my/o/LRUaM8?1556789699)

## Description

 - Данный скрипт NodeJS выполняет запрос к базе MySQL, отбирая те события, на которые подписались пользователи и для которых необходимы различные уведомления (согласно флагу check_in)
 - Уведомляет согласно параметрам программы (по email или sms) о таких событиях, как: новый подписчик события, о подтверждении продавца назначеного времени и напоминание о предстоящем событии
 - Скрипт выполняется в вечном цикле, между запросами имеются задержка для исключения попадания уведомления в папку "спам".
 - Уведомления по Email используют разметку HTML в тело письма для красоты подачи информации.
 - Шаблоны используют язык PUG для удобства простановки макросов информации и небольшой логики
 
## Install

- **npm i**
- изменить параметры констант (логины, пароли, адреса серверов)
- запустить данный скрипт через процессный менеджер скриптов nodejs (**pm2**)
- Для запуска скрипта: **pm2 start ./notification_events.js**
- Для автозапуска скриптов после перезагрузки: **pm2 startup**
- Сохранить список скриптов для автозапуска: **pm2 save**


## Examples notifications

![screenshot](https://pix.my/7481mq)
![screenshot](https://pix.my/YT8Kil)
![screenshot](https://pix.my/iHiGcj)

## SQL Database [MySQL]

![screenshot](https://pix.my/FAJafkgd)

## SQL Model

```javascript
CREATE TABLE `events` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `start` timestamp NULL DEFAULT NULL,
  `end` timestamp NULL DEFAULT NULL,
  `object_id` varchar(36) NOT NULL DEFAULT '',
  `user_id` varchar(36) NOT NULL DEFAULT '',
  `title` varchar(512) NOT NULL DEFAULT '',
  `address` varchar(512) NOT NULL DEFAULT '',
  `comment` text,
  `customer_id` varchar(36) DEFAULT NULL,
  `take_date` timestamp NULL DEFAULT NULL,
  `remind_time` smallint(5) DEFAULT NULL,
  `check_in` smallint(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `email` varchar(512) NOT NULL DEFAULT '',
  `phone` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO events (id,start,end,object_id,user_id,title,address,comment,customer_id,take_date,remind_time,check_in) VALUES ('45644d73-096f-466e-90df-80b76df6c3a3',STR_TO_DATE('22/06/19 00:00','%d/%m/%Y %H:%i'),STR_TO_DATE('22/06/19 02:00','%d/%m/%Y %H:%i'),'4b6b02bb-9a9e-4f43-9011-5297614b411e','97421b97-12c7-4eb4-b605-b1124c45f91b','Teplice, Rent Apartments 1','Štúrova 442/47, Trnovany, 415 01 Teplice, Česko',NULL,NULL,NULL,NULL,NULL);
INSERT INTO events (id,start,end,object_id,user_id,title,address,comment,customer_id,take_date,remind_time,check_in) VALUES ('4e5d8bd2-29e1-4f47-bdc1-aa03f3a41a2b',STR_TO_DATE('09/04/19 00:00','%d/%m/%Y %H:%i'),STR_TO_DATE('09/04/19 02:00','%d/%m/%Y %H:%i'),'3aa854c1-3cf7-40db-b289-0dcb83c0b2e7','97421b97-12c7-4eb4-b605-b1124c45f91b','Praha, Rent Apartments 3+1','Korunní 731/10, 120 00 Praha 2-Vinohrady, Česko',NULL,NULL,NULL,NULL,NULL);
INSERT INTO events (id,start,end,object_id,user_id,title,address,comment,customer_id,take_date,remind_time,check_in) VALUES ('51748732-072b-4691-9c04-e3dc6951c041',STR_TO_DATE('01/06/19 00:00','%d/%m/%Y %H:%i'),STR_TO_DATE('01/06/19 02:00','%d/%m/%Y %H:%i'),'4b6b02bb-9a9e-4f43-9011-5297614b411e','97421b97-12c7-4eb4-b605-b1124c45f91b','Teplice, Rent Apartments 1','Štúrova 442/47, Trnovany, 415 01 Teplice, Česko',NULL,NULL,NULL,NULL,NULL);
INSERT INTO events (id,start,end,object_id,user_id,title,address,comment,customer_id,take_date,remind_time,check_in) VALUES ('54f0dd2e-8c7e-4748-8f72-671a1d8b32c0',STR_TO_DATE('21/09/19 00:00','%d/%m/%Y %H:%i'),STR_TO_DATE('21/09/19 02:00','%d/%m/%Y %H:%i'),'4b6b02bb-9a9e-4f43-9011-5297614b411e','97421b97-12c7-4eb4-b605-b1124c45f91b','Teplice, Rent Apartments 1','Štúrova 442/47, Trnovany, 415 01 Teplice, Česko',NULL,NULL,NULL,NULL,NULL);
INSERT INTO events (id,start,end,object_id,user_id,title,address,comment,customer_id,take_date,remind_time,check_in) VALUES ('55e99470-f69a-461c-aebe-da20c8dfc6db',STR_TO_DATE('01/07/19 00:00','%d/%m/%Y %H:%i'),STR_TO_DATE('01/07/19 02:00','%d/%m/%Y %H:%i'),'4b6b02bb-9a9e-4f43-9011-5297614b411e','97421b97-12c7-4eb4-b605-b1124c45f91b','Teplice, Rent Apartments 1','Štúrova 442/47, Trnovany, 415 01 Teplice, Česko',NULL,NULL,NULL,NULL,NULL);
INSERT INTO events (id,start,end,object_id,user_id,title,address,comment,customer_id,take_date,remind_time,check_in) VALUES ('5adebc30-38dc-4248-985b-7b5d13fbb2fb',STR_TO_DATE('01/04/19 00:00','%d/%m/%Y %H:%i'),STR_TO_DATE('01/04/19 02:00','%d/%m/%Y %H:%i'),'4b6b02bb-9a9e-4f43-9011-5297614b411e','97421b97-12c7-4eb4-b605-b1124c45f91b','Teplice, Rent Apartments 1','Štúrova 442/47, Trnovany, 415 01 Teplice, Česko',NULL,'8937fdfe-d3f9-40f5-9a25-b48db6c3a20c','2019-04-30 12:38:15.797191',7200,1);
INSERT INTO events (id,start,end,object_id,user_id,title,address,comment,customer_id,take_date,remind_time,check_in) VALUES ('5c721c26-ef16-4e79-8afb-f2ed9bfb9bd4',STR_TO_DATE('03/04/19 00:00','%d/%m/%Y %H:%i'),STR_TO_DATE('03/04/19 02:00','%d/%m/%Y %H:%i'),'3aa854c1-3cf7-40db-b289-0dcb83c0b2e7','97421b97-12c7-4eb4-b605-b1124c45f91b','Praha, Rent Apartments 3+1','Korunní 731/10, 120 00 Praha 2-Vinohrady, Česko',NULL,NULL,NULL,NULL,NULL);
INSERT INTO events (id,start,end,object_id,user_id,title,address,comment,customer_id,take_date,remind_time,check_in) VALUES ('5ccb04d6-767f-4586-b029-c0e5ec397178',STR_TO_DATE('01/05/19 00:00','%d/%m/%Y %H:%i'),STR_TO_DATE('01/05/19 02:00','%d/%m/%Y %H:%i'),'4b6b02bb-9a9e-4f43-9011-5297614b411e','97421b97-12c7-4eb4-b605-b1124c45f91b','Teplice, Rent Apartments 1','Štúrova 442/47, Trnovany, 415 01 Teplice, Česko',NULL,NULL,NULL,NULL,NULL);
INSERT INTO events (id,start,end,object_id,user_id,title,address,comment,customer_id,take_date,remind_time,check_in) VALUES ('60b6c93e-b04e-4e57-88cd-8d9f0215acd1',STR_TO_DATE('01/02/20 00:00','%d/%m/%Y %H:%i'),STR_TO_DATE('01/02/20 02:00','%d/%m/%Y %H:%i'),'4b6b02bb-9a9e-4f43-9011-5297614b411e','97421b97-12c7-4eb4-b605-b1124c45f91b','Teplice, Rent Apartments 1','Štúrova 442/47, Trnovany, 415 01 Teplice, Česko',NULL,NULL,NULL,NULL,NULL);
INSERT INTO events (id,start,end,object_id,user_id,title,address,comment,customer_id,take_date,remind_time,check_in) VALUES ('60e54081-18ed-417f-8164-ff92ca33ba59',STR_TO_DATE('02/05/19 00:00','%d/%m/%Y %H:%i'),STR_TO_DATE('02/05/19 02:00','%d/%m/%Y %H:%i'),'3aa854c1-3cf7-40db-b289-0dcb83c0b2e7','97421b97-12c7-4eb4-b605-b1124c45f91b','Praha, Rent Apartments 3+1','Korunní 731/10, 120 00 Praha 2-Vinohrady, Česko',NULL,'8937fdfe-d3f9-40f5-9a25-b48db6c3a20c','2019-04-30 12:38:15.797191',3600,2);
INSERT INTO events (id,start,end,object_id,user_id,title,address,comment,customer_id,take_date,remind_time,check_in) VALUES ('61f60896-cee0-4e39-bbb5-00f98298edbb',STR_TO_DATE('22/02/20 00:00','%d/%m/%Y %H:%i'),STR_TO_DATE('22/02/20 02:00','%d/%m/%Y %H:%i'),'4b6b02bb-9a9e-4f43-9011-5297614b411e','97421b97-12c7-4eb4-b605-b1124c45f91b','Teplice, Rent Apartments 1','Štúrova 442/47, Trnovany, 415 01 Teplice, Česko',NULL,NULL,NULL,NULL,NULL);
INSERT INTO events (id,start,end,object_id,user_id,title,address,comment,customer_id,take_date,remind_time,check_in) VALUES ('65c74043-8716-49bb-b1a3-b8e1ec97eb16',STR_TO_DATE('30/11/19 00:00','%d/%m/%Y %H:%i'),STR_TO_DATE('30/11/19 02:00','%d/%m/%Y %H:%i'),'4b6b02bb-9a9e-4f43-9011-5297614b411e','97421b97-12c7-4eb4-b605-b1124c45f91b','Teplice, Rent Apartments 1','Štúrova 442/47, Trnovany, 415 01 Teplice, Česko',NULL,NULL,NULL,NULL,NULL);
INSERT INTO events (id,start,end,object_id,user_id,title,address,comment,customer_id,take_date,remind_time,check_in) VALUES ('691521a1-4657-4bb9-a050-448002eea6cd',STR_TO_DATE('15/04/19 00:00','%d/%m/%Y %H:%i'),STR_TO_DATE('15/04/19 02:00','%d/%m/%Y %H:%i'),'3aa854c1-3cf7-40db-b289-0dcb83c0b2e7','97421b97-12c7-4eb4-b605-b1124c45f91b','Praha, Rent Apartments 3+1','Korunní 731/10, 120 00 Praha 2-Vinohrady, Česko',NULL,NULL,NULL,NULL,NULL);
INSERT INTO events (id,start,end,object_id,user_id,title,address,comment,customer_id,take_date,remind_time,check_in) VALUES ('70727c31-44c5-418a-a515-25275b968137',STR_TO_DATE('01/05/19 00:00','%d/%m/%Y %H:%i'),STR_TO_DATE('01/05/19 02:00','%d/%m/%Y %H:%i'),'3aa854c1-3cf7-40db-b289-0dcb83c0b2e7','97421b97-12c7-4eb4-b605-b1124c45f91b','Praha, Rent Apartments 3+1','Korunní 731/10, 120 00 Praha 2-Vinohrady, Česko',NULL,'97421b97-12c7-4eb4-b605-b1124c45f92b','2019-04-30 12:37:51.383233',86400,NULL);
INSERT INTO events (id,start,end,object_id,user_id,title,address,comment,customer_id,take_date,remind_time,check_in) VALUES ('70babc73-7b62-426a-88e8-92869b472341',STR_TO_DATE('31/08/19 00:00','%d/%m/%Y %H:%i'),STR_TO_DATE('31/08/19 02:00','%d/%m/%Y %H:%i'),'4b6b02bb-9a9e-4f43-9011-5297614b411e','97421b97-12c7-4eb4-b605-b1124c45f91b','Teplice, Rent Apartments 1','Štúrova 442/47, Trnovany, 415 01 Teplice, Česko',NULL,NULL,NULL,NULL,NULL);
INSERT INTO events (id,start,end,object_id,user_id,title,address,comment,customer_id,take_date,remind_time,check_in) VALUES ('73593eeb-6244-42fd-92fe-258615afe008',STR_TO_DATE('19/10/19 00:00','%d/%m/%Y %H:%i'),STR_TO_DATE('19/10/19 02:00','%d/%m/%Y %H:%i'),'4b6b02bb-9a9e-4f43-9011-5297614b411e','97421b97-12c7-4eb4-b605-b1124c45f91b','Teplice, Rent Apartments 1','Štúrova 442/47, Trnovany, 415 01 Teplice, Česko',NULL,NULL,NULL,NULL,NULL);

INSERT INTO users (id,email,phone) VALUES ('97421b97-12c7-4eb4-b605-b1124c45f91b','deni.screamer@gmail.com','+79996361121');
INSERT INTO users (id,email,phone) VALUES ('8937fdfe-d3f9-40f5-9a25-b48db6c3a20c','deni.screamer@gmail.com','+79999999999');
```

## Modules

 - util
 - mysql
 - nodemailer
 - email-templates
