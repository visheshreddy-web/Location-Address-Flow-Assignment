import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { AddressProvider } from "./contexts/AddressContext";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <AddressProvider>
        <App />
      </AddressProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
