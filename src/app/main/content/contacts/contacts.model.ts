export class Contacts {
  instagram: DetailContact;
  whatsapp: DetailContact;
  email: string;

  constructor() {
    this.instagram = Object();
    this.whatsapp = Object();
  }
}

export interface DetailContact {
  name: string;
  src: string;
}
