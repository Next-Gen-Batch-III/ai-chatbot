import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import "./App.css";
import Home from "./pages/Home.jsx";
import { configureAuthInterceptor } from "./api/client";
import { configureSseAuth } from "./api/sseClient";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthModel from "./components/auth/AuthModal.jsx";
import ResetPassword from "./components/auth/ResetPassword.jsx";

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
        <Route path="/Auth" element={<AuthModel />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );

   

}
export default App;
