import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import MainRoutes from "./routes/MainRoutes";
import Navbar from "./Components/pages/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Components/context/authContext"; 
import Bug from "./Components/pages/Bug";

function AppWrapper() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/auth");

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/*" element={<MainRoutes />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="*" element={<Bug />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider> 
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}

export default App;
