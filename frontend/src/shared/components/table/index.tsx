import type { FC } from "react";
import type { TableProps } from "./props";
import dayjs from "dayjs";
import styles from "./styles.module.scss";

export const Table: FC<TableProps> = ({ chartData, heads }) => {
  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              {heads.map((head, index) => (
                <th key={index}>{head}</th>
              ))}
            </tr>
          </thead>
          {chartData.toReversed().map((data, index) => (
            <tr key={index}>
              <td>{dayjs(data.date).format("DD MMMM YYYY")}</td>
              <td>{Math.round(data.rate)}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};
