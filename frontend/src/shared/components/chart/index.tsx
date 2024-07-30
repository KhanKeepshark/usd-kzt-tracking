import type { WheelEventHandler, FC } from "react";
import { useState } from "react";
import type { LineChartProps } from "./props";
import { Area, AreaChart, Brush, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import dayjs from "dayjs";
import styles from "./styles.module.scss";
import { useClientMediaQuery } from "@/shared/hooks";

export const LineChart: FC<LineChartProps> = ({ chartData }) => {
  const [brushStartIndex, setBrushStartIndex] = useState(0);
  const isMobile = useClientMediaQuery("(max-width: 1024px)");
  const [brushEndIndex, setBrushEndIndex] = useState(chartData.length - 1);
  const changeBrushIndex: WheelEventHandler<HTMLDivElement> = (event) => {
    const changeSpeed = 5;
    if (event.deltaY > 0) {
      if (brushEndIndex - brushStartIndex < 10) return;
      setBrushStartIndex(brushStartIndex + changeSpeed);
    } else {
      if (brushStartIndex < 10) return setBrushStartIndex(1);
      setBrushStartIndex(brushStartIndex - changeSpeed);
    }
  };

  return (
    <div className={styles.container} onWheel={changeBrushIndex}>
      <ResponsiveContainer width="100%" height={isMobile ? 320 : 400}>
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey={(e) => dayjs(e.date).format("DD MMM")} tick={{ fontSize: 14 }} />
          <YAxis
            type="number"
            domain={([dataMin, dataMax]) => {
              const a = Math.round((dataMax - dataMin) / 4);
              return [dataMin - a, dataMax + a];
            }}
            dataKey={(e) => Math.round(e.rate)}
          />
          <Tooltip
            labelFormatter={(_, label) => {
              const date = label[0]?.payload.date;
              return date;
            }}
          />
          <Brush
            startIndex={brushStartIndex}
            travellerWidth={0}
            dataKey={() => null}
            height={isMobile ? 24 : 10}
            stroke="#8884d8"
            onChange={({ endIndex, startIndex }) => {
              if (startIndex && endIndex) {
                setBrushStartIndex(startIndex);
                setBrushEndIndex(endIndex);
              }
            }}
          />
          <Area
            type="monotone"
            dataKey="rate"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
