export const CATEGORIES = {
  men: "мужская",
  women: "женская",
  kids: "детская"
};

export const BRANDS = ["Nike", "Adidas", "Puma"];

export const COLORS = ["черный", "белый", "серый"];

export const SHOES = [
  // ==== МУЖСКАЯ ====
  {
    id: "m1",
    name: "Nike Air Max 270",
    category: "men",
    brand: "Nike",
    color: "черный",
    sizes: [40, 41, 42, 43],
    stores: ["ТЦ Европа", "ТЦ Радуга"],
    sizeFeedback: "маломерит, лучше брать на размер больше"
  },
  {
    id: "m2",
    name: "Adidas Gazelle",
    category: "men",
    brand: "Adidas",
    color: "серый",
    sizes: [40, 41, 42, 43, 44],
    stores: ["ТЦ Мега"],
    sizeFeedback: "чуть большемерит на полразмера"
  },
  {
    id: "m3",
    name: "Puma Smash V2",
    category: "men",
    brand: "Puma",
    color: "белый",
    sizes: [41, 42, 43, 44],
    stores: ["ТЦ Европа"],
    sizeFeedback: "в целом соответствует размеру"
  },

  // ==== ЖЕНСКАЯ ====
  {
    id: "w1",
    name: "Adidas Ultraboost",
    category: "women",
    brand: "Adidas",
    color: "белый",
    sizes: [36, 37, 38, 39],
    stores: ["ТЦ Мега"],
    sizeFeedback: "соответствует размеру"
  },
  {
    id: "w2",
    name: "Nike Air Force 1 Shadow",
    category: "women",
    brand: "Nike",
    color: "черный",
    sizes: [36, 37, 38, 39, 40],
    stores: ["ТЦ Европа"],
    sizeFeedback: "слегка маломерит по подъёму"
  },
  {
    id: "w3",
    name: "Puma Carina",
    category: "women",
    brand: "Puma",
    color: "серый",
    sizes: [36, 37, 38, 39],
    stores: ["ТЦ Радуга"],
    sizeFeedback: "соответствует размеру, комфортная колодка"
  },

  // ==== ДЕТСКАЯ ====
  {
    id: "k1",
    name: "Puma Kids Runner",
    category: "kids",
    brand: "Puma",
    color: "серый",
    sizes: [30, 31, 32, 33],
    stores: ["ТЦ Радуга"],
    sizeFeedback: "немного большемерит"
  },
  {
    id: "k2",
    name: "Nike Revolution Kids",
    category: "kids",
    brand: "Nike",
    color: "черный",
    sizes: [29, 30, 31, 32],
    stores: ["ТЦ Европа"],
    sizeFeedback: "соответствует размеру, удобна на узкую стопу"
  },
  {
    id: "k3",
    name: "Adidas FortaRun Kids",
    category: "kids",
    brand: "Adidas",
    color: "белый",
    sizes: [30, 31, 32, 33, 34],
    stores: ["ТЦ Мега"],
    sizeFeedback: "чуть маломерит, лучше брать +0.5–1 размера"
  }
];