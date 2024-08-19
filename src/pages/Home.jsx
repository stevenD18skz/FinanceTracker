//IMPORTACION DE LIBRERIAS
import React, { useState, useEffect } from "react";

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

  // return (
  //<div className="i min-h-dvh bg-slate-500">
  //<div className="mx-auto w-10/12 items-center bg-slate-300">
  // <Table data_list={incomeList}></Table>
  // </div>
  // </div>
  //);

  return (
    <main className="min-h-screen bg-slate-800 text-gray-300">
      <NavBar />

      <div className="grid grid-cols-12 gap-5 p-4">
        <aside className="col-span-2 w-full rounded-2xl border border-blue-700 p-3 shadow-lg">
          {test_data.ACOUNTS.map((current, index) => (
            <Card key={index} dataCard={current} />
          ))}

          <button className="mb-8 w-full rounded-xl border border-cyan-800 py-3 transition-all duration-300 ease-in-out hover:border-dashed hover:bg-cyan-600 hover:text-white">
            new
          </button>

          <img
            className="mx-auto w-10/12 rounded-3xl shadow-lg"
            src="https://i.pinimg.com/originals/80/55/b6/8055b6bca39e97b823e919c917a90312.gif"
            alt="imagen decorativa"
          />
        </aside>

        <div className="col-span-8 w-full rounded-2xl border border-blue-700 p-6 shadow-lg">
          <h2 className="py-6 text-center text-5xl font-bold uppercase text-gray-400">
            Monthly Essentials
          </h2>

          <div className="grid grid-cols-3 gap-8 text-black">
            {test_data.MONTHLY_ESSENTIALS.map((current, index) => (
              <Card key={index} dataCard={current} />
            ))}

            <button className="mb-8 max-w-md truncate rounded-xl border-2 border-cyan-500 bg-gray-800 p-6 text-gray-200 shadow-lg transition-all duration-300 ease-in-out hover:border-dashed hover:bg-cyan-600 hover:text-white">
              new Monthly esentials
            </button>
          </div>

          <div className="flex flex-row items-center justify-between">
            <h2 className="pb-6 pt-12 text-center text-5xl font-bold uppercase text-gray-400">
              Income
            </h2>
            <button
              onClick={openModal}
              className="w-2/12 rounded-xl border border-cyan-800 py-3 transition-all duration-300 ease-in-out hover:border-dashed hover:bg-cyan-600 hover:text-white"
            >
              new income
            </button>
          </div>

          <Table data_list={incomeList}></Table>

          <div className="flex flex-row items-center justify-between">
            <h2 className="pb-6 pt-12 text-center text-5xl font-bold uppercase text-gray-400">
              expense
            </h2>
            <button
              onClick={openModal}
              className="w-2/12 rounded-xl border border-cyan-800 py-3 transition-all duration-300 ease-in-out hover:border-dashed hover:bg-cyan-600 hover:text-white"
            >
              new expense
            </button>
          </div>
          <Table data_list={test_data.EXPENSES}></Table>

          <WishList></WishList>
        </div>

        <aside className="col-span-2 w-full rounded-2xl border border-blue-700 p-3 shadow-lg">
          {test_data.GOALS.map((current, index) => (
            <Card key={index} dataCard={current} />
          ))}
          <button className="mb-8 w-full rounded-xl border border-cyan-800 py-3 transition-all duration-300 ease-in-out hover:border-dashed hover:bg-cyan-600 hover:text-white">
            new
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
