import { doc, deleteDoc } from "firebase/firestore";

export const fetchProductsWithNode = () => {
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

export const createProductWithNode = (dataProductCreate) => {
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

export const updateProductWithNode = async (dataUpdateProduct) => {
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

export const deleteProductWithNode = async (id) => {
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

export async function addItem() {
  try {
    const queryDb = getFirestore();
    const queryCollection = collection(queryDb, "productos");
    const docRef = await addDoc(queryCollection, item);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function deleteItem(itemId) {
  try {
    const queryDb = getFirestore();
    const queryDoc = doc(queryDb, "productos", "QlD7b5C20Ql4YCXd1X3Y");
    await deleteDoc(queryDoc);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
