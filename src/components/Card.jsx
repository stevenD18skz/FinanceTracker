export default function Card({ dataCard }) {
  return (
    <div className="mb-8 max-w-md truncate rounded-xl border-2 border-cyan-500 bg-gray-800 p-6 text-gray-200 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-cyan-400">
        {dataCard.title}
      </h2>
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
