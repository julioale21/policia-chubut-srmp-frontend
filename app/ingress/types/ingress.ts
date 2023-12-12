
export interface Ingress {
    id?: string;
    date: string | null | undefined;
    order_number: string;
    order_status?: string;
    movile_id: string | undefined | null;
    kilometers: number;
    fuel_level: number;
    equipements: string[];
    repair_description: string;
}