import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";

import { configureAuthInterceptor } from "./api/client";
import { configureSseAuth } from "./api/sseClient";
import { ToastProvider } from "./components/ui/Toast";

function App() {
  const { getToken } = useAuth();

  useEffect(() => {
    const cleanupAxios = configureAuthInterceptor(getToken);
    const cleanupSse = configureSseAuth(getToken);
    return () => {
      cleanupAxios();
      cleanupSse();
    };
  }, [getToken]);

  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/chat/:chatId?" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
export default App;
