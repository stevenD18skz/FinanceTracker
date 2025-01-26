import { auth } from "../firebase/config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";

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

export async function successLogin(
  loggedInUser,
  setUser,
  setUserDocData,
  navigate,
) {
  setUser(loggedInUser);
  console.log("inicio", loggedInUser);

  const userRef = doc(getFirestore(), "users", loggedInUser.uid);
  console.log("2", userRef);

  const docSnapshot = await getDoc(userRef);
  console.log("3", docSnapshot);

  if (docSnapshot.exists()) {
    setUserDocData({ id: userRef.id, ...docSnapshot.data() });
  } else {
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
    setUserDocData({ id: userRef.id, ...newUser });
  }

  navigate("/Dashboard");
}

export function userWasLogin(
  user,
  setUser,
  setUserDocData,
  navigate,
  setLoading,
) {
  if (user) {
    Toast.fire({
      icon: "success",
      title: "Log in successfull " + user.displayName,
    });

    successLogin(user, setUser, setUserDocData, navigate);
  } else {
    Toast.fire({
      icon: "error",
      title: "no hay usuario autenticado",
    });
    setLoading(false);
  }
}

export const handleGoogleSignIn = async (setUser, setUserDocData, navigate) => {
  const googleProvider = new GoogleAuthProvider();
  try {
    const credentials = await signInWithPopup(auth, googleProvider);
    successLogin(credentials.user, setUser, setUserDocData, navigate);
  } catch (error) {
    console.error("Error al iniciar sesión con Google", error);
  }
};

export const handleLogout = async (navigate) => {
  try {
    await signOut(auth);
    navigate("/login");
    Toast.fire({
      icon: "success",
      title: "Logged out successfully",
    });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    Toast.fire({
      icon: "error",
      title: "Error al cerrar sesión",
    });
  }
};
