export interface WaterFootprintItem {
  id: number;
  name: string;
  category: "food" | "clothing" | "electronics";
  liters: number;
  unit: string;
  fact: string;
}

export const waterFootprintData: WaterFootprintItem[] = [
  // Food items
  {
    id: 1,
    name: "Beef Burger",
    category: "food",
    liters: 2400,
    unit: "burger",
    fact: "A single beef burger requires more water than most people use in two months of drinking water. This includes water for growing feed crops, drinking water for cattle, and processing."
  },
  {
    id: 2,
    name: "Cup of Coffee",
    category: "food",
    liters: 140,
    unit: "cup",
    fact: "Your morning coffee requires about 140 liters of water - equivalent to nearly two bathtubs full. This includes water for growing, processing, and roasting the coffee beans."
  },
  {
    id: 3,
    name: "Glass of Milk",
    category: "food",
    liters: 200,
    unit: "glass (250ml)",
    fact: "It takes about 200 liters of water to produce one glass of milk, including water for the cow to drink, grow feed, and clean the facilities."
  },
  {
    id: 4,
    name: "Slice of Bread",
    category: "food",
    liters: 40,
    unit: "slice",
    fact: "Each slice of bread requires about 40 liters of water to produce, mainly for growing and processing the wheat."
  },
  {
    id: 5,
    name: "Apple",
    category: "food",
    liters: 125,
    unit: "apple",
    fact: "An average apple needs about 125 liters of water to grow. Apples are actually quite water-intensive fruits due to their long growing season."
  },
  {
    id: 6,
    name: "Chocolate Bar",
    category: "food",
    liters: 1700,
    unit: "100g bar",
    fact: "A chocolate bar requires massive amounts of water mainly for growing cocoa beans. Cocoa trees need consistent rainfall and irrigation."
  },
  
  // Clothing items
  {
    id: 7,
    name: "Cotton T-Shirt",
    category: "clothing",
    liters: 2700,
    unit: "shirt",
    fact: "A single cotton t-shirt uses about 2,700 liters of water to produce - that's enough drinking water for one person for 3.5 years!"
  },
  {
    id: 8,
    name: "Pair of Jeans",
    category: "clothing",
    liters: 7500,
    unit: "pair",
    fact: "Jeans are incredibly water-intensive, requiring about 7,500 liters of water. This includes growing cotton, dyeing with indigo, and multiple wash cycles during production."
  },
  {
    id: 9,
    name: "Leather Shoes",
    category: "clothing",
    liters: 8000,
    unit: "pair",
    fact: "Leather shoes have one of the highest water footprints in fashion. The water is used for raising cattle, tanning leather, and manufacturing processes."
  },
  {
    id: 10,
    name: "Cotton Dress",
    category: "clothing",
    liters: 5000,
    unit: "dress",
    fact: "Cotton dresses require about 5,000 liters of water to produce. Cotton is a very thirsty crop, especially when grown in dry regions with irrigation."
  },
  
  // Electronics
  {
    id: 11,
    name: "Smartphone",
    category: "electronics",
    liters: 12000,
    unit: "phone",
    fact: "Manufacturing a smartphone requires about 12,000 liters of water for mining rare earth metals, chip production, and assembly processes."
  },
  {
    id: 12,
    name: "Laptop Computer",
    category: "electronics",
    liters: 25000,
    unit: "laptop",
    fact: "A laptop requires about 25,000 liters of water to manufacture. Most water is used in semiconductor fabrication and cooling during production."
  },
  {
    id: 13,
    name: "Tablet",
    category: "electronics",
    liters: 15000,
    unit: "tablet",
    fact: "Tablets require significant water for manufacturing processors and screens. The semiconductor industry is one of the most water-intensive manufacturing sectors."
  },
  {
    id: 14,
    name: "Television",
    category: "electronics",
    liters: 35000,
    unit: "TV",
    fact: "A television requires about 35,000 liters of water to manufacture, primarily for producing the display panel and electronic components."
  },
  {
    id: 15,
    name: "Gaming Console",
    category: "electronics",
    liters: 20000,
    unit: "console",
    fact: "Gaming consoles have complex manufacturing processes requiring about 20,000 liters of water for chip fabrication and cooling systems."
  }
];