import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// IMPORTACIÓN DE COMPONENTES
import Layout from "./components/Layout";

// IMPORTACIÓN DE PÁGINAS
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/SingUp";
import Home from "./pages/Home";

import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/login" />} />{" "}
            {/* Ruta por defecto */}
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<RegisterForm />} />
            <Route path="home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
