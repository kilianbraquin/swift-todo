import "./index.css";
import { createRoot } from "react-dom/client";
import App from "@/App.tsx";
import "@/initZustandListener.ts";

const root = createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);
