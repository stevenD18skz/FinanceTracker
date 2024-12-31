export default function Card({ dataCard, cardImage = "" }) {
  return (
    <div className="w-full max-w-md truncate rounded-xl border-2 border-blue-500 bg-white p-6 text-gray-800 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-blue-600">
        {dataCard.title}
      </h2>

      {cardImage ? (
        <div className="mb-4 h-80 w-full overflow-hidden rounded-xl">
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
          .map((key) => (
            <div key={key} className="truncate rounded-md bg-gray-100 p-4">
              <p className="text-base leading-relaxed text-gray-700">
                <span className="font-semibold text-blue-500">{key}: </span>
                {dataCard[key]}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
