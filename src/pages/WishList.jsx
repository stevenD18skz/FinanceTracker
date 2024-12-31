import { useState, useEffect } from "react";
import Table from "../components/Table";
import ModalProduct from "../components/ModalProduct";

import Swal from "sweetalert2";
import ProductCard from "../components/ProductCard";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";

import NavBar from "../components/NavBar";
import { db } from "../firebase/config";

import { useAuth } from "../context/AuthContext";

export default function WishList() {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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

  const fetchProductsByFirebase = () => {
    setIsLoading(true);
    const statusOrder = {
      low: 1,
      medium: 2,
      high: 3,
      nextToBuy: 4,
    };

    try {
      const queryCollection = collection(db, "productos");
      const querryFiltler = query(
        queryCollection,
        where("userId", "==", user.uid),
      );
      getDocs(querryFiltler)
        .then((res) =>
          res.docs.map((product) => ({ id: product.id, ...product.data() })),
        )
        .then((final) => {
          const sortedItems = final.sort(
            (a, b) => statusOrder[b.status] - statusOrder[a.status],
          );

          setData(sortedItems);
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setIsLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchProductsByFirebase();
  }, []);

  const toastCreate = async (item) => {
    try {
      const queryDb = getFirestore();
      const queryCollection = collection(queryDb, "productos");

      await addDoc(queryCollection, {
        userId: user.uid,
        ...item,
      });

      fetchProductsByFirebase();
      Toast.fire({
        icon: "success",
        title: "Producto añadido exitosamente",
      });
    } catch (e) {
      console.error("Error añadiendo el producto: ", e);
    }
  };

  const toastDelete = async (itemId) => {
    try {
      const queryDb = getFirestore();
      const queryDoc = doc(queryDb, "productos", itemId);
      await deleteDoc(queryDoc);
      fetchProductsByFirebase();
      Toast.fire({
        icon: "success",
        title: "Producto eliminado exitosamente",
      });
    } catch (e) {
      console.error("Error eliminando el producto: ", e);
    }
  };

  if (isLoading) {
    return (
      <>
        <NavBar />
        <div className="flex min-h-screen items-center justify-center bg-white">
          <h2 className="animate-pulse text-3xl font-semibold text-gray-800">
            Cargando...
          </h2>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div className="flex min-h-screen items-center justify-center bg-white">
          <h2 className="text-2xl font-semibold text-red-500">
            Hubo un error al cargar los productos.
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-10 text-center">
            <h2 className="text-4xl font-bold uppercase tracking-wide text-gray-800">
              Mi Lista de Deseos
            </h2>
          </header>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((item) => (
              <ProductCard
                key={item.id}
                dataCard={item}
                cardImage={item.image}
                deleteCard={toastDelete}
                className="transform transition duration-300 hover:scale-105"
              />
            ))}
            <button
              onClick={openModal}
              className="flex h-40 transform flex-col items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-lg font-bold text-white transition-all duration-300 hover:from-blue-500 hover:to-cyan-500"
            >
              + Nuevo Producto
            </button>
          </div>
          <ModalProduct
            isOpen={isModalOpen}
            onClose={closeModal}
            onSubmit={toastCreate}
          />
        </div>
      </div>
    </>
  );
}
