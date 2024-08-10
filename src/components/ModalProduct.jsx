import React, { useState } from "react";
import StandarInput from "./StandarInput";

export default function ModalProduct({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    note: "",
    tags: [],
  });

  const selectMultiple = (event) => {
    const newSelectedValues = Array.from(event.target.options) // Convertir a array
      .filter((option) => option.selected) // Filtrar las opciones seleccionadas
      .map((option) => option.value); // Extraer los valores

    setFormData((prevState) => ({
      ...prevState,
      tags: newSelectedValues, // Actualiza el estado con los nuevos valores seleccionados
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedData = {
      ...formData,
      amount: Number(formData.amount), // Convertir a número antes de enviar
      tags: formData.tags,
    };

    onSubmit(parsedData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative m-auto flex w-full max-w-md flex-col rounded-xl border-2 border-slate-300 bg-gray-800 p-8 shadow-lg">
        <div className="flex items-center justify-between rounded-t border-b-2 border-cyan-500 py-4">
          <h3 className="text-2xl font-semibold text-cyan-400">
            Create New Product
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-200 hover:bg-gray-700"
          >
            <svg
              className="h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 gap-x-7"
        >
          <StandarInput
            titulo="title"
            dato={formData.title}
            handleChange={handleChange}
            type={"text"}
          ></StandarInput>

          <StandarInput
            titulo="amount"
            dato={formData.amount}
            handleChange={handleChange}
            type={"number"}
          ></StandarInput>

          <div className="col-span-2">
            <StandarInput
              titulo="note"
              dato={formData.note}
              handleChange={handleChange}
              type={"text"}
              isRequired={false}
            ></StandarInput>
          </div>

          <div className="col-span-2">
            <label className="block text-cyan-300">Tags</label>
            <select
              name="tags"
              value={formData.tags}
              onChange={selectMultiple}
              className="block w-full rounded-lg border-2 border-cyan-500 bg-gray-700 p-2.5 text-sm text-gray-300"
              required
              multiple
            >
              <option value="Electrónica">Electrónica</option>
              <option value="Portátil">Portátil</option>
              <option value="Móvil">Móvil</option>
              <option value="Periférico">Periférico</option>
              <option value="Accesorio">Accesorio</option>
              <option value="Pantalla">Pantalla</option>
            </select>
          </div>

          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="rounded bg-cyan-500 px-4 py-2 text-white"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
