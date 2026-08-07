import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./index.css";

import App from "./App";
import Info from "./Info";
import Stats from "./Stats";

const isElectron = window.location.protocol === "file:";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {isElectron ? (
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/info" element={<Info />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </HashRouter>
    ) : (
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/info" element={<Info />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </BrowserRouter>
    )}
  </StrictMode>
);