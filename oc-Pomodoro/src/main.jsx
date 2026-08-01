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

const Router =
  window.location.protocol === "file:"
    ? HashRouter
    : BrowserRouter;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/info" element={<Info />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  </StrictMode>
);