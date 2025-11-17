import {
  BRANDS,
  CATEGORIES,
  COLORS,
  SHOES
} from "../data/catalog.js";

export function getCategoryKeyByLabel(label) {
  if (!label) {
    return null;
  }

  const lower = label.toLowerCase().trim();

  const found = Object.entries(CATEGORIES).find(
    ([, text]) => text.toLowerCase() === lower
  );

  if (!found) {
    return null;
  }

  return found[0];
}

export function normalizeBrand(label) {
  if (!label) {
    return null;
  }

  const lower = label.trim().toLowerCase();
  const found = BRANDS.find((b) => b.toLowerCase() === lower);
  return found || null;
}

export function normalizeColor(label) {
  if (!label) {
    return null;
  }

  const lower = label.trim().toLowerCase();
  const found = COLORS.find((c) => c.toLowerCase() === lower);
  return found || null;
}

export function filterShoes(filters) {
  const categoryKey = filters.categoryKey;
  const brand = filters.brand;
  const color = filters.color;
  const size = filters.size;

  return SHOES.filter((item) => {
    if (categoryKey && item.category !== categoryKey) {
      return false;
    }

    if (brand && item.brand !== brand) {
      return false;
    }

    if (color && item.color !== color) {
      return false;
    }

    if (size && !item.sizes.includes(size)) {
      return false;
    }

    return true;
  });
}

export function formatShoesList(list, options = {}) {
  const includeCategory = options.includeCategory === true;

  if (!list.length) {
    return "Каталог пуст.";
  }

  return list
      .map((item) => {
        const sizes = item.sizes.join(", ");
        const stores = item.stores.join(", ");

        let result = `Модель: ${item.name} (${item.id})`;

        if (includeCategory) {
          result += `\nКатегория: ${CATEGORIES[item.category]}`;
        }

        result += `\nБренд: ${item.brand}`;
        result += `\nЦвет: ${item.color}`;
        result += `\nРазмеры: ${sizes}`;
        result += `\nНаличие: ${stores}`;

        return result;
      })
      .join("\n\n");
}

export function formatAllShoes() {
  return formatShoesList(SHOES, { includeCategory: true });
}

export function formatShoesByCategory(categoryKey) {
  const list = SHOES.filter((item) => item.category === categoryKey);

  if (!list.length) {
    return "В этой категории пока нет моделей.";
  }

  return formatShoesList(list, { includeCategory: false });
}