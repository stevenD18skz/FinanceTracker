import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//IMPORTACION DE COMPONENTES
import Login from "./pages/Login";
import RegisterForm from "./pages/SingUp";
import Home from "./pages/Home";
import WishWist from "./pages/WishList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<RegisterForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/wishlist" element={<WishWist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
