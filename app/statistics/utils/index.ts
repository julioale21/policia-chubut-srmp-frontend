export function translateMonthToSpanish(monthName: string): string {
  const monthTranslations: { [key: string]: string } = {
    January: "Enero",
    February: "Febrero",
    March: "Marzo",
    April: "Abril",
    May: "Mayo",
    June: "Junio",
    July: "Julio",
    August: "Agosto",
    September: "Septiembre",
    October: "Octubre",
    November: "Noviembre",
    December: "Diciembre",
  };

  const capitalizedMonthName =
    monthName.charAt(0).toUpperCase() + monthName.slice(1).toLowerCase();

  return monthTranslations[capitalizedMonthName] || "";
}
