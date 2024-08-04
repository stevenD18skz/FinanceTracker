//IMPORTACION DE LIBRERIAS
import React, { useState, useEffect } from "react";

//IMPORTACION DE COMNPONENTES
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import Table from "../components/Table";
import ProgressCircle from "../components/ProgressCircle";
import Modal from "../components/Modal";

//IMPORTACION DE HOOKS O UTILIDADES
import { test_data } from "../utils/dataJson";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(true);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <main className="min-h-dvh bg-slate-800 text-gray-300">
      <NavBar />

      <div className="grid grid-cols-12 gap-5 p-4">
        <aside className="col-span-3 min-h-svh w-full rounded-2xl border-2 border-indigo-700 p-3">
          {test_data.ACOUNTS.map((current, index) => (
            <Card key={index} dataCard={current} />
          ))}

          <button
            onClick={openModal}
            className="mb-8 w-full rounded-xl border-2 border-cyan-800 py-3 transition-all duration-300 ease-in-out hover:border-dashed hover:bg-cyan-600"
          >
            new
          </button>

          <img
            className="mx-auto w-10/12 rounded-3xl"
            src="https://i.pinimg.com/originals/80/55/b6/8055b6bca39e97b823e919c917a90312.gif"
            alt="imagen decorativa"
          />
        </aside>

        <div className="col-span-6 min-h-svh w-full rounded-2xl border-2 border-indigo-700 p-3">
          <h2 className="py-6 text-center text-5xl font-bold uppercase text-gray-400">
            MONTHLY_ESSENTIALS
          </h2>

          <div className="grid grid-cols-3 gap-8 text-black">
            {test_data.MONTHLY_ESSENTIALS.map((current, index) => (
              <Card key={index} dataCard={current} />
            ))}

            <button className="mb-8 w-full rounded-xl border-2 border-cyan-800 py-3 transition-all duration-300 ease-in-out hover:border-dashed hover:bg-cyan-600">
              new
            </button>
          </div>

          <h2 className="pb-6 pt-12 text-center text-5xl font-bold uppercase text-gray-400">
            INCOME
          </h2>

          <Table data_list={test_data.INCOME}></Table>

          <h2 className="pb-6 pt-12 text-center text-5xl font-bold uppercase text-gray-400">
            EXPENSES
          </h2>
          <Table data_list={test_data.EXPENSES}></Table>
        </div>

        <aside className="col-span-3 min-h-svh w-full rounded-2xl border-2 border-indigo-700 p-3">
          {test_data.GOALS.map((current, index) => (
            <Card key={index} dataCard={current} />
          ))}
          <button className="mb-8 w-full rounded-xl border-2 border-cyan-800 py-3 transition-all duration-300 ease-in-out hover:border-dashed hover:bg-cyan-600">
            new
          </button>
        </aside>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Example Modal">
        <p>This is an example modal. You can place any content here.</p>
      </Modal>
    </main>
  );
}
