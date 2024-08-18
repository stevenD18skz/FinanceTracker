import { collection, addDoc } from "firebase/firestore";
import { db } from "./config/";

const items = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Laptop",
    description: "Laptop de alto rendimiento",
    productValue: 1200,
    currentMoney: 0,
    createDate: "2024-08-10",
    goalDate: "2025-08-10",
    status: "high",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Smartphone",
    description: "Smartphone con cámara de 64MP",
    productValue: 800,
    currentMoney: 0,
    createDate: "2024-08-10",
    goalDate: "2025-08-10",
    status: "medium",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Tablet",
    description: "Tablet con pantalla de 10 pulgadas",
    productValue: 6003,
    currentMoney: 0,
    createDate: "2024-08-10",
    goalDate: "2025-08-10",
    status: "nextToBuy",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "Monitor",
    description: "Monitor 4K de 27 pulgadas",
    productValue: 300,
    currentMoney: 0,
    createDate: "2024-08-10",
    goalDate: "2025-08-10",
    status: "low",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    name: "Teclado",
    description: "Teclado mecánico retroiluminado",
    productValue: 50,
    currentMoney: 0,
    createDate: "2024-08-10",
    goalDate: "2025-08-10",
    status: "low",
  },
];

// Función para agregar cada item a Firestore
export default async function migrateItemsToFirestore() {
  try {
    const batch = db.batch();
    items.forEach(async (item) => {
      const docRef = doc(db, "items", item.id); // Usa el mismo ID si lo deseas
      await setDoc(docRef, item); // Crea o actualiza el documento en Firestore
    });
    console.log("Datos migrados a Firestore exitosamente");
  } catch (e) {
    console.error("Error migrando datos a Firestore: ", e);
  }
}

// Llamada a la función de migración
//migrateItemsToFirestore();

/*
async function migrateItemsToFirestore() {
  try {
    const batch = db.batch();
    items.forEach(async (item) => {
      const docRef = doc(db, 'items', item.id); // Usa el mismo ID si lo deseas
      await setDoc(docRef, item); // Crea o actualiza el documento en Firestore
    });
    console.log("Datos migrados a Firestore exitosamente");
  } catch (e) {
    console.error("Error migrando datos a Firestore: ", e);
  }
}


import { collection, getDocs } from "firebase/firestore";

async function getItems() {
  const querySnapshot = await getDocs(collection(db, "items"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
}


import { doc, updateDoc } from "firebase/firestore";

async function updateItem(itemId) {
  const itemRef = doc(db, "items", itemId);

  await updateDoc(itemRef, {
    status: "high"
  });
}


import { doc, deleteDoc } from "firebase/firestore";

async function deleteItem(itemId) {
  await deleteDoc(doc(db, "items", itemId));
}

*/
