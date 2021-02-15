import { CircularProgress } from "@material-ui/core";
export default function Spinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
      <CircularProgress />
    </div>
  );
}
