import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from 'sonner';

import { ErrorBoundary } from "./components/error-boundary";

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration failed
    });
  });
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <Toaster richColors position="top-center" />
    <App />
  </ErrorBoundary>);
