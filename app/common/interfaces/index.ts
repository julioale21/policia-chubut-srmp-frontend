export interface Order {
  id: string;
  date: string;
  kilometers: number;
  repair_description: string;
  order_number: string;
  fuel_level: number;
  movil: Movil;
}

export interface Movil {
  id: string;
  internal_register: string;
  domain: string;
  brand: string;
  model: string;
}
