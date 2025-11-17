import { COMMANDS } from "./state.js";
import {
  BRANDS,
  CATEGORIES,
  COLORS
} from "../data/catalog.js";
import {
  filterShoes,
  formatShoesList,
  getCategoryKeyByLabel,
  normalizeBrand,
  normalizeColor
} from "./catalog.js";

export const CATALOG_STEPS = {
  CATEGORY: "CATEGORY",
  BRAND: "BRAND",
  COLOR: "COLOR",
  SIZE: "SIZE"
};

export function createInitialCatalogState() {
  return {
    command: COMMANDS.CATALOG,
    step: CATALOG_STEPS.CATEGORY,
    data: {}
  };
}

export function processCatalogStep(state, text) {
  const trimmed = text.trim();

  // 1. Выбор категории
  if (state.step === CATALOG_STEPS.CATEGORY) {
    const categoryKey = getCategoryKeyByLabel(trimmed);
    if (!categoryKey) {
      return {
        newState: state,
        reply: "Не понял категорию. Введите: мужская, женская или детская.",
        done: false
      };
    }

    return {
      newState: {
        command: COMMANDS.CATALOG,
        step: CATALOG_STEPS.BRAND,
        data: { categoryKey }
      },
      reply:
        `Категория: ${CATEGORIES[categoryKey]}.\n` +
        `Хотите отфильтровать по бренду? Доступные бренды: ${BRANDS.join(", ")}.\n` +
        'Если не важно — введите "нет".',
      done: false
    };
  }

  // 2. Фильтр по бренду (или "нет")
  if (state.step === CATALOG_STEPS.BRAND) {
    const lower = trimmed.toLowerCase();
    let brand = null;

    if (lower !== "нет") {
      brand = normalizeBrand(trimmed);
      if (!brand) {
        return {
          newState: state,
          reply:
            `Не понял бренд. Введите один из: ${BRANDS.join(", ")} ` +
            'или "нет".',
          done: false
        };
      }
    }

    return {
      newState: {
        command: COMMANDS.CATALOG,
        step: CATALOG_STEPS.COLOR,
        data: {
          ...state.data,
          brand
        }
      },
      reply:
        `Фильтровать по цвету? Доступные цвета: ${COLORS.join(", ")}.\n` +
        'Если не важно — введите "нет".',
      done: false
    };
  }

  // 3. Фильтр по цвету (или "нет")
  if (state.step === CATALOG_STEPS.COLOR) {
    const lower = trimmed.toLowerCase();
    let color = null;

    if (lower !== "нет") {
      color = normalizeColor(trimmed);
      if (!color) {
        return {
          newState: state,
          reply:
            `Не понял цвет. Введите один из: ${COLORS.join(", ")} ` +
            'или "нет".',
          done: false
        };
      }
    }

    return {
      newState: {
        command: COMMANDS.CATALOG,
        step: CATALOG_STEPS.SIZE,
        data: {
          ...state.data,
          color
        }
      },
      reply:
        "Если хотите, укажите размер (например 40). " +
        'Если не важно — введите "нет".',
      done: false
    };
  }

  // 4. Фильтр по размеру (или "нет") и выдача результата
  if (state.step === CATALOG_STEPS.SIZE) {
    const lower = trimmed.toLowerCase();
    let size = null;

    if (lower !== "нет") {
      const normalized = trimmed.replace(",", ".").trim();
      const num = Number(normalized);

      if (Number.isNaN(num)) {
        return {
          newState: state,
          reply: 'Нужно число размера (например 40) или "нет".',
          done: false
        };
      }

      size = num;
    }

    const filters = {
      categoryKey: state.data.categoryKey,
      brand: state.data.brand,
      color: state.data.color,
      size
    };

    const list = filterShoes(filters);

    if (!list.length) {
      return {
        newState: state,
        reply: "По выбранным фильтрам ничего не найдено.",
        done: true
      };
    }

    const textResult = formatShoesList(list);

    return {
      newState: state,
      reply: `Подходящие модели:\n\n${textResult}`,
      done: true
    };
  }

  return {
    newState: state,
    reply: "Что-то пошло не так. Попробуйте /catalog ещё раз.",
    done: true
  };
}