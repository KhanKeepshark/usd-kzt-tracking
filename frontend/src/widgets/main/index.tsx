import type { GetCurrencyDataByRangeResponce } from "@/shared/api";
import { allApi } from "@/shared/api";
import type { FC } from "react";
import { lazy, useCallback, useEffect, useState } from "react";
import { useMutation } from "react-query";
import styles from "./styles.module.scss";
import { Table, Tabs } from "@/shared/components";

const LineChart = lazy(() =>
  import("@/shared/components").then((module) => ({
    default: module.LineChart
  }))
);

const items = ["1 month", "3 months", "6 months", "12 months"];
const tableHeads = ["Date", "Price"];

export const Main: FC = () => {
  const [chartData, setChartData] = useState<GetCurrencyDataByRangeResponce[]>();
  const [activeTab, setActiveTab] = useState(0);

  const { mutate: getChartData, isLoading } = useMutation({
    mutationKey: "currencyData",
    mutationFn: async (month: number) => await allApi.getCurrencyDataByRange(month ?? 6),
    onSuccess: ({ data }) => {
      setChartData(data);
    }
  });

  const getMonthData = useCallback((index: number) => {
    const selectedMonthsAmount = parseInt(items[index]);
    getChartData(selectedMonthsAmount);
    setActiveTab(index);
  }, []);

  useEffect(() => {
    getChartData(1);
  }, []);

  return (
    <div className={styles.container}>
      <Tabs activeTab={activeTab} setActiveTab={getMonthData} items={items} />
      {isLoading && <div>Loading...</div>}
      {!isLoading && chartData && (
        <>
          <Table heads={tableHeads} chartData={chartData} />
          <LineChart chartData={chartData} />
        </>
      )}
    </div>
  );
};
