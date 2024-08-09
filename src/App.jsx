import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//IMPORTACION DE COMPONENTES
import Home from "./pages/Home";
import WishWist from "./pages/WishList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/wishlist" element={<WishWist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
