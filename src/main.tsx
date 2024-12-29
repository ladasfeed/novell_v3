import { createRoot } from "react-dom/client";
import "@/assets/styles/index.css";
import { Entry } from "./index.tsx";

createRoot(document.getElementById("root")!).render(<Entry />);
