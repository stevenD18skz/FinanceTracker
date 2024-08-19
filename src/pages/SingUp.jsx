//importacion de librerias
import React, { useState } from "react";

//firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

//contextos y hooks
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
  });

  const navigate = useNavigate(); // Hook para redirigir

  function handleRegister({ email, password, name, age }) {
    const auth = getAuth();

    const firestore = getFirestore();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Crear un documento en Firestore con los datos adicionales
        setDoc(doc(firestore, "users", user.uid), {
          name: name,
          age: age,
          email: email,
          createdAt: new Date(),
        });
        navigate("/login");
      })
      .then(() => {
        console.info("Usuario registrado y datos adicionales guardados");
      })
      .catch((error) => {
        console.error("Error al registrar y guardar datos:", error.message);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900">
      <div className="w-full max-w-md rounded-xl border border-cyan-500 bg-gray-800 p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-center text-3xl font-extrabold text-cyan-400">
            Sign Up
          </h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-700 bg-gray-700 p-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-700 bg-gray-700 p-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-700 bg-gray-700 p-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-700 bg-gray-700 p-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <button
            type="submit"
            className="w-full rounded-md bg-cyan-500 py-3 font-semibold text-gray-900 transition-all duration-300 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
