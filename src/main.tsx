import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Register Service Worker for background notifications and PWA support
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/sw.js")
            .then((registration) => {
                console.log("[SW] Registered:", registration.scope);
            })
            .catch((err) => {
                console.warn("[SW] Registration failed:", err);
            });
    });
}
