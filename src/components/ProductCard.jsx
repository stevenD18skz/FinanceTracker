import React, { useState } from "react";

export default function ProductCard({
  dataCard,
  cardImage = "",
  deleteCard = () => null,
  editCard = () => null,
}) {
  const [data, setData] = useState({ ...dataCard });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...dataCard });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const parsedData = {
      ...formData,
      amount: Number(formData.amount), // Convertir a número antes de enviar
    };
    editCard(parsedData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="w-10/12 max-w-md truncate rounded-xl border-2 border-cyan-500 bg-gray-800 p-6 text-gray-200 shadow-lg">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-cyan-400">{data.title}</h2>

        <div className="flex space-x-2">
          {isEditing ? (
            <button
              onClick={handleSaveClick}
              className="rounded bg-green-500 px-2 py-1 text-sm font-semibold text-gray-200 transition-all duration-300 hover:bg-green-600 hover:text-white"
            >
              Guardar
            </button>
          ) : (
            <button
              onClick={handleEditClick}
              className="rounded bg-yellow-500 px-2 py-1 text-sm font-semibold text-gray-800 transition-all duration-300 hover:bg-yellow-600 hover:text-gray-900"
            >
              Editar
            </button>
          )}

          <button
            onClick={() => deleteCard(data)}
            className="rounded bg-red-500 px-2 py-1 text-sm font-semibold text-gray-200 transition-all duration-300 hover:bg-red-600 hover:text-white"
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
            alt={`imagen de ${data.title}`}
          />
        </div>
      )}

      <div className="space-y-4">
        {isEditing
          ? Object.keys(formData)
              .slice(1)
              .map((propiedad) => {
                return (
                  <div
                    key={propiedad}
                    className="flex items-center justify-between rounded-md bg-gray-700 p-4"
                  >
                    <label className="font-semibold text-cyan-300">
                      {propiedad}:
                    </label>
                    {Array.isArray(formData[propiedad]) ? (
                      <input
                        type="text"
                        name={propiedad}
                        value={formData[propiedad].join(", ")}
                        onChange={handleChange}
                        className="w-9/12 rounded-md bg-gray-600 p-2 text-gray-300"
                      />
                    ) : (
                      <input
                        type="text"
                        name={propiedad}
                        id={propiedad}
                        value={formData[propiedad]}
                        placeholder="ingresa el dato"
                        onChange={handleChange}
                        className="w-9/12 rounded-md bg-gray-600 p-2 text-gray-300"
                      />
                    )}
                  </div>
                );
              })
          : Object.keys(data)
              .slice(1)
              .map((propiedad) => {
                if (Array.isArray(data[propiedad])) {
                  return (
                    <div
                      key={propiedad}
                      className="truncate rounded-md bg-gray-700 p-4"
                    >
                      <p className="text-base leading-relaxed text-gray-300">
                        <span className="font-semibold text-cyan-300">
                          {propiedad}:{" "}
                        </span>
                        {data[propiedad].join(", ")}
                      </p>
                    </div>
                  );
                }
                return (
                  <div
                    key={propiedad}
                    className="truncate rounded-md bg-gray-700 p-4"
                  >
                    <p className="text-base leading-relaxed text-gray-300">
                      <span className="font-semibold text-cyan-300">
                        {propiedad}:{" "}
                      </span>
                      {data[propiedad]}
                    </p>
                  </div>
                );
              })}
      </div>
    </div>
  );
}
