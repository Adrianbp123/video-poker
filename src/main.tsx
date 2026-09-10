import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import GamePage from "./pages/GamePage.tsx";
import RulesPage from "./pages/RulesPage.tsx";
import PlayersPage from "./pages/PlayersPage.tsx";
import Header from "./header/Header.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <Header />
    
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/players" element={<PlayersPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
