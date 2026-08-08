import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import "./App.css";
import Home from "./pages/Home.jsx";
import { configureAuthInterceptor } from "./api/client";
import { configureSseAuth } from "./api/sseClient";

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

  return <Home />;
}
export default App;
