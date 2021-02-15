import React from "react";
import ClosestNeo from "./ClosestNeo";
import LargestNeo from "./LargestNeo";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import "./App.css";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="app">
          <ClosestNeo />
          <LargestNeo />
        </div>
      </MuiPickersUtilsProvider>
    </ApolloProvider>
  );
}

export default App;
