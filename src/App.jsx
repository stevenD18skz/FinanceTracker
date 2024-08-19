import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//IMPORTACION DE COMPONENTES
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/SingUp";
import Home from "./pages/Home";
import WishWist from "./pages/WishList";

import { UserProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/singup" element={<RegisterForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/wishlist" element={<WishWist />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
