export interface Dependency {
  id: string;
  name: string;
}

export interface Equipement {
  id: string;
  type: string;
}

export interface EquipementIngress {
  equipement: {
    id: string;
    type: string;
  };
}

export interface Ingress {
  id?: string;
  date: Date | null | undefined;
  order_number: string;
  order_status?: string;
  movil_id: string | undefined | null;
  movil?: Movil;
  kilometers: number;
  fuel_level: number;
  equipements: string[];
  equipementIngress?: EquipementIngress[];
  repair_description: string;
  status: string;
}

export interface Movil {
  id: string;
  internal_register: string;
  domain: string;
  brand: string;
  model: string;
}

export interface IFormInput {
  date: string;
  order_number: string;
  movil_ri: string;
  movil_kilometers: number;
  movil_fuel_level: number;
  description: string;
  equipements: string[];
}
