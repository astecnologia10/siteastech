import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/globals.css";
import App from "@/App";
import { BriefingPage } from "@/pages/BriefingPage";

const path = window.location.pathname.replace(/\/+$/, "");
const isBriefing = path === "/briefing";

createRoot(document.getElementById("root")!).render(
  <StrictMode>{isBriefing ? <BriefingPage /> : <App />}</StrictMode>
);
