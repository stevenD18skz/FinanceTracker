//importacion de librerias
import { useState, useEffect } from "react";

//firebase
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

//contextos y hooks
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

//IMPORTACION DE PUERTOS
import { handleGoogleSignIn, userWasLogin } from "../utils/ports/AuthPort";

export default function LoginForm() {
  const navigate = useNavigate();
  const { setUser, setUserDocData } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) =>
      userWasLogin(user, setUser, setUserDocData, navigate, setLoading),
    );
  }, [navigate, setUser, setUserDocData]);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <div className="w-full max-w-md rounded-xl border border-cyan-500 bg-gray-800 p-8 shadow-lg">
          <header className="mb-6 text-center">
            <h2 className="text-3xl font-extrabold text-cyan-400">
              Iniciar Sesión
            </h2>
          </header>

          <p className="text-center text-cyan-300">LOADING....</p>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900">
      <div className="w-full max-w-md rounded-xl border border-cyan-500 bg-gray-800 p-8 shadow-lg">
        <header className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold text-cyan-400">
            Iniciar Sesión
          </h2>
        </header>

        <div className="mt-6 text-center">
          <button
            onClick={() =>
              handleGoogleSignIn(setUser, setUserDocData, navigate)
            }
            className="mt-3 w-full rounded-md bg-red-500 py-3 text-base font-bold text-gray-200 transition-all duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Iniciar sesión con Google
          </button>
        </div>
      </div>
    </div>
  );
}
