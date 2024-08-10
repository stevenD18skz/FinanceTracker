export default function ProductCard({
  dataCard,
  cardImage = "",
  deleteCard = () => null,
  editCard = () => null,
}) {
  return (
    <div className="w-8/12 max-w-md truncate rounded-xl border-2 border-cyan-500 bg-gray-800 p-6 text-gray-200 shadow-lg">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-cyan-400">{dataCard.title}</h2>

        <div className="flex space-x-2">
          <button
            onClick={() => editCard(dataCard)}
            className="rounded bg-yellow-500 px-2 py-1 text-sm font-semibold text-gray-800 transition-all duration-300 hover:bg-yellow-600 hover:text-gray-900"
          >
            Editar
          </button>

          <button
            onClick={() => deleteCard(dataCard)}
            className="rounded bg-red-500 px-2 py-1 text-sm font-semibold text-gray-200 transition-all duration-300 hover:bg-red-600 hover:text-white"
          >
            Eliminar
          </button>
        </div>
      </header>

      {cardImage ? (
        <div className="mb-4 h-60 w-full overflow-hidden rounded-xl">
          <img
            className="h-full w-full object-cover"
            src={cardImage}
            alt={`imagen de ${dataCard.title}`}
          />
        </div>
      ) : null}

      <div className="space-y-4">
        {Object.keys(dataCard)
          .slice(1)
          .map((key) => {
            const cellValue = dataCard[key];

            if (Array.isArray(cellValue)) {
              return (
                <div key={key} className="truncate rounded-md bg-gray-700 p-4">
                  <p className="text-base leading-relaxed text-gray-300">
                    <span className="font-semibold text-cyan-300">{key}: </span>
                    {cellValue.join(", ")}
                  </p>
                </div>
              );
            }
            return (
              <div key={key} className="truncate rounded-md bg-gray-700 p-4">
                <p className="text-base leading-relaxed text-gray-300">
                  <span className="font-semibold text-cyan-300">{key}: </span>
                  {dataCard[key]}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
