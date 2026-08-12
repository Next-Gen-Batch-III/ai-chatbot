import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import "./App.css";
import Home from "./pages/Home.jsx";
import { configureAuthInterceptor } from "./api/client";
import { configureSseAuth } from "./api/sseClient";
import ForgotPassword from "./components/auth/ForgotPassword.jsx";
import  LoginForm from "./components/auth/LoginForm.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthModel from "./components/auth/AuthModal.jsx";

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
        <Route path ="/" element= {<Home />}/>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/Auth" element={<AuthModel />} />
      </Routes>
    </BrowserRouter>
  );

   

}
export default App;
