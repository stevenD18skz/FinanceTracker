import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//IMPORTACION DE COMPONENTES
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/SingUp";
import Home from "./pages/Home";
import WishWist from "./pages/WishList";

import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/wishlist" element={<WishWist />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
