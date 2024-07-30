import type { AxiosResponse } from "axios";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/"
});

export interface GetCurrencyDataByRangeResponce {
  id: number;
  rate: number;
  date: string;
}

export const allApi = {
  getCurrencyDataByRange(range: number): Promise<AxiosResponse<GetCurrencyDataByRangeResponce[]>> {
    return apiClient.get("/", {
      params: {
        range
      }
    });
  }
};
