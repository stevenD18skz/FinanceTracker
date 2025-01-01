import React, { useState } from "react";

export default function ProductCard({
  dataCard,
  cardImage = "",
  deleteCard = () => null,
  editCard = () => null,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...dataCard });

  const colorStatus = {
    low: "bg-red-600",
    medium: "bg-yellow-600",
    high: "bg-green-600",
    nextToBuy: "bg-blue-600",
  };

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = () => {
    editCard(formData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: isDigit(value) ? Number(value) : value,
    });
  };

  const isDigit = (str) =>
    str.length > 0 &&
    Array.from(str).every((char) => !isNaN(char) && char !== " ");

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("es-ES");
  };

  const renderField = (key, value) => {
    if (key === "userId") return null;

    if (key === "status") {
      return (
        <div key={key} className="truncate rounded-md bg-gray-700 p-4">
          <div className="flex text-base leading-relaxed text-gray-300">
            <span className="font-semibold text-cyan-300">{key}: </span>
            <div
              className={`ml-3 rounded-lg ${colorStatus[value]} px-2 text-center text-black`}
            >
              {value}
            </div>
          </div>
        </div>
      );
    }

    if (value instanceof Object && value.seconds !== undefined) {
      return (
        <div key={key} className="truncate rounded-md bg-gray-700 p-4">
          <div className="text-base leading-relaxed text-gray-300">
            <span className="font-semibold text-cyan-300">{key}: </span>
            {formatDate(value)}
          </div>
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div key={key} className="truncate rounded-md bg-gray-700 p-4">
          <p className="text-base leading-relaxed text-gray-300">
            <span className="font-semibold text-cyan-300">{key}: </span>
            {value.join(", ")}
          </p>
        </div>
      );
    }

    return (
      <div key={key} className="truncate rounded-md bg-gray-700 p-4">
        <p className="text-base leading-relaxed text-gray-300">
          <span className="font-semibold text-cyan-300">{key}: </span>
          {value}
        </p>
      </div>
    );
  };

  const renderEditableField = (key, value) => {
    return (
      <div
        key={key}
        className="flex items-center justify-between rounded-md bg-gray-700 p-4"
      >
        <label className="font-semibold text-cyan-300">{key}:</label>
        <input
          type={
            value instanceof Object && value.seconds !== undefined
              ? "date"
              : "text"
          }
          name={key}
          value={
            value instanceof Object && value.seconds !== undefined
              ? formatDate(value)
              : Array.isArray(value)
                ? value.join(", ")
                : value
          }
          onChange={handleChange}
          className="w-9/12 rounded-md bg-gray-600 p-2 text-gray-300"
        />
      </div>
    );
  };

  return (
    <div className="w-10/12 max-w-md truncate rounded-xl border-2 border-cyan-500 bg-gray-800 p-6 text-gray-200 shadow-lg">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold capitalize text-cyan-400">
          {dataCard.name}
        </h2>
        <div className="flex space-x-2">
          {isEditing ? (
            <button
              onClick={handleSaveClick}
              className="rounded bg-green-500 px-2 py-1 text-sm font-semibold text-gray-200 hover:bg-green-600"
            >
              Guardar
            </button>
          ) : (
            <button
              onClick={handleEditClick}
              className="rounded bg-yellow-500 px-2 py-1 text-sm font-semibold text-gray-800 hover:bg-yellow-600"
            >
              Editar
            </button>
          )}
          <button
            onClick={() => deleteCard(dataCard)}
            className="rounded bg-red-500 px-2 py-1 text-sm font-semibold text-gray-200 hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>
      </header>

      {cardImage && (
        <div className="mb-4 h-60 w-full overflow-hidden rounded-xl">
          <img
            className="h-full w-full object-cover"
            src={cardImage}
            alt={`imagen de ${dataCard.name}`}
          />
        </div>
      )}

      <div className="space-y-4">
        {isEditing
          ? Object.entries(formData).map(([key, value]) =>
              renderEditableField(key, value),
            )
          : Object.entries(dataCard).map(([key, value]) =>
              renderField(key, value),
            )}
      </div>
    </div>
  );
}
