import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

console.log("Main.tsx loading...");
const rootElement = document.getElementById("root");
console.log("Root element:", rootElement);

if (rootElement) {
  createRoot(rootElement).render(<App />);
  console.log("App rendered successfully");
} else {
  console.error("Could not find root element");
}
