import { useLargestNeoQuery } from "./generated/graphql";
import LargestNeoChart from "./LargestNeoChart";
import { DatePicker } from "@material-ui/pickers";
import { useState } from "react";
import { CircularProgress } from "@material-ui/core";
export default function LargestNeo() {
  const [selectedStartYear, handleStartYearChange] = useState<Date | null>(
    new Date("2019-01-01")
  );
  const [selectedEndYear, handleEndYearChange] = useState<Date | null>(
    new Date("2019-12-31")
  );
  const { data, loading, error } = useLargestNeoQuery({
    variables: {
      startYear: selectedStartYear?.toISOString()?.slice(0, 4) ?? "2017",
      endYear: selectedEndYear?.toISOString()?.slice(0, 4) ?? "2019",
    },
  });
  return loading ? (
    <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
      <CircularProgress />
    </div>
  ) : (
    <>
      <h2>Largest NEO by the month</h2>

      <div className="largest-neo">
        <DatePicker
          label="Start year"
          format="yyyy"
          value={selectedStartYear}
          onChange={(date) => handleStartYearChange(date)}
          views={["year"]}
        />
        <DatePicker
          label="End year"
          format="yyyy"
          value={selectedEndYear}
          onChange={(date) => handleEndYearChange(date)}
          views={["year"]}
        />
        {!error && !loading && data && <LargestNeoChart data={data} />}
        {error && JSON.stringify(error)}
      </div>
    </>
  );
}
