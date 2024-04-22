import { Movil } from "@/app/common/interfaces";
import { Ingress } from "@/app/ingress/types";
import { Mechanic } from "@/app/mechanic/types";

export interface EgressOrder {
  id: string;
  date: Date;
  observations: string;
  order_number: string;
  deletedAt: null;
  movil: Movil;
  ingress: Ingress;
  mechanic: Mechanic;
  mechanic_boss: Mechanic;
  spare_part_order: SparePartOrder;
}

export interface SparePartOrder {
  id: string;
  order_number: string;
  date: Date;
  observations: string;
  type: string;
}


export interface SparePartDto {
  id?: string;
  quantity: number;
}

export interface CreateEgressDto {
  date: Date;
  observations: string;
  order_number: string;
  mechanic_boss_id: string;
  mechanic_id: string;
  movil_id: string;
  ingress_id: string;
  spare_parts: SparePartDto[];
}
