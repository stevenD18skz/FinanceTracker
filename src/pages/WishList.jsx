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

  const statusOrder = {
    low: 1,
    medium: 2,
    high: 3,
    nextToBuy: 4,
  };

  const fetchProducts = () => {
    setIsLoading(true);
    fetch("http://localhost:3000/wishlist")
      .then((res) => res.json())
      .then((data) => {
        const sortedItems = data.sort(
          (a, b) => statusOrder[b.status] - statusOrder[a.status],
        );

        setData(sortedItems);
        setIsLoading(false);
        console.log(sortedItems);
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

  const toastCreate = (createObject) => {
    console.log(createObject);
    Swal.fire({
      title: `Do you want to add ${createObject.name} to the wishlist?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "yes, add",
    }).then((result) => {
      if (result.isConfirmed) {
        createProduct(createObject);
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

  const createProduct = (dataProductCreate) => {
    console.log(dataProductCreate);

    const postData = async (body = {}) => {
      try {
        const response = await fetch("http://localhost:3000/wishlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
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

    postData(dataProductCreate)
      .then((data) => {
        if (data.error) {
          console.log("Validation errors:", data.error);
          //setErrors(data.error);
        } else {
          console.log("Success:", data);
        }
      })
      .catch((error) => console.log("Error:", error));
  };

  const toastUpdate = (updateObject) => {
    console.log(updateObject);
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

  const updateProduct = async (dataUpdateProduct) => {
    console.log(dataUpdateProduct);

    try {
      const response = await fetch(
        `http://localhost:3000/wishlist/${dataUpdateProduct.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", // Tipo de contenido
          },
          body: JSON.stringify(dataUpdateProduct),
        },
      );

      const jsonResponse = await response.json();

      // Si el código de estado es 400, significa que hay un error de validación
      if (response.status === 400) {
        console.log("Validation Error:", jsonResponse.error);
        return jsonResponse; // Retorna el error para manejarlo en el frontend
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      fetchProducts();
    } catch (error) {
      console.log("Error in PATCH request:", error);
    }
  };

  const toastDelete = (deleteObject) => {
    console.log(deleteObject);
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
        deleteProduct(deleteObject.id);
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

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/wishlist/${id}`, {
        method: "DELETE", // Método POST
        headers: {
          "Content-Type": "application/json", // Tipo de contenido
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      fetchProducts();
    } catch (error) {
      console.log("Error in DELETE request:", error);
    }
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

  const productImages = {
    televisor:
      "https://i.pinimg.com/564x/40/dc/2c/40dc2c3ce34f91560623913b43d5c5cb.jpg",
    laptop:
      "https://i.pinimg.com/564x/d0/70/07/d070075c1d5b8d094d43a36ea431d44c.jpg",
    tablet:
      "https://i.pinimg.com/564x/ac/d9/32/acd932b4ee60de4d9cc087e729abb4a7.jpg",
    monitor:
      "https://i.pinimg.com/736x/50/76/e4/5076e42a03985dd1629988f9b69d72f0.jpg",
    teclado:
      "https://i.pinimg.com/564x/70/e7/63/70e763b166fc8017167b643a39ff219a.jpg",
    audifonos:
      "https://i.pinimg.com/564x/71/ce/51/71ce51c79cf330d7887b3922219e7376.jpg",
    "alarm clock":
      "https://i.pinimg.com/564x/29/c0/e9/29c0e940a918a3ac54c634688d3043f9.jpg",
    smartphone:
      "https://i.pinimg.com/564x/66/c2/3f/66c23f9566266ec63f39b2dac1a56585.jpg",
  };

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
                cardImage={productImages[current.name.toLowerCase()]}
                deleteCard={toastDelete}
                editCard={updateProduct}
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
