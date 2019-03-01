export class Order {
  date: string;
  time_at: string;
  time_to: string;
}

export interface DayTable {
  date: string;
  weekday: string;
  times: TimeTable[];
}

export interface TimeTable {
  time_at: string;
  time_to: string;
  free: Boolean;
}
