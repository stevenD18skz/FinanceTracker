import { useState, useEffect } from "react";
import Table from "../components/Table";
import ModalProduct from "../components/ModalProduct";
import axios from "axios";
import Swal from "sweetalert2";

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

  const deleteProduct = async (url = "", id = "") => {
    try {
      const response = await fetch(`${url}/${id}`, {
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

  const updateProduct = (newIncome) => {
    console.log(newIncome);
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
    Swal.fire({
      title: `¿Estás seguro que quieres desactivar a ${disableObject[data[index][4]]}?`,
      text: "No podrá acceder a la plataforma",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No, cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, inhabilitar",
    }).then((result) => {
      if (result.isConfirmed) {
        disable(disableObject);
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
    <>
      <header className="flex flex-row items-center justify-between">
        <h2 className="pb-6 pt-12 text-center text-5xl font-bold uppercase text-gray-400">
          Wish List
        </h2>
        <button
          onClick={openModal}
          className="w-2/12 rounded-xl border border-cyan-800 py-3 transition-all duration-300 ease-in-out hover:border-dashed hover:bg-cyan-600 hover:text-white"
        >
          new product
        </button>
      </header>

      <Table deleteData={deleteProduct} data_list={data} />

      <ModalProduct
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={postProduct}
      />
    </>
  );
}
