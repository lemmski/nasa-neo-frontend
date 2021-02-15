import "./ClosestNeo.css";
import { useState } from "react";
import { DatePicker } from "@material-ui/pickers";
import { useClosestNeoQuery } from "./generated/graphql";
import Spinner from "./Spinner";
export default function ClosestNeo() {
  const [selectedStartDate, handleStartDateChange] = useState<Date | null>(
    new Date("2015-12-19")
  );
  const [selectedEndDate, handleEndDateChange] = useState<Date | null>(
    new Date("2015-12-26")
  );
  const { data, loading, error } = useClosestNeoQuery({
    variables: {
      startDate: selectedStartDate?.toISOString()?.slice(0, 10) ?? "2015-12-19",
      endDate: selectedEndDate?.toISOString()?.slice(0, 10) ?? "2015-12-26",
    },
  });
  return loading ? (
    <Spinner />
  ) : (
    <div className="closest-neo">
      <h2>Closest NEO</h2>
      <DatePicker
        label="Start date"
        format="yyyy-MM-dd"
        value={selectedStartDate}
        onChange={(date) => handleStartDateChange(date)}
      />
      <DatePicker
        label="End date"
        format="yyyy-MM-dd"
        value={selectedEndDate}
        onChange={(date) => handleEndDateChange(date)}
      />
      <div>
        {data && !error && (
          <div className="closest-neo__data">
            Closest Near Earth Object we found was{" "}
            <a
              rel="noreferrer"
              target="_blank"
              href={data?.closestNearEarthObject?.nasa_jpl_url ?? "?"}
            >
              {data?.closestNearEarthObject?.name ?? "Not Found"}
            </a>{" "}
            which missed on{" "}
            {data?.closestNearEarthObject?.close_approach_data &&
              data?.closestNearEarthObject?.close_approach_data[0]
                ?.close_approach_date}{" "}
            by{" "}
            {data?.closestNearEarthObject?.close_approach_data &&
              parseFloat(
                data?.closestNearEarthObject?.close_approach_data[0]
                  ?.miss_distance?.kilometers ?? "Infinity"
              )?.toLocaleString()}
            {" kilometers"}
          </div>
        )}
        {error && JSON.stringify(error)}
      </div>
    </div>
  );
}
