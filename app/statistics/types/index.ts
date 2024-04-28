import { Ingress } from "@/app/ingress/types";

export interface Statistics {
  ingresses: IngressesStatistics;
  egresses: EgressesStatistics;
  providers: { total: number };
  moviles: { total: number };
}

export interface EgressesStatistics {
  total: number;
}

export interface IngressesStatistics {
  total: number;
  lastFourMonthsCount: LastFourMonthsCount[];
  lastMothOrders: LastMothOrders;
}

export interface LastFourMonthsCount {
  month: string;
  count: number;
}

export interface LastMothOrders {
  data: Ingress[];
  total: number;
}
