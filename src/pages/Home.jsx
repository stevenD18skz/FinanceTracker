//IMPORTACION DE LIBRERIAS
import React, { useState } from "react";

//IMPORTACION DE COMPONENTES
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import Table from "../components/Table";
import Modal from "../components/Modal";
import WishList from "./WishList";

//IMPORTACION DE HOOKS O UTILIDADES
import { test_data } from "../utils/dataJson";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [incomeList, setIncomeList] = useState(test_data.INCOME);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleAddIncome = (newIncome) => {
    setIncomeList((prevList) => [...prevList, newIncome]);
    console.log(newIncome);
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      <NavBar />

      <div className="grid grid-cols-12 gap-6 p-6">
        <aside className="col-span-3 w-full rounded-xl border border-gray-300 bg-white p-5 shadow-md">
          <h3 className="mb-4 text-lg font-semibold text-gray-600">Accounts</h3>

          <div className="grid grid-cols-1 gap-4">
            {test_data.ACOUNTS.map((current, index) => (
              <Card key={index} dataCard={current} />
            ))}
          </div>

          <button className="mt-6 w-full rounded-lg bg-blue-600 py-2 text-white shadow hover:bg-blue-700">
            Add New Account
          </button>

          <img
            className="mx-auto max-w-80 mt-6 w-full rounded-lg shadow-lg"
            src="https://i.pinimg.com/originals/80/55/b6/8055b6bca39e97b823e919c917a90312.gif"
            alt="imagen decorativa"
          />
        </aside>

        <div className="col-span-6 w-full rounded-xl border border-gray-300 bg-white p-6 shadow-md">
          <h2 className="py-4 text-center text-3xl font-bold text-gray-700">
            Monthly Essentials
          </h2>

          <div className="grid grid-cols-3 gap-4">
            {test_data.MONTHLY_ESSENTIALS.map((current, index) => (
              <Card key={index} dataCard={current} />
            ))}

            <button className="max-w-sm truncate rounded-lg border-2 border-blue-500 bg-white p-4 text-blue-700 shadow hover:bg-blue-100">
              Add New Essential
            </button>
          </div>

          <div className="mt-8 flex flex-row items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700">Income</h2>
            <button
              onClick={openModal}
              className="rounded-lg bg-green-600 px-4 py-2 text-white shadow hover:bg-green-700"
            >
              Add Income
            </button>
          </div>

          <Table data_list={incomeList}></Table>

          <div className="mt-8 flex flex-row items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700">Expenses</h2>
            <button
              onClick={openModal}
              className="rounded-lg bg-red-600 px-4 py-2 text-white shadow hover:bg-red-700"
            >
              Add Expense
            </button>
          </div>

          <Table data_list={test_data.EXPENSES}></Table>

          <WishList></WishList>
        </div>

        <aside className="col-span-3 w-full rounded-xl border border-gray-300 bg-white p-5 shadow-md">
          <h3 className="mb-4 text-lg font-semibold text-gray-600">Goals</h3>

          <div className="grid grid-cols-1 gap-4">
            {test_data.GOALS.map((current, index) => (
              <Card key={index} dataCard={current} />
            ))}
          </div>
          <button className="mt-6 w-full rounded-lg bg-blue-600 py-2 text-white shadow hover:bg-blue-700">
            Add New Goal
          </button>
        </aside>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAddIncome}
      />
    </main>
  );
}
