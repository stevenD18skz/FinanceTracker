import { useState, useEffect } from "react";
import Table from "../components/Table";
import ModalProduct from "../components/ModalProduct";
import axios from "axios";
import Swal from "sweetalert2";
import ProductCard from "../components/ProductCard";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

export default function WishList() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const items = [
    {
      name: "Laptop",
      description: "Laptop de alto rendimiento",
      productValue: 1200,
      currentMoney: 0,
      createDate: new Date("2024-08-10T11:06:55Z"),
      goalDate: new Date("2025-08-10T11:07:11Z"),
      status: "high",
      image:
        "https://i.pinimg.com/564x/d0/70/07/d070075c1d5b8d094d43a36ea431d44c.jpg",
    },
    {
      name: "Smartphone",
      description: "Smartphone con cámara de 64MP",
      productValue: 800,
      currentMoney: 0,
      createDate: new Date("2024-08-10T11:06:55Z"),
      goalDate: new Date("2025-08-10T11:07:11Z"),
      status: "medium",
      image:
        "https://i.pinimg.com/564x/66/c2/3f/66c23f9566266ec63f39b2dac1a56585.jpg",
    },
    {
      name: "Tablet",
      description: "Tablet con pantalla de 10 pulgadas",
      productValue: 6003,
      currentMoney: 0,
      createDate: new Date("2024-08-10T11:06:55Z"),
      goalDate: new Date("2025-08-10T11:07:11Z"),
      status: "nextToBuy",
      image:
        "https://i.pinimg.com/564x/ac/d9/32/acd932b4ee60de4d9cc087e729abb4a7.jpg",
    },
    {
      name: "Monitor",
      description: "Monitor 4K de 27 pulgadas",
      productValue: 300,
      currentMoney: 0,
      createDate: new Date("2024-08-10T11:06:55Z"),
      goalDate: new Date("2025-08-10T11:07:11Z"),
      status: "low",
      image:
        "https://i.pinimg.com/736x/50/76/e4/5076e42a03985dd1629988f9b69d72f0.jpg",
    },
    {
      name: "Teclado",
      description: "Teclado mecánico retroiluminado",
      productValue: 50,
      currentMoney: 0,
      createDate: new Date("2024-08-10T11:06:55Z"),
      goalDate: new Date("2025-08-10T11:07:11Z"),
      status: "low",
      image:
        "https://i.pinimg.com/564x/70/e7/63/70e763b166fc8017167b643a39ff219a.jpg",
    },
    {
      name: "Televisor",
      description: "Televisor de alta definición",
      productValue: 900,
      currentMoney: 0,
      createDate: new Date("2024-08-10T11:06:55Z"),
      goalDate: new Date("2025-08-10T11:07:11Z"),
      status: "medium",
      image:
        "https://i.pinimg.com/564x/40/dc/2c/40dc2c3ce34f91560623913b43d5c5cb.jpg", // Agrega aquí la URL de la imagen del televisor
    },
    {
      name: "Audífonos",
      description: "Audífonos inalámbricos con cancelación de ruido",
      productValue: 150,
      currentMoney: 0,
      createDate: new Date("2024-08-10T11:06:55Z"),
      goalDate: new Date("2025-08-10T11:07:11Z"),
      status: "low",
      image:
        "https://i.pinimg.com/564x/71/ce/51/71ce51c79cf330d7887b3922219e7376.jpg", // Agrega aquí la URL de la imagen de los audífonos
    },
  ];

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
      const queryDb = getFirestore();
      const queryCollection = collection(queryDb, "productos");
      getDocs(queryCollection)
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

  const toastCreate = (createObject) => {
    const foundItem = items.find(
      (item) =>
        item.name.toLocaleLowerCase() ===
        createObject.title.toLocaleLowerCase(),
    );

    if (!foundItem) {
      console.error("No se encontró ningún objeto con ese nombre.");
      return;
    }

    const itemForzado = foundItem;

    async function addItem(item) {
      try {
        const queryDb = getFirestore();
        const queryCollection = collection(queryDb, "productos");
        const docRef = await addDoc(queryCollection, item);

        fetchProductsByFirebase();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    Swal.fire({
      title: `Do you want to add ${itemForzado.name} to the wishlist?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "yes, add",
    }).then((result) => {
      if (result.isConfirmed) {
        addItem(itemForzado);
        Toast.fire({
          icon: "success",
          title: "The product has been added successfully",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "The product was not added successfully",
        });
      }
    });
  };

  const toastUpdate = (updateObject) => {
    Swal.fire({
      title: `¿OLAAAAAAAAAAAAAAAA?`,
      text: "No podrá acceder a la plataforma",
      icon: "warning",
      cancelButtonText: "لا",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        //funcion que elimina el producto
        updateProduct(updateObject);
        Toast.fire({
          icon: "success",
          title: "Usuario inhabilitado con éxito",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "No fue posible inhabilitar al usuario",
        });
      }
    });
  };

  const toastDelete = (deleteObject) => {
    async function deleteItem(itemId) {
      try {
        const queryDb = getFirestore();
        const queryDoc = doc(queryDb, "productos", itemId);
        await deleteDoc(queryDoc);
        fetchProductsByFirebase();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    Swal.fire({
      title: `¿Estás seguro que quieres eliminar el producto?`,
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        //funcion que elimina el producto
        deleteItem(deleteObject.id);
        Toast.fire({
          icon: "success",
          title: "El producto se elimino",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "El producto no fue eliminado",
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div>
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="text-center">hubo un error</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 p-12">
      <div className="mx-auto w-10/12 rounded-xl bg-slate-600">
        <header className="">
          <h2 className="py-6 text-center text-5xl font-bold uppercase text-gray-400">
            Wish List
          </h2>
        </header>

        <div className="grid grid-cols-3 place-items-center gap-y-8">
          {data.map((current, index) => {
            return (
              <ProductCard
                key={current.id}
                dataCard={current}
                cardImage={current.image}
                deleteCard={toastDelete}
                editCard={toastUpdate}
                className="col-span-1"
              ></ProductCard>
            );
          })}
          <button
            onClick={openModal}
            className="h-full w-10/12 max-w-md truncate rounded-xl border-4 border-cyan-500 bg-gray-800 p-6 text-gray-200 shadow-lg transition-all duration-300 ease-in-out hover:border-dashed hover:bg-cyan-600 hover:text-white"
          >
            new Monthly esentials
          </button>
        </div>

        <ModalProduct
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={toastCreate}
        />
      </div>
    </div>
  );
}
