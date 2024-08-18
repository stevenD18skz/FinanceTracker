import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(formData);
  };

  function handleRegister({ email, password, name, age }) {
    const auth = getAuth();
    console.log(email, password, name, age);
    const firestore = getFirestore();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Crear un documento en Firestore con los datos adicionales
        return setDoc(doc(firestore, "users", user.uid), {
          name: name,
          age: age,
          email: email,
          createdAt: new Date(),
        });
      })
      .then(() => {
        console.log("Usuario registrado y datos adicionales guardados");
      })
      .catch((error) => {
        console.error("Error al registrar y guardar datos:", error.message);
      });
  }

  return (
    <div className="min-h-dvh items-center bg-slate-900">
      <div className="mx-auto w-8/12 pt-12">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-md space-y-6 rounded-lg bg-gray-800 p-6 shadow-lg"
        >
          <h2 className="text-center text-2xl font-bold text-gray-200">
            Sign Up
          </h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md bg-gray-700 p-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-md bg-gray-700 p-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-md bg-gray-700 p-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full rounded-md bg-gray-700 p-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-cyan-500 p-3 font-semibold text-gray-900 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
