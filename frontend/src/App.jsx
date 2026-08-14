import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import "./App.css";
import Home from "./pages/Home.jsx";
import { configureAuthInterceptor } from "./api/client";
import { configureSseAuth } from "./api/sseClient";

import KnowledgeBase from "./components/dashboard/KnowledgeBase.jsx";
import AIInstructions from "./components/dashboard/AiInstructions.jsx";
import DashboardHeader from "./components/dashboard/DashboardHeader.jsx";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import VerifyEmailPage from "./pages/VerifyEmailPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";


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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/Auth" element={<Navigate to="/signup" replace />} />
        <Route path="/ResetPassword" element={<Navigate to="/reset-password" replace />} />
        <Route path="/sign-up" element={<Navigate to="/signup" replace />} />
        <Route path = "/KnowledgeBase" element ={<KnowledgeBase/>}/>
        <Route path = "/AIInstructions" element ={<AIInstructions/>}/>
        <Route path = "/Dashboard" element ={<DashboardHeader/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
