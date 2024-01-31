export function createOrderListData(
  id: string,
  date: string,
  orderNumbre: string,
  repairDescription: string,
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
    orderNumbre,
    repairDescription,
    fuelLevel,
    movile,
  };
}
