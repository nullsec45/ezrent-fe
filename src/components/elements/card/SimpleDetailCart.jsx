export function SimpleDetailCard({ title, value }) {
  return (
    <p className="text-sm">
      <span className="font-medium">{title}: </span>
      <span className="font-bold">{value}</span>
    </p>
  );
}
