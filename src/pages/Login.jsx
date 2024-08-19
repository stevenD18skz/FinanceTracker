//importacion de librerias
import React, { useState } from "react";

//firebase
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";

//contextos y hooks
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/AuthContext";

export default function LoginForm() {
  const { setUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Hook para redirigir

  function handleLogin({ email, password }) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // El usuario ha iniciado sesión correctamente
        const user = userCredential.user;
        setUser(doc(getFirestore(), "users", user.uid));
        navigate("/wishlist");
      })
      .catch((error) => {
        // Manejar errores de autenticación
        console.error("Error al iniciar sesión:", error.message);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900">
      <div className="w-full max-w-md rounded-xl border border-cyan-500 bg-gray-800 p-8 shadow-lg">
        <header className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold text-cyan-400">
            Iniciar Sesión
          </h2>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label
              className="mb-2 text-sm font-semibold text-cyan-300"
              htmlFor="email"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Ingresa tu correo"
              className="rounded-md border border-gray-700 bg-gray-700 p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div className="flex flex-col">
            <label
              className="mb-2 text-sm font-semibold text-cyan-300"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Ingresa tu contraseña"
              className="rounded-md border border-gray-700 bg-gray-700 p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-green-500 py-3 text-base font-bold text-gray-200 transition-all duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">¿No tienes una cuenta?</p>
          <button
            onClick={() => navigate("/signup")}
            className="mt-3 w-full rounded-md bg-blue-500 py-3 text-base font-bold text-gray-200 transition-all duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Regístrate
          </button>
        </div>
      </div>
    </div>
  );
}
