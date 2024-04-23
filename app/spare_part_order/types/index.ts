export interface OrderItem {
  spare_part_id: string | undefined;
  quantity: number;
}

export interface Item {
    sparePart: SparePart;
    quantity: number;
    }

export interface SparePartOrder {
  id?: string;
  order_number: string;
  date: Date;
  observations: string;
  type: string;
  provider_id?: string;
  spare_part_items: OrderItem[];
}
