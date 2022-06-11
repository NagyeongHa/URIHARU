import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import React from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <React.Suspense fallback={<div>Loading...</div>}>
      <App />
    </React.Suspense>
  </RecoilRoot>
);
