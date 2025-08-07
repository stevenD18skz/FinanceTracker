export default function TitleContainer({
  text,
  size = "text-3xl",
  color = "text-gray-800",
}) {
  return <h3 className={`${size} font-semibold ${color}`}>{text}</h3>;
}
