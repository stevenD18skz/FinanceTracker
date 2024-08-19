import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { getFirestore, doc } from "firebase/firestore";

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
        //console.info("Inicio de sesión exitoso:", user);

        const queryDb = getFirestore();
        const userDocRef = doc(queryDb, "users", user.uid); // Obtén la referencia del documento del usuario

        setUser(userDocRef);
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
    <div className="min-h-dvh items-center bg-slate-900">
      <div className="mx-auto w-8/12 pt-12">
        <div className="mx-auto my-auto w-10/12 max-w-md truncate rounded-xl border-2 border-cyan-500 bg-gray-800 p-6 text-gray-200 shadow-lg">
          <header className="mb-4">
            <h2 className="text-2xl font-bold capitalize text-cyan-400">
              Iniciar Sesión
            </h2>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label
                className="mb-2 font-semibold text-cyan-300"
                htmlFor="email"
              >
                Correo Electrónico:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Ingresa tu correo"
                className="w-full rounded-md bg-gray-600 p-2 text-gray-300"
              />
            </div>

            <div className="flex flex-col">
              <label
                className="mb-2 font-semibold text-cyan-300"
                htmlFor="password"
              >
                Contraseña:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Ingresa tu contraseña"
                className="w-full rounded-md bg-gray-600 p-2 text-gray-300"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded bg-green-500 px-4 py-2 text-sm font-semibold text-gray-200 transition-all duration-300 hover:bg-green-600 hover:text-white"
            >
              Iniciar Sesión
            </button>
          </form>

          <button
            onClick={() => navigate("/singup")}
            className="w-full rounded bg-blue-500 px-4 py-2 text-sm font-semibold text-gray-200 transition-all duration-300 hover:bg-blue-600 hover:text-white"
          >
            Sing up
          </button>
        </div>
      </div>
    </div>
  );
}
