//importacion de librerias
import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";

//firebase
import { auth } from "../firebase/config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

//contextos y hooks
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook para redirigir
  const { setUser, setUserDocData } = useAuth();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const [currentstate, setCurrentState] = useState(0);

  async function successLogin(loggedInUser) {
    //aqui en teoria deberia de recibir un dato tipo "UserCredential" ==> const user = userCredential.user;
    /**
     * en si hay 4 opciones
     * -> las credenciales
     * -> el usuario que sale de las credenciales >>>>>
     * -> la referencia al documenot del usuario
     * -> el documento usuario >>>>>
     */
    // Guardar el usuario autenticado en el contexto global
    setUser(loggedInUser);

    // Guardar el usuario en el sessionStorage

    // Obtener la referencia del documento del usuario en Firestore
    const userRef = doc(getFirestore(), "users", loggedInUser.uid);

    // Obtener los datos del documento del usuario
    const docSnapshot = await getDoc(userRef);
    if (docSnapshot.exists()) {
      setUserDocData({ id: userRef.id, ...docSnapshot.data() });
    }

    // Redirigir al usuario a la página deseada
    navigate("/wishlist");
  }

  /**
   * verifica si el usuario ya esta logueado apenas carga
   * el login, en tal caso realiza las acciones perdinentes
   */
  useEffect(() => {
    setCurrentState(1);
    onAuthStateChanged(auth, userWasLogin);
  }, []);

  function userWasLogin(user) {
    if (user) {
      setCurrentState(3);
      Toast.fire({
        icon: "success",
        title: "Log in successfull " + user.displayName,
      });
      successLogin(user);
    } else {
      setCurrentState(4);
      Toast.fire({
        icon: "error",
        title: "no hay usuario autenticado",
      });
    }
  }

  function handleLogin({ email, password }) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        successLogin(user);
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error.message);
      });
  }

  const handleGoogleSignIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const credentials = await signInWithPopup(auth, googleProvider);
      successLogin(credentials.user);
    } catch (error) {
      console.error("Error al iniciar sesión con Google", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  if (currentstate === 1)
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
          <p className="text-sm text-gray-400">¿O prefieres usar Google?</p>
          <button
            onClick={handleGoogleSignIn}
            className="mt-3 w-full rounded-md bg-red-500 py-3 text-base font-bold text-gray-200 transition-all duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Iniciar sesión con Google
          </button>
        </div>
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
