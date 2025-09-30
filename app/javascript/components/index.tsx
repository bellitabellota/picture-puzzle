
import { createRoot } from "react-dom/client";
import React, { StrictMode } from 'react';
import App from "./App";

document.addEventListener("turbo:load", () => {
  const rootElement = document.createElement("div");
  rootElement.className="root";
  
  const root = createRoot(
    document.body.appendChild(rootElement)
  );
  
  root.render(
  <StrictMode>
    <App />
  </StrictMode>
  );
});


