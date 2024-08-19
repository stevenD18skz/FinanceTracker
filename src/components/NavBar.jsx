// Importaciones necesarias
import React from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config"; // Asegúrate de que este sea el path correcto a tu configuración de Firebase
import { useUser } from "../context/AuthContext"; // Importa tu contexto de autenticación

export default function NavBar() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Cierra la sesión con Firebase
      setUser(null); // Limpia el usuario del contexto global
      sessionStorage.removeItem("user"); // Opcional: Limpia la información del usuario de sessionStorage
      navigate("/login"); // Redirige al usuario a la página de login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Manejar errores si es necesario
    }
  };

  return (
    <nav className="flex items-center justify-between bg-slate-900 p-4 text-white">
      <h1 className="text-2xl font-bold">Tu App</h1>
      <button
        onClick={handleSignOut}
        className="rounded-md bg-red-500 px-4 py-2 text-base font-bold text-white transition-all duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Cerrar Sesión
      </button>
    </nav>
  );
}
