export function parseNumber(value) {
  if (typeof value !== "string") return null;

  const normalized = value.replace(",", ".").trim();
  const num = Number(normalized);

  if (Number.isNaN(num)) return null;
  return num;
}