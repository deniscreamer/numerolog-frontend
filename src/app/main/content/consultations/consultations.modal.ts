export interface Consultation {
  title: String;
  img: String;
  animation: String;
  itemsDescription: ItemDescription[];
  typesContact: TypeContact[];
  time: String;
}
export interface ItemDescription {
  title: String;
  description: String;
}
export interface TypeContact {
  title: String;
  ico: String;
  price: String;
}
