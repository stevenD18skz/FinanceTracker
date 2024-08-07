import React, { useState } from "react";

import StandarInput from "./StandarInput";

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    payment: "",
    date: "",
    tags: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative m-auto flex w-full max-w-md flex-col rounded-lg bg-gray-700 p-8 shadow-lg">
        <div className="flex items-center justify-between rounded-t border-b py-4 md:py-5 dark:border-gray-600">
          <h3 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Create New Product
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="h-3 w-3"
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
          <StandarInput
            titulo="payment"
            dato={formData.payment}
            handleChange={handleChange}
            type={"text"}
          ></StandarInput>
          <StandarInput
            titulo="date"
            dato={formData.date}
            handleChange={handleChange}
            type={"date"}
          ></StandarInput>
          <div>
            <label className="block text-gray-200">Tags</label>
            <select
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
              required
            >
              <option value="">Select category</option>
              <option value="Trabajo">Trabajo</option>
              <option value="Inversiones">Inversiones</option>
              <option value="Proyecto">Proyecto</option>
              <option value="Ingresos">Ingresos</option>
            </select>
          </div>
          <StandarInput
            titulo="note"
            dato={formData.note}
            handleChange={handleChange}
            type={"text"}
            isNotRequired
          ></StandarInput>
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
