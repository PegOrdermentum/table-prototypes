export type MenuItemStatus = "draft" | "published" | "experiment";

export interface MenuItem {
  id: string;
  image: string;
  name: string;
  price: number;
  foodCost: number;
  margin: number;
  status: MenuItemStatus;
  category: string;
  description: string;
  allergens: string[];
}

export const menuItems: MenuItem[] = [
  {
    id: "menu-001",
    image: "https://picsum.photos/seed/menu1/80/80",
    name: "Truffle Mushroom Risotto",
    price: 28.0,
    foodCost: 8.4,
    margin: 70,
    status: "published",
    category: "Mains",
    description: "Arborio rice with wild mushrooms, truffle oil, and parmesan",
    allergens: ["dairy", "gluten"],
  },
  {
    id: "menu-002",
    image: "https://picsum.photos/seed/menu2/80/80",
    name: "Grilled Barramundi",
    price: 34.0,
    foodCost: 12.58,
    margin: 63,
    status: "published",
    category: "Mains",
    description: "Pan-seared barramundi with lemon butter sauce and seasonal vegetables",
    allergens: ["fish", "dairy"],
  },
  {
    id: "menu-003",
    image: "https://picsum.photos/seed/menu3/80/80",
    name: "Wagyu Beef Burger",
    price: 26.0,
    foodCost: 9.62,
    margin: 63,
    status: "published",
    category: "Mains",
    description: "Wagyu patty with aged cheddar, caramelized onions, brioche bun",
    allergens: ["dairy", "gluten", "egg"],
  },
  {
    id: "menu-004",
    image: "https://picsum.photos/seed/menu4/80/80",
    name: "Spicy Tuna Tartare",
    price: 22.0,
    foodCost: 8.8,
    margin: 60,
    status: "experiment",
    category: "Entrees",
    description: "Diced fresh tuna with sriracha mayo, avocado, and wonton crisps",
    allergens: ["fish", "gluten", "soy"],
  },
  {
    id: "menu-005",
    image: "https://picsum.photos/seed/menu5/80/80",
    name: "Burrata Salad",
    price: 19.0,
    foodCost: 5.7,
    margin: 70,
    status: "published",
    category: "Entrees",
    description: "Fresh burrata with heirloom tomatoes, basil, and aged balsamic",
    allergens: ["dairy"],
  },
  {
    id: "menu-006",
    image: "https://picsum.photos/seed/menu6/80/80",
    name: "Duck Confit Tacos",
    price: 18.0,
    foodCost: 7.2,
    margin: 60,
    status: "draft",
    category: "Entrees",
    description: "Slow-cooked duck in corn tortillas with mango salsa",
    allergens: ["gluten"],
  },
  {
    id: "menu-007",
    image: "https://picsum.photos/seed/menu7/80/80",
    name: "Matcha Crème Brûlée",
    price: 16.0,
    foodCost: 3.2,
    margin: 80,
    status: "experiment",
    category: "Desserts",
    description: "Classic crème brûlée infused with ceremonial grade matcha",
    allergens: ["dairy", "egg"],
  },
  {
    id: "menu-008",
    image: "https://picsum.photos/seed/menu8/80/80",
    name: "Chocolate Lava Cake",
    price: 18.0,
    foodCost: 4.5,
    margin: 75,
    status: "published",
    category: "Desserts",
    description: "Warm chocolate fondant with vanilla bean ice cream",
    allergens: ["dairy", "egg", "gluten"],
  },
  {
    id: "menu-009",
    image: "https://picsum.photos/seed/menu9/80/80",
    name: "Lobster Bisque",
    price: 24.0,
    foodCost: 10.8,
    margin: 55,
    status: "draft",
    category: "Entrees",
    description: "Creamy lobster soup with cognac and chive oil",
    allergens: ["shellfish", "dairy"],
  },
  {
    id: "menu-010",
    image: "https://picsum.photos/seed/menu10/80/80",
    name: "Vegan Buddha Bowl",
    price: 22.0,
    foodCost: 5.5,
    margin: 75,
    status: "published",
    category: "Mains",
    description: "Quinoa bowl with roasted vegetables, tahini dressing, and tempeh",
    allergens: ["soy", "sesame"],
  },
];
