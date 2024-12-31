//importacion de librerias
import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";

//firebase
import { auth } from "../firebase/config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, addDoc, setDoc } from "firebase/firestore";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";



//contextos y hooks
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  faPenToSquare,
  faPlus,
  faDeleteLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook para redirigir
  const { setUser, setUserDocData } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

  async function successLogin(loggedInUser) {
    // Guardar el usuario autenticado en el contexto global
    setUser(loggedInUser);

    // Obtener la referencia del documento del usuario en Firestore
    const userRef = doc(getFirestore(), "users", loggedInUser.uid);

    // Verificar si el documento del usuario ya existe
    const docSnapshot = await getDoc(userRef);
    if (docSnapshot.exists()) {
      // Si el documento existe, cargar sus datos
      setUserDocData({ id: userRef.id, ...docSnapshot.data() });
    } else {
      // Si el documento no existe, crear uno nuevo con los datos del usuario
      const newUser = {
        name: loggedInUser.displayName || "Usuario sin nombre",
        photoURL: loggedInUser.photoURL || "",
        username:
          loggedInUser.displayName?.toLowerCase().replace(/\s/g, "_") ||
          `user_${loggedInUser.uid.slice(0, 5)}`,
        uid: loggedInUser.uid,
        createdAt: new Date(),
      };

      await setDoc(userRef, newUser);

      // Guardar los datos recién creados en el contexto
      setUserDocData({ id: userRef.id, ...newUser });
    }

    // Redirigir al usuario a la página deseada
    navigate("/wishlist");
  }

  /**
   * verifica si el usuario ya esta logueado apenas carga
   * el login, en tal caso realiza las acciones perdinentes
   */
  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, userWasLogin);
  }, []);

  function userWasLogin(user) {
    if (user) {
      Toast.fire({
        icon: "success",
        title: "Log in successfull " + user.displayName,
      });
      successLogin(user);
    } else {
      Toast.fire({
        icon: "error",
        title: "no hay usuario autenticado",
      });
      setLoading(false);
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
        setLoading(false);
        setError(error.message);
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
    setLoading(true);
    handleLogin({ email, password });
  };

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

        {error ? (
          <div className="bg-blue-200">
            <p>
              {error === "Firebase: Error (auth/invalid-credential)."
                ? "CREDENDIALES INVALIDAS"
                : "NO SE EN QUE FALLASTE"}
            </p>
          </div>
        ) : null}

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
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Ingresa tu contraseña"
              className="rounded-md border border-gray-700 bg-gray-700 p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  style={{ color: "#d93030" }}
                />
              ) : (
                <FontAwesomeIcon icon={faEye} style={{ color: "#74C0FC" }} />
              )}
            </button>
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
