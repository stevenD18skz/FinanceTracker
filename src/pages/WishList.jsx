import { useState, useEffect } from "react";
import Table from "../components/Table";
import ModalProduct from "../components/ModalProduct";
import axios from "axios";
import Swal from "sweetalert2";
import ProductCard from "../components/ProductCard";

export default function WishList() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const fetchProducts = () => {
    setIsLoading(true);
    fetch("http://localhost:3000/wishlist")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching wishlist:", error);
        setIsLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const postProduct = (newIncome) => {
    console.log(newIncome);
    const postData = async (url = "", data = {}) => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const jsonResponse = await response.json();

        // Si el código de estado es 400, significa que hay un error de validación
        if (response.status === 400) {
          console.log("Validation Error:", jsonResponse.error);
          return jsonResponse; // Retorna el error para manejarlo en el frontend
        }

        // Si la respuesta es exitosa, retornamos el JSON
        if (response.ok) {
          fetchProducts();
          return jsonResponse;
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.log("Error in POST request:", error);
        throw error;
      }
    };

    // Ejemplo de uso
    postData("http://localhost:3000/wishlist", newIncome)
      .then((data) => {
        if (data.error) {
          // Maneja el error de validación en el frontend
          console.log("Validation errors:", data.error);
          // Puedes mostrar los errores en la UI, por ejemplo:
          // setErrors(data.error);
        } else {
          console.log("Success:", data);
        }
      })
      .catch((error) => console.log("Error:", error));
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const toastDisable = (disableObject) => {
    console.log(disableObject);
    Swal.fire({
      title: `¿Estás seguro que quieres eliminar el producto?`,
      text: "No podrá acceder a la plataforma",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No, cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, inhabilitar",
    }).then((result) => {
      if (result.isConfirmed) {
        //funcion que elimina el producto
        deleteProduct(disableObject.id);
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

  const deleteProduct = async (id = "") => {
    console.log(id);
    try {
      const response = await fetch(`http://localhost:3000/wishlist/${id}`, {
        method: "DELETE", // Método POST
        headers: {
          "Content-Type": "application/json", // Tipo de contenido
        },
      });

      // Si la respuesta no es exitosa, lanzar un error
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      fetchProducts();
      const jsonResponse = await response.json(); // Convertir respuesta a JSON
      return jsonResponse;
    } catch (error) {
      console.log("Error in DELETE request:", error);
      throw error;
    }
  };

  const toastUpdate = (disableObject) => {
    console.log(disableObject);
    Swal.fire({
      title: `¿Estás seguro que quieres eliminar el producto?`,
      text: "No podrá acceder a la plataforma",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No, cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, inhabilitar",
    }).then((result) => {
      if (result.isConfirmed) {
        //funcion que elimina el producto
        updateProduct(disableObject);
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

  const updateProduct = (newIncome) => {
    console.log(newIncome);
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

  const productImages = [
    "https://i.pinimg.com/564x/40/dc/2c/40dc2c3ce34f91560623913b43d5c5cb.jpg",
    "https://i.pinimg.com/564x/d0/70/07/d070075c1d5b8d094d43a36ea431d44c.jpg",
    "https://i.pinimg.com/564x/ac/d9/32/acd932b4ee60de4d9cc087e729abb4a7.jpg",
    "https://i.pinimg.com/736x/50/76/e4/5076e42a03985dd1629988f9b69d72f0.jpg",
    "https://i.pinimg.com/564x/70/e7/63/70e763b166fc8017167b643a39ff219a.jpg",
  ];

  return (
    <>
      <header className="flex flex-row items-center justify-between">
        <h2 className="pb-6 pt-12 text-center text-5xl font-bold uppercase text-gray-400">
          Wish List
        </h2>
      </header>

      <div className="grid grid-cols-3 place-items-center gap-y-8">
        {data.map((current, index) => {
          return (
            <ProductCard
              key={current.id}
              dataCard={current}
              cardImage={productImages[index]}
              deleteCard={toastDisable}
              editCard={toastUpdate}
              className="col-span-1"
            ></ProductCard>
          );
        })}
        <button
          onClick={openModal}
          className="h-full w-8/12 max-w-md truncate rounded-xl border-4 border-cyan-500 bg-gray-800 p-6 text-gray-200 shadow-lg transition-all duration-300 ease-in-out hover:border-dashed hover:bg-cyan-600 hover:text-white"
        >
          new Monthly esentials
        </button>
      </div>

      <ModalProduct
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={postProduct}
      />
    </>
  );
}
