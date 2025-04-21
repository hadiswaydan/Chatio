import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ChatRoom from "./pages/ChatRoom.jsx";
import JoinPage from "./pages/JoinPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JoinPage />} />
        <Route path="/chat" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
