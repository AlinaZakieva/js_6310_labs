import { SIZE_TABLES } from "../data/sizeTables.js";
import { SHOES } from "../data/catalog.js";

export function getSizeByCm(genderKey, cm) {
  const table = SIZE_TABLES[genderKey];
  if (!table) return null;

  return table.find((row) => cm >= row.cmFrom && cm <= row.cmTo) || null;
}

export function getModelSizeFeedback(modelId) {
  if (!modelId) return null;
  const lower = String(modelId).toLowerCase();

  const model = SHOES.find((item) => item.id.toLowerCase() === lower);
  if (!model) return null;

  return model.sizeFeedback;
}