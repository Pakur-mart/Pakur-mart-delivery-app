import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from 'sonner';

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

createRoot(document.getElementById("root")!).render(
  <>
    <Toaster richColors position="top-center" />
    <App />
  </>);
