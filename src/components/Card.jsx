export default function Card({ dataCard }) {
  return (
    <div className="mb-8 rounded-xl border-2 border-cyan-500 p-4">
      <h2 className="mb-8">{dataCard.title}</h2>
      {Object.keys(dataCard)
        .slice(1)
        .map((key) => (
          <p key={key}>{dataCard[key]}</p>
        ))}
    </div>
  );
}
