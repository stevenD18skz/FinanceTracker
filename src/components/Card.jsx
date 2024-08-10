export default function Card({ dataCard, cardImage = "" }) {
  return (
    <div className="w-8/12 max-w-md truncate rounded-xl border-2 border-cyan-500 bg-gray-800 p-6 text-gray-200 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-cyan-400">
        {dataCard.title} 2
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
            <div key={key} className="truncate rounded-md bg-gray-700 p-4">
              <p className="text-base leading-relaxed text-gray-300">
                <span className="font-semibold text-cyan-300">{key}: </span>
                {dataCard[key]}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
