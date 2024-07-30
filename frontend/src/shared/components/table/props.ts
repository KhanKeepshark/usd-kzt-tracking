import type { GetCurrencyDataByRangeResponce } from "@/shared/api";

export interface TableProps {
  chartData: GetCurrencyDataByRangeResponce[];
  heads: string[];
}
