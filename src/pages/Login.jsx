//importacion de librerias
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

//firebase
import { auth } from "../firebase/config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

//contextos y hooks
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook para redirigir

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

  const { setUser } = useUser();
  const [currentUser, setCurrentUser] = useState(null);
  /*
  0: iniicializado
  1: loading
  2: login completo
  3: login pero sin registro
  4: no hay nadie logueado
  */
  const [currentstate, setCurrentState] = useState(0);

  useEffect(() => {
    setCurrentState(1);
    onAuthStateChanged(auth, handleUserStateChanged);
  }, []);

  function handleUserStateChanged(user) {
    if (user) {
      setCurrentState(3);
      console.log(user);
      Toast.fire({
        icon: "success",
        title: "Log in successfull " + user.displayName,
      });
      //caso del login ya hehco
      const userDoc = doc(getFirestore(), "users", user.uid);
      setUser(userDoc);
      sessionStorage.setItem("user", JSON.stringify(userDoc));
      navigate("/home");
    } else {
      setCurrentState(4);
      console.log("no hay usuario autenticado");
    }
  }

  function handleLogin({ email, password }) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // El usuario ha iniciado sesión correctamente
        const user = userCredential.user;

        //acciones a hacer cuando el usuario ya se logueo
        const userDoc = doc(getFirestore(), "users", user.uid); //obtiene la referencia del documento
        console.log(userDoc);

        setUser(userDoc); //guarda la usuario en el contexto gloabal
        sessionStorage.setItem("user", JSON.stringify(userDoc)); //guardar el usuario en el almacenamiento de la sesion
        //navigate("/home"); //mandar al usuairo a la wihsList
      })
      .catch((error) => {
        // Manejar errores de autenticación
        console.error("Error al iniciar sesión:", error.message);
      });
  }

  const handleGoogleSignIn = async () => {
    const googleProvider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Aquí puedes manejar el resultado de la autenticación, como guardar el usuario en el contexto global
      console.log(result.user);

      const userDoc = doc(getFirestore(), "users", result.user.uid);

      setUser(userDoc);
      sessionStorage.setItem("user", JSON.stringify(userDoc));
      navigate("/home");
    } catch (error) {
      console.error("Error al iniciar sesión con Google", error);
      // Manejar el error si es necesario
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
