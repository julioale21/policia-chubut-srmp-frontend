export function createOrderListData(
  id: string,
  date: string,
  order_number: string,
  repair_description: string,
  fuelLevel: string,
  movile: {
    id: string;
    brand: string;
    model: string;
    domain: string;
    internal_register: string;
    kilometers: number;
  }
) {
  return {
    id,
    date,
    order_number,
    repair_description,
    fuelLevel,
    movile,
  };
}
