export function getFuelLevel(value: number) {
  if (value > 0 && value <= 10) {
    return "Reserva";
  } else if (value <= 25) {
    return "1/4";
  } else if (value <= 50) {
    return "1/2";
  } else if (value <= 75) {
    return "3/4";
  } else if (value <= 100) {
    return "Lleno";
  } else {
    return "Invalid input";
  }
}
