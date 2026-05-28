import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  ClipboardList,
  Download,
  FileSpreadsheet,
  Package,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Upload,
  Users,
  Utensils,
  WalletCards,
  Scale,
  Pencil,
  Save,
  X,
} from "lucide-react";
function Card({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function Button({ children, className = "", ...props }) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}

function Input({ className = "", ...props }) {

      {...props}
    />
  );
}


const STOCKTAKE_DATE = "22.05.2026";
const NL = String.fromCharCode(10);

const PRODUCT_DATA = `
1|Angus Beefburger pack of 8 of 170gr C 5020958|Meat & Calamari|unidad|11.99|25
2|Argentinian Beef Fillet Stanta Giulia|Meat & Calamari|kg|29.5|16.5
3|Beef Milanesa 150g Rump|Meat & Calamari|unidad|1.73|67
4|Chicken fillets|Meat & Calamari|kg|6.6|0
5|Chicken Milanesa 200gr Fillet|Meat & Calamari|unidad|0.99|58
6|Chicken Thighs Boneless|Meat & Calamari|kg|6|0
7|Chorizo Criollo|Meat & Calamari|unidad|1.17|0
8|Morcilla|Meat & Calamari|unidad|1.17|0
9|Rioplatense Arg Ribeye|Meat & Calamari|kg|32.5|23.7
10|Rioplatense Arg rump Hearts|Meat & Calamari|kg|15.95|31.7
11|Rioplatense Arg Striploin|Meat & Calamari|kg|17.5|40.8
12|Smoked Rindless Back Bacon|Meat & Calamari|kg|4.54|1
13|T bone|Meat & Calamari|unidad|0.28|0
14|Entraña NZ Ocean T Hixson|Meat & Calamari|kg|14|13.6
15|Chorizo Criollo 125g La Ribera Rellman|Meat & Calamari|unidad|0|0
16|Squid tubes U5 1Kg F 34300 700g net|Meat & Calamari|kg|4.15|2
17|Ribeye Ocean|Meat & Calamari|kg|0|12.4
18|Chorizo Tusca El CONCHEL|Meat & Calamari|unidad|0|69
19|Frozen spinach|Frozen Vegetables|kg|2.4|20
20|Strong Roots Sweet Potato Fries F 5027298|Frozen Vegetables|kg|39.99|47.5
21|Sysco Premium Coated Thin Skin on Fries F 132878|Frozen Vegetables|kg|19.92|52.5
22|Burger Cheese slices 112|Dairy|unidad|0.09|65
23|Chocolate ice cream|Dairy|L|24|8
24|Cream Cheese Philadelphia wholesome C 71130|Dairy|kg|18.76|1.65
25|Dulce de leche Icecream|Dairy|L|26|8
26|Hellmanns Mayonnaise 5 LTR|Dairy|L|35.98|5
27|Lemon Sorbet|Dairy|L|12|4
28|Mozzarella Slices pack 1 of 500gr Case 12 C 591014|Dairy|kg|3.69|1.2
29|Parmigiano Italian hard cheese C 149914|Dairy|kg|10.86|0
30|Provolone Cheese Real Provoleta|Dairy|kg|9.5|7.8
31|Strawberrie Sorbet|Dairy|L|12|2
32|Traditional Vanilla Ice Cream|Dairy|L|24|12
33|Bacon Prime meats Unsmoked Streaky|Dairy|kg|13.29|1
34|Blue Stilton Brakes Quarter C 71508|Dairy|kg|24.99|0.5
35|Burger Cheese slices|Dairy|unidad|0|0
36|Butter salted Brakes|Dairy|kg|59.99|6.7
37|Double Cream Fresh C 70215|Dairy|L|8.09|6.81
38|Eggs Ballygarvey 60 British barn A 152412|Dairy|unidad|12.4|134
39|Ham Sainsburys packs of 400g|Dairy|kg|2.25|0
40|Milk whole 2.27Lt pack of 6|Dairy|L|11.88|27.24
41|Mozzarella Shredded cheese 1 x 2Kg C 22053|Dairy|kg|12.76|0
42|Philadelphia original soft cheese 1.65Kg|Dairy|kg|18.02|0
43|Sysco Classic Shredded Mozzarella cheese 2Kg|Dairy|kg|12.26|8
44|Cauliflower|Vegetables|unidad|1.69|0
45|Cos Lettuce C 10401|Vegetables|unidad|0.81|0
46|Courgettes green|Vegetables|kg|2.73|1.5
47|Crushed red peppers|Vegetables|kg|75|3.5
48|Cucumber|Vegetables|unidad|0.71|2
49|Flat leaf parsley C 450450|Vegetables|kg|9.45|1
50|Garlic Peeled Vac Pack 1 kg|Vegetables|kg|5.1|0.5
51|Grapefruit pink|Vegetables|unidad|1.16|3
52|Lemons C 123502|Vegetables|unidad|3.91|12
53|Limes C 10478|Vegetables|unidad|1.5|35
54|Mint large bunch|Vegetables|unidad|1.32|1
55|Mushrooms cup C 124655|Vegetables|kg|11.05|5
56|Onions white|Vegetables|kg|2.15|11.2
57|Oranges large|Vegetables|unidad|2.71|3
58|Oregano fresh bunch|Vegetables|kg|2.05|0
59|Passion fruit|Vegetables|unidad|3.36|2
60|Peppers Green 1Kg|Vegetables|kg|3.61|0
61|Peppers Red 5kg|Vegetables|kg|16.24|4.5
62|Peppers Yellow 1Kg|Vegetables|kg|3.74|1
63|Potatoes red|Vegetables|kg|18.19|10.8
64|Red Onions 1KG|Vegetables|kg|0.99|3.8
65|Rocket C 5001984|Vegetables|kg|2.55|0
66|Spring Onion Bunches|Vegetables|unidad|0.5|0
67|Tomato Salad Beef C 13010|Vegetables|kg|19.02|3
68|Tomatoes Cherry 250 gr|Vegetables|kg|0.82|10
69|White Cabbage|Vegetables|unidad|0.99|0
70|Bread flour strong Wildfarmed A188374|Dry Goods|kg|26.78|8
71|Bread flour strong Sysco A 9714|Dry Goods|kg|15.32|0
72|Breadcrumbs uncoloured A 33853|Dry Goods|kg|9.19|3.7
73|Burger brioche buns 4 inch F 113146|Dry Goods|unidad|15.98|10
74|Brown Paper takeaway A132654|Dry Goods|unidad|17.8|180
75|Cornflour Sysco classic A 5946|Dry Goods|kg|11.31|34
76|Cocktail sticks 1000 pack A 28059|Dry Goods|unidad|1.16|500
77|Malt Vinegar 2 x 5L|Dry Goods|L|3.15|35
78|Nutella 1Kg A5004045|Dry Goods|kg|8.1|1
79|Yeast 500g|Dry Goods|kg|6.69|0.25
80|Balsamic Vinegar|Dry Goods|L|0|2
81|Chopped Tomatoes Sysco 2.5Kg can A 6437|Dry Goods|kg|2.99|7.65
82|Black pepper cracked A 85290|Dry Goods|kg|24.59|1
83|Crackers|Dry Goods|unidad|0|0
84|Dulce de leche 7k|Dry Goods|kg|46.9|7
85|Mustard English 1 x 2.25Ltr|Dry Goods|L|16.27|2.5
86|Extra Virgin Olive Oil|Dry Goods|L|51.25|2
87|Olives Pitted Marinated pack of 1 of 2.8Kg C 20335|Dry Goods|kg|17.99|8.4
88|Ketchup Heinz 4Lt|Dry Goods|L|41.44|4
89|Maldon Salt 1.4KG|Dry Goods|kg|12.29|1.3
90|Oil Rapeseed Extended life 20Lt A 9802|Dry Goods|L|31.99|20
91|Oregano Dry|Dry Goods|kg|0.02|0.1
92|Paprika Powder 1 x 1300grm|Dry Goods|kg|9.49|1.3
93|Pitted green olives 2kg net weight|Dry Goods|kg|16.99|4
94|Sal Celusal|Dry Goods|kg|1.95|9
95|Sugar Tate and Lyle granulated 5Kg A 10465|Dry Goods|kg|6.69|3.3
96|Salt Table 3kg|Dry Goods|kg|4.96|1
97|Vinegar white Hazlemere A 151025|Dry Goods|L|4.25|7.5
98|Takeaway boxes 9x6inch A 5009280|Dry Goods|unidad|33.06|79
99|Preema Vanilla Essence 500ml A 86874|Dry Goods|L|5.61|0.5
100|Bleach thick A 136383|Cleaning Materials|L|8.75|5
101|Blue paper kitchen wipes Classic 2 ply A10515|Cleaning Materials|unidad|8.79|2
102|Blue Cloth plus pack of 1x50|Cleaning Materials|unidad|8.83|1
103|Black gloves L A 149522|Cleaning Materials|unidad|5.79|1
104|Black gloves M A 149521|Cleaning Materials|unidad|5.79|0
105|Glass and Stainless steel cleaner A 133755|Cleaning Materials|unidad|6.64|1
106|Napkins poppies white 8F 2ply A136255|Cleaning Materials|unidad|41.09|0
107|Napkins Dunisoft Napkin Bio A 136418|Cleaning Materials|unidad|38.76|30
108|Sponge scourer Pack of 10|Cleaning Materials|unidad|1.69|3
109|Finish Professional Liquid Dishwasher Detergent 5L A 113398|Cleaning Materials|unidad|18.02|0
110|Fairy Professional Washing Up Liquid 6x900ml A 114736|Cleaning Materials|unidad|14.52|8
111|Paclan 80 Heavy Duty Refuse Sacks 110L A 152273|Cleaning Materials|unidad|11.53|80
112|Brakes Essentials Kitchen Degreaser A 136376|Cleaning Materials|unidad|10.72|6
113|Red Bucket and Wringer 15L A 89340|Cleaning Materials|unidad|3.42|2
114|Trinity Hygiene Socket Mop Med Red A 5025348|Cleaning Materials|unidad|3.28|4
115|137cm RHP Handle Red A 591187|Cleaning Materials|unidad|4.37|4
116|Brakes Essentials Non-Biological Laundry Detergent A 136388|Cleaning Materials|unidad|19.56|2
117|Chicken thighs sysco essentials C 132801|Staff Meals|unidad|46.99|0.5
118|Pork loins steaks C 74753|Staff Meals|unidad|19.7|0
`;

function recipe(id, section, name, salePrice, prepInstructions, storageInstructions, ingredients) {
  return { id, section, name, salePrice, prepInstructions, storageInstructions, ingredients };
}

function parseProducts() {
  return PRODUCT_DATA.trim().split(NL).map((line) => {
    const [id, name, category, unit, price, stock] = line.split("|");
    const realStock = Number(stock || 0);
    return { id: Number(id), name, category, unit, price: Number(price || 0), realStock, theoreticalStock: realStock, parLevel: Number(Math.max(unit === "unidad" ? 5 : 1, realStock * 0.4).toFixed(2)) };
  });
}

const initialProducts = parseProducts();

function productId(keyword) {
  const needle = String(keyword || "").toLowerCase();
  const product = initialProducts.find((item) => item.name.toLowerCase().includes(needle));
  return product?.id || initialProducts[0].id;
}

function ing(keyword, qty, unit) {
  return { productId: productId(keyword), qty: Number(qty || 0), unit };
}

const initialRecipes = [
  recipe(1, "Main", "Ribeye 250g", 35, "Season ribeye, grill over high heat, rest 5 minutes.", "Store vacuum sealed at 0-2C for maximum 4 days.", [ing("ribeye", 0.25, "kg")]),
  recipe(2, "Main", "Churrasco 220g", 22.5, "Grill over charcoal and finish with Maldon salt.", "Keep refrigerated under 2C.", [ing("rump hearts", 0.22, "kg")]),
  recipe(3, "Main", "Sirloin 400g", 35, "Temper before grilling and cook medium rare.", "Keep refrigerated under 2C.", [ing("striploin", 0.4, "kg")]),
  recipe(4, "Main", "Thin Skirt 220g", 22.5, "Cook quickly over high heat.", "Keep refrigerated under 2C.", [ing("entraña", 0.22, "kg")]),
  recipe(5, "Burger", "Bife Burger", 19.95, "Grill burger, toast bun, assemble with cheese and egg.", "Keep cooked components separate and refrigerated.", [ing("angus beefburger", 1, "unidad"), ing("burger brioche", 1, "unidad"), ing("eggs", 1, "unidad")]),
  recipe(6, "Starter", "Breadbasket", 5.5, "Serve warm bread with Stilton butter and olives.", "Keep bread dry. Use within 24h.", [ing("bread flour strong wildfarmed", 0.12, "kg"), ing("blue stilton", 0.025, "kg"), ing("olives pitted", 0.04, "kg"), ing("butter salted", 0.03, "kg")]),
  recipe(7, "Side", "Papas fritas", 5, "Fry from frozen until crispy.", "Keep frozen until use.", [ing("thin skin on fries", 0.2, "kg")]),
  recipe(8, "Side", "Sweet Potato Fries", 7, "Fry from frozen in clean oil.", "Keep frozen until use.", [ing("sweet potato fries", 0.2, "kg")]),
  recipe(9, "Production", "Mash potatoes", 0, "Boil potatoes, drain, mash with butter, milk and seasoning.", "Cool quickly. Store labelled below 5C for max 48h.", [ing("potatoes", 1, "kg"), ing("butter salted", 0.12, "kg"), ing("milk", 0.1, "L"), ing("salt table", 0.01, "kg")]),
  recipe(10, "Production", "Cream spinach", 0, "Cook spinach with cream, butter, salt and cracked pepper until reduced.", "Cool quickly. Store labelled below 5C for max 48h.", [ing("frozen spinach", 1, "kg"), ing("double cream", 0.35, "L"), ing("butter salted", 0.08, "kg"), ing("black pepper", 0.002, "kg")]),
  recipe(11, "Production", "Vegetales grillados", 0, "Slice vegetables, season, grill, cool and portion.", "Store below 5C for max 48h.", [ing("courgettes", 0.5, "kg"), ing("peppers red", 0.4, "kg"), ing("peppers yellow", 0.25, "kg"), ing("extra virgin", 0.05, "L")]),
  recipe(12, "Sauce", "Salsa Blue Stilton", 4, "Melt Stilton into warm cream and whisk until smooth.", "Store below 5C for max 72h. Reheat gently.", [ing("blue stilton", 0.12, "kg"), ing("double cream", 0.3, "L"), ing("butter salted", 0.03, "kg")]),
  recipe(13, "Sauce", "Salsa Peppercorn", 4, "Toast pepper, add cream and reduce until sauce consistency.", "Store below 5C for max 72h. Reheat gently.", [ing("black pepper", 0.02, "kg"), ing("double cream", 0.35, "L"), ing("butter salted", 0.03, "kg")]),
  recipe(14, "Empanadas", "Empanada de beef", 3.5, "Prepare beef filling, portion, fill dough, fold and cook until golden.", "Keep filling below 5C. Cooked empanadas hot hold above 63C or chill fast.", [ing("rump hearts", 0.08, "kg"), ing("onions white", 0.04, "kg"), ing("bread flour strong", 0.05, "kg")]),
  recipe(15, "Empanadas", "Empanada de spicy beef", 3.5, "Prepare spicy beef filling with paprika and chilli, fill and cook.", "Keep filling below 5C. Use within 48h.", [ing("rump hearts", 0.08, "kg"), ing("paprika", 0.003, "kg"), ing("crushed red peppers", 0.005, "kg"), ing("bread flour strong", 0.05, "kg")]),
  recipe(16, "Empanadas", "Empanada de jamon y queso", 3.5, "Dice ham and cheese, fill dough, fold and cook.", "Keep refrigerated below 5C. Use within 48h.", [ing("ham", 0.05, "kg"), ing("mozzarella", 0.05, "kg"), ing("bread flour strong", 0.05, "kg")]),
  recipe(17, "Empanadas", "Empanada criolla / seasonal", 3.5, "Prepare seasonal filling, portion, fill and cook.", "Label with filling and date. Use within 48h.", [ing("onions white", 0.05, "kg"), ing("peppers red", 0.04, "kg"), ing("bread flour strong", 0.05, "kg")]),
  recipe(18, "Empanadas", "Empanada de pollo", 3.5, "Cook chicken filling, cool, fill dough and cook until golden.", "Keep filling below 5C. Use within 48h.", [ing("chicken fillets", 0.08, "kg"), ing("onions white", 0.04, "kg"), ing("bread flour strong", 0.05, "kg")]),
  recipe(19, "Empanadas", "Empanada de spinach", 3.5, "Cook spinach filling with cheese, cool, fill and cook.", "Keep filling below 5C. Use within 48h.", [ing("frozen spinach", 0.08, "kg"), ing("mozzarella", 0.04, "kg"), ing("bread flour strong", 0.05, "kg")]),
  recipe(20, "Dessert", "Cheesecake de dulce de leche", 7, "Prepare cheesecake base and cream cheese mix. Finish with dulce de leche.", "Store covered below 5C for max 3 days.", [ing("philadelphia", 0.12, "kg"), ing("dulce de leche", 0.06, "kg"), ing("sugar", 0.03, "kg")]),
  recipe(21, "Dessert", "Cheesecake de vainilla", 7, "Prepare vanilla cheesecake mix and bake or set according to method.", "Store covered below 5C for max 3 days.", [ing("philadelphia", 0.12, "kg"), ing("vanilla", 0.003, "L"), ing("sugar", 0.035, "kg")]),
  recipe(22, "Dessert", "Panqueques", 7, "Prepare batter, cook thin pancakes, fill with Nutella or dulce de leche.", "Batter below 5C for 24h. Cooked pancakes wrapped below 5C.", [ing("eggs", 1, "unidad"), ing("milk", 0.12, "L"), ing("bread flour strong", 0.06, "kg"), ing("nutella", 0.05, "kg")]),
  recipe(23, "Dessert", "Flan", 7, "Prepare caramel, mix eggs, milk, sugar and vanilla, bake in bain marie.", "Store covered below 5C for max 3 days.", [ing("eggs", 1, "unidad"), ing("milk", 0.18, "L"), ing("sugar", 0.05, "kg"), ing("vanilla", 0.003, "L")]),
  recipe(24, "Bakery", "Pan casero para bread basket", 0, "Mix, knead, proof, portion and bake bread for bread basket.", "Store dry, covered, labelled. Use within 24h.", [ing("bread flour strong wildfarmed", 1, "kg"), ing("yeast", 0.02, "kg"), ing("salt table", 0.02, "kg")]),
  recipe(25, "Bakery", "Pan para lomitos", 0, "Mix dough, proof, portion into sandwich buns and bake.", "Store dry and covered. Use within 24h or freeze.", [ing("bread flour strong", 1, "kg"), ing("yeast", 0.02, "kg"), ing("butter salted", 0.08, "kg")]),
  recipe(26, "Mise en place", "Mise en place de calamaris", 0, "Defrost safely, cut, dry, portion and keep ready for service.", "Store covered below 5C. Use within 24h after defrost.", [ing("squid tubes", 1, "kg"), ing("bread flour strong", 0.15, "kg"), ing("lemons", 2, "unidad")]),
  recipe(27, "Mise en place", "Mise en place de ensalada de tomates", 0, "Slice tomatoes and onions, season and portion for service.", "Store covered below 5C. Best same day.", [ing("tomato salad", 1, "kg"), ing("red onions", 0.25, "kg"), ing("extra virgin", 0.05, "L")]),
  recipe(28, "Mise en place", "Mise en place de champiniones", 0, "Clean and cut mushrooms. Saute or portion raw depending on service use.", "Store covered below 5C for max 48h.", [ing("mushrooms", 1, "kg"), ing("butter salted", 0.05, "kg"), ing("garlic", 0.02, "kg")]),
];

const sampleSalesRows = [
  { recipeId: 1, qty: 10 },
  { recipeId: 2, qty: 9 },
  { recipeId: 5, qty: 8 },
  { recipeId: 6, qty: 14 },
  { recipeId: 7, qty: 20 },
  { recipeId: 10, qty: 6 },
];

const modules = [
  { key: "dashboard", label: "Inicio", icon: BarChart3 },
  { key: "stock", label: "Stock", icon: Package },
  { key: "recipes", label: "Recetas", icon: ClipboardList },
  { key: "production", label: "Producción", icon: Utensils },
  { key: "waste", label: "Mermas", icon: Trash2 },
  { key: "sales", label: "Ventas", icon: WalletCards },
  { key: "report", label: "Reporte", icon: FileSpreadsheet },
  { key: "users", label: "Usuarios", icon: Users },
];

function money(value) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(Number(value || 0));
}

function productValue(product, field = "realStock") {
  return Number(product[field] || 0) * Number(product.price || 0);
}

function getRecipeCost(recipeItem, products) {
  return (recipeItem?.ingredients || []).reduce((total, item) => {
    const product = products.find((p) => p.id === Number(item.productId));
    return total + Number(item.qty || 0) * Number(product?.price || 0);
  }, 0);
}

function buildImpact(rows, recipes) {
  const map = new Map();
  rows.forEach((row) => {
    const selectedRecipe = recipes.find((item) => item.id === Number(row.recipeId));
    if (!selectedRecipe) return;
    selectedRecipe.ingredients.forEach((ingredientItem) => {
      const current = map.get(ingredientItem.productId) || 0;
      map.set(ingredientItem.productId, current + Number(ingredientItem.qty || 0) * Number(row.qty || 0));
    });
  });
  return Array.from(map.entries()).map(([productIdValue, qty]) => ({ productId: Number(productIdValue), qty }));
}

function applyImpact(products, impact, field = "theoreticalStock") {
  return products.map((product) => {
    const row = impact.find((item) => item.productId === product.id);
    if (!row) return product;
    return { ...product, [field]: Math.max(0, Number((Number(product[field] || 0) - row.qty).toFixed(3))) };
  });
}

function getProductStatus(product) {
  if (Number(product.realStock) <= Number(product.parLevel)) return "Comprar";
  if (Math.abs(Number(product.realStock) - Number(product.theoreticalStock)) > Number(product.parLevel) * 0.25) return "Revisar";
  return "OK";
}

function getWasteRowCost(row, products, recipes) {
  if (row.type === "recipe") {
    const selectedRecipe = recipes.find((item) => item.id === Number(row.recipeId));
    return getRecipeCost(selectedRecipe, products) * Number(row.qty || 0);
  }
  const product = products.find((item) => item.id === Number(row.productId));
  return Number(row.qty || 0) * Number(product?.price || 0);
}

function getWasteImpact(rows, recipes) {
  const recipeRows = rows.filter((row) => row.type === "recipe").map((row) => ({ recipeId: row.recipeId, qty: row.qty }));
  const recipeImpact = buildImpact(recipeRows, recipes);
  const productImpactMap = new Map(recipeImpact.map((item) => [item.productId, item.qty]));

  rows.filter((row) => row.type === "product").forEach((row) => {
    const current = productImpactMap.get(Number(row.productId)) || 0;
    productImpactMap.set(Number(row.productId), current + Number(row.qty || 0));
  });

  return Array.from(productImpactMap.entries()).map(([productIdValue, qty]) => ({ productId: Number(productIdValue), qty }));
}

function getWeeklyMetrics(products, recipes, salesRows, wasteRows) {
  const sales = salesRows.reduce((sum, row) => {
    const selectedRecipe = recipes.find((item) => item.id === Number(row.recipeId));
    return sum + Number(selectedRecipe?.salePrice || 0) * Number(row.qty || 0);
  }, 0);
  const theoreticalCost = salesRows.reduce((sum, row) => {
    const selectedRecipe = recipes.find((item) => item.id === Number(row.recipeId));
    return sum + (selectedRecipe ? getRecipeCost(selectedRecipe, products) * Number(row.qty || 0) : 0);
  }, 0);
  const wasteCost = wasteRows.reduce((sum, row) => sum + getWasteRowCost(row, products, recipes), 0);
  const currentStockValue = products.reduce((sum, item) => sum + productValue(item, "realStock"), 0);
  const theoreticalStockValue = products.reduce((sum, item) => sum + productValue(item, "theoreticalStock"), 0);
  const purchaseNeed = products.reduce((sum, item) => sum + Math.max(0, Number(item.parLevel) - Number(item.realStock)) * Number(item.price), 0);
  return { sales, theoreticalCost, wasteCost, currentStockValue, theoreticalStockValue, purchaseNeed, foodCost: sales ? (theoreticalCost / sales) * 100 : 0 };
}

function exportCsv(filename, rows) {
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join(NL);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function runDataTests() {
  console.assert(initialProducts.length === 118, "ARKA test: stocktake real debe tener 118 productos cargados");
  console.assert(initialRecipes.length >= 28, "ARKA test: recetas nuevas deben existir");
  console.assert(initialRecipes.some((item) => item.name === "Mise en place de calamaris"), "ARKA test: mise en place de calamaris existe");
  console.assert(initialRecipes.some((item) => item.name === "Mash potatoes"), "ARKA test: Producción debe incluir recetas cargadas");
  console.assert(initialRecipes.every((item) => item.prepInstructions && item.storageInstructions), "ARKA test: todas las recetas tienen instrucciones");
  console.assert(buildImpact(sampleSalesRows, initialRecipes).length > 0, "ARKA test: sales impact works");
  console.assert(getRecipeCost(initialRecipes[0], initialProducts) > 0, "ARKA test: recipe cost works");
  console.assert(getWeeklyMetrics(initialProducts, initialRecipes, sampleSalesRows, []).sales > 0, "ARKA test: weekly sales work");
  console.assert(applyImpact(initialProducts, buildImpact(sampleSalesRows, initialRecipes)).length === initialProducts.length, "ARKA test: impact keeps products");
  console.assert(getProductStatus({ realStock: 1, theoreticalStock: 2, parLevel: 5 }) === "Comprar", "ARKA test: par status works");
  console.assert(getWasteImpact([{ type: "product", productId: 1, qty: 1 }, { type: "recipe", recipeId: 1, qty: 1 }], initialRecipes).length > 0, "ARKA test: mermas acepta productos y recetas");
}
runDataTests();

function ArkaLogo({ compact = false }) {
  return (
    <div className="flex flex-col items-center justify-center text-white">
      <svg viewBox="0 0 220 220" className={compact ? "h-10 w-10" : "h-24 w-24"} aria-label="ARKA logo">
        <path d="M110 22 L197 178 H23 Z" fill="none" stroke="currentColor" strokeWidth="12" strokeLinejoin="miter" />
        <path d="M70 96 C70 142 88 178 110 178 C132 178 150 142 150 96" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
      </svg>
      {!compact && <div className="mt-2 text-2xl font-black tracking-[0.35em]">ARKA</div>}
    </div>
  );
}

function Header({ title, subtitle }) {
  return (
    <div className="mb-5">
      <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-[#d9bf94]">ARKA · {STOCKTAKE_DATE}</p>
      <h2 className="text-3xl font-black tracking-tight text-white">{title}</h2>
      <p className="mt-1 text-white/55">{subtitle}</p>
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, helper }) {
  return (
    <Card className="rounded-2xl border border-white/10 bg-[#15191a] text-white shadow-xl">
      <CardContent className="p-5">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/8 text-[#ead5b3]"><Icon size={23} /></div>
        <p className="text-sm font-semibold uppercase tracking-wide text-white/65">{label}</p>
        <p className="mt-1 text-3xl font-black">{value}</p>
        <p className="mt-2 text-sm text-white/50">{helper}</p>
      </CardContent>
    </Card>
  );
}

function Shell({ active, setActive, children }) {
  const mobileModules = modules.slice(0, 7);
  return (
    <div className="min-h-screen bg-[#080b0c] pb-24 text-[#f5efe5] lg:pb-0">
      <div className="mx-auto flex min-h-screen max-w-[1500px] flex-col lg:flex-row">
        <aside className="hidden border-r border-white/10 bg-[#050708] p-5 lg:block lg:w-64">
          <div className="mb-9 flex justify-center pt-2"><ArkaLogo /></div>
          <nav className="grid gap-2">
            {modules.map((item) => {
              const Icon = item.icon;
              const selected = active === item.key;
              return (
                <button key={item.key} onClick={() => setActive(item.key)} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${selected ? "bg-[#ead5b3] text-[#080b0c]" : "text-white/75 hover:bg-white/10"}`}>
                  <Icon size={18} />
                  <span className="font-semibold">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>
        <div className="flex flex-1 flex-col">
          <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-[#080b0c]/95 px-4 py-3 backdrop-blur lg:px-7">
            <div className="flex items-center gap-3"><ArkaLogo compact /><span className="hidden text-xl font-black tracking-[0.35em] sm:block">ARKA</span></div>
            <button className="rounded-xl bg-[#ead5b3] px-4 py-2 text-sm font-black text-[#17120c]">Cerrar semana</button>
          </div>
          <main className="flex-1 p-4 lg:p-7">{children}</main>
        </div>
      </div>
      <nav className="fixed bottom-3 left-3 right-3 z-50 grid grid-cols-7 gap-1 rounded-2xl border border-white/10 bg-[#080b0c] p-2 shadow-2xl lg:hidden">
        {mobileModules.map((item) => {
          const Icon = item.icon;
          const selected = active === item.key;
          return (
            <button key={item.key} onClick={() => setActive(item.key)} className={`flex flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[10px] font-bold transition ${selected ? "bg-[#ead5b3] text-[#080b0c]" : "text-white/75"}`}>
              <Icon size={17} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function Dashboard({ products, recipes, salesRows, wasteRows }) {
  const metrics = getWeeklyMetrics(products, recipes, salesRows, wasteRows);
  const purchaseList = products.filter((item) => Number(item.realStock) <= Number(item.parLevel));
  const alerts = [
    ...purchaseList.slice(0, 4).map((item) => `${item.name}: debajo de PAR`),
    ...products.filter((item) => getProductStatus(item) === "Revisar").slice(0, 2).map((item) => `${item.name}: revisar diferencia real vs teórico`),
  ];
  return (
    <>
      <Header title="Inicio simple" subtitle="Lo importante del día: ventas, stock, PAR, mermas y compras para la próxima semana." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard icon={WalletCards} label="Ventas cargadas" value={money(metrics.sales)} helper="Diarias, semanales, quincenales o mensuales" />
        <KpiCard icon={Scale} label="Food Cost teórico" value={`${metrics.foodCost.toFixed(1)}%`} helper={`Costo usado: ${money(metrics.theoreticalCost)}`} />
        <KpiCard icon={Trash2} label="Pérdidas" value={money(metrics.wasteCost)} helper="Mermas registradas" />
        <KpiCard icon={Package} label="Comprar" value={money(metrics.purchaseNeed)} helper="Para llegar a PAR level" />
      </div>
      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <Card className="rounded-2xl border border-white/10 bg-[#15191a] text-white shadow-xl">
          <CardContent className="p-5">
            <h3 className="mb-4 text-xl font-black">Alertas simples</h3>
            <div className="grid gap-3">
              {alerts.length === 0 && <div className="rounded-xl bg-white/5 p-3 text-white/60">Sin alertas críticas.</div>}
              {alerts.map((alert, index) => <div key={index} className="rounded-xl bg-white/5 p-3 text-sm">⚠️ {alert}</div>)}
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border border-white/10 bg-[#15191a] text-white shadow-xl">
          <CardContent className="p-5">
            <h3 className="mb-4 text-xl font-black">Resumen semanal real</h3>
            <div className="grid gap-3 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2"><span>Stock real actual</span><b>{money(metrics.currentStockValue)}</b></div>
              <div className="flex justify-between border-b border-white/10 pb-2"><span>Stock teórico</span><b>{money(metrics.theoreticalStockValue)}</b></div>
              <div className="flex justify-between border-b border-white/10 pb-2"><span>Diferencia estimada</span><b>{money(metrics.currentStockValue - metrics.theoreticalStockValue)}</b></div>
              <div className="flex justify-between"><span>Necesario próxima semana</span><b>{money(metrics.purchaseNeed)}</b></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function StockScreen({ products, setProducts }) {
  const [query, setQuery] = useState("");
  const [fileName, setFileName] = useState("");
  const filtered = products.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  const updateProduct = (id, field, value) => setProducts((items) => items.map((item) => item.id === id ? { ...item, [field]: Number(value) } : item));
  const quickUpdate = (id, field, delta) => setProducts((items) => items.map((item) => item.id === id ? { ...item, [field]: Math.max(0, Number((Number(item[field] || 0) + delta).toFixed(3))) } : item));
  const importStockFile = (event) => {
    const file = event.target.files?.[0];
    if (file) setFileName(file.name);
  };
  return (
    <>
      <Header title="Stock diario" subtitle="Stock real, stock teórico, PAR level y necesidad de compra." />
      <div className="mb-4 grid gap-3 rounded-2xl border border-white/10 bg-[#15191a] p-4 md:grid-cols-[1fr_auto]">
        <div className="relative"><Search className="absolute left-4 top-3.5 text-white/45" size={18} /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar producto" className="h-12 rounded-xl border-white/10 bg-white/5 pl-11 text-white" /></div>
        <label className="flex h-12 cursor-pointer items-center justify-center rounded-xl bg-[#ead5b3] px-5 font-bold text-[#120e08]"><Upload className="mr-2" size={18} /> Cargar stock real<input type="file" accept=".pdf,.xlsx,.xls,.csv,.ods,image/*" onChange={importStockFile} className="hidden" /></label>
      </div>
      {fileName && <div className="mb-4 rounded-xl bg-[#ead5b3] p-3 text-sm font-bold text-[#120e08]">Archivo listo para procesar: {fileName}</div>}
      <div className="grid gap-3">
        {filtered.map((item) => {
          const need = Math.max(0, Number(item.parLevel) - Number(item.realStock));
          const diff = Number(item.realStock) - Number(item.theoreticalStock);
          const status = getProductStatus(item);
          return (
            <motion.div layout key={item.id} className="rounded-2xl border border-white/10 bg-[#15191a] p-4 text-white">
              <div className="grid gap-3 lg:grid-cols-[1.4fr_0.75fr_0.75fr_0.75fr_0.9fr_0.75fr_170px] lg:items-center">
                <div><h3 className="font-black">{item.name}</h3><p className="text-sm text-white/50">{item.category} · {money(item.price)} / {item.unit}</p></div>
                <label className="text-xs text-white/55">Real<input type="number" step="0.001" value={item.realStock} onChange={(e) => updateProduct(item.id, "realStock", e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-white/10 bg-[#080b0c] px-3 text-white" /></label>
                <label className="text-xs text-white/55">Teórico<input type="number" step="0.001" value={item.theoreticalStock} onChange={(e) => updateProduct(item.id, "theoreticalStock", e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-white/10 bg-[#080b0c] px-3 text-white" /></label>
                <label className="text-xs text-white/55">PAR<input type="number" step="0.001" value={item.parLevel} onChange={(e) => updateProduct(item.id, "parLevel", e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-white/10 bg-[#080b0c] px-3 text-white" /></label>
                <div className="rounded-xl bg-white/5 p-3 text-sm"><b>Comprar:</b> {need.toFixed(2)} {item.unit}<br /><span className="text-white/50">Dif: {diff.toFixed(2)} {item.unit}</span></div>
                <div className={`rounded-xl p-3 text-center text-sm font-black ${status === "OK" ? "bg-green-500/20 text-green-300" : status === "Comprar" ? "bg-red-500/20 text-red-300" : "bg-yellow-500/20 text-yellow-300"}`}>{status}</div>
                <div className="flex items-center justify-end gap-2"><Button onClick={() => quickUpdate(item.id, "realStock", -1)} className="h-11 w-11 rounded-xl bg-white/10 text-white hover:bg-white/15">-</Button><div className="flex h-12 min-w-20 items-center justify-center rounded-xl bg-[#ead5b3] px-3 text-lg font-black text-[#120e08]">{item.realStock}</div><Button onClick={() => quickUpdate(item.id, "realStock", 1)} className="h-11 w-11 rounded-xl bg-[#ead5b3] text-[#120e08] hover:bg-[#dfc59b]">+</Button></div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}

function RecipeEditor({ draft, setDraft, products, onSave, onCancel }) {
  const updateField = (field, value) => setDraft((current) => ({ ...current, [field]: value }));
  const updateIngredient = (index, field, value) => setDraft((current) => ({ ...current, ingredients: current.ingredients.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: field === "qty" || field === "productId" ? Number(value) : value } : item) }));
  const addIngredient = () => setDraft((current) => ({ ...current, ingredients: [...current.ingredients, { productId: products[0].id, qty: 0, unit: products[0].unit }] }));
  const removeIngredient = (index) => setDraft((current) => ({ ...current, ingredients: current.ingredients.filter((_, itemIndex) => itemIndex !== index) }));
  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-[#080b0c] p-4">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-sm font-bold text-white/70">Nombre<Input value={draft.name} onChange={(e) => updateField("name", e.target.value)} className="mt-1 border-white/10 bg-white/5 text-white" /></label>
        <label className="text-sm font-bold text-white/70">Sección<Input value={draft.section} onChange={(e) => updateField("section", e.target.value)} className="mt-1 border-white/10 bg-white/5 text-white" /></label>
        <label className="text-sm font-bold text-white/70">Precio de venta<Input type="number" step="0.01" value={draft.salePrice} onChange={(e) => updateField("salePrice", Number(e.target.value))} className="mt-1 border-white/10 bg-white/5 text-white" /></label>
        <div className="rounded-xl bg-white/5 p-3 text-sm text-white/70">Costo actual<br /><b className="text-white">{money(getRecipeCost(draft, products))}</b></div>
        <label className="text-sm font-bold text-white/70 md:col-span-2">Instrucciones de preparación<textarea value={draft.prepInstructions} onChange={(e) => updateField("prepInstructions", e.target.value)} className="mt-1 min-h-24 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none" /></label>
        <label className="text-sm font-bold text-white/70 md:col-span-2">Instrucciones de almacenamiento<textarea value={draft.storageInstructions} onChange={(e) => updateField("storageInstructions", e.target.value)} className="mt-1 min-h-24 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none" /></label>
      </div>
      <div className="mt-4 flex items-center justify-between"><h4 className="font-black">Ingredientes y cantidades</h4><Button onClick={addIngredient} className="rounded-xl bg-white/10 text-white hover:bg-white/15"><Plus size={16} className="mr-2" />Ingrediente</Button></div>
      <div className="mt-3 grid gap-2">
        {draft.ingredients.map((item, index) => {
          const product = products.find((p) => p.id === Number(item.productId));
          return (
            <div key={index} className="grid gap-2 rounded-xl bg-white/5 p-3 md:grid-cols-[1fr_120px_120px_60px] md:items-center">
              <select value={item.productId} onChange={(e) => updateIngredient(index, "productId", e.target.value)} className="h-11 rounded-xl border border-white/10 bg-[#080b0c] px-3 text-white">{products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
              <Input type="number" step="0.001" value={item.qty} onChange={(e) => updateIngredient(index, "qty", e.target.value)} className="h-11 border-white/10 bg-white/5 text-white" />
              <Input value={item.unit || product?.unit || ""} onChange={(e) => updateIngredient(index, "unit", e.target.value)} className="h-11 border-white/10 bg-white/5 text-white" />
              <Button onClick={() => removeIngredient(index)} className="h-11 rounded-xl bg-white/10 text-white hover:bg-white/15"><Trash2 size={16} /></Button>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex justify-end gap-2"><Button onClick={onCancel} className="rounded-xl bg-white/10 text-white hover:bg-white/15"><X size={16} className="mr-2" />Cancelar</Button><Button onClick={onSave} className="rounded-xl bg-[#ead5b3] text-[#120e08] hover:bg-[#dfc59b]"><Save size={16} className="mr-2" />Guardar</Button></div>
    </div>
  );
}

function RecipesScreen({ products, recipes, setRecipes }) {
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(null);
  const filtered = recipes.filter((item) => `${item.name} ${item.section}`.toLowerCase().includes(query.toLowerCase()));
  const startEdit = (item) => { setEditingId(item.id); setDraft(JSON.parse(JSON.stringify(item))); };
  const saveEdit = () => { if (!draft) return; setRecipes((items) => items.map((item) => item.id === draft.id ? draft : item)); setEditingId(null); setDraft(null); };
  return (
    <>
      <Header title="Recetas conectadas" subtitle="Cada receta permite editar ingredientes, cantidades, preparación y almacenamiento." />
      <div className="mb-4 relative"><Search className="absolute left-4 top-3.5 text-white/45" size={18} /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar receta" className="h-12 rounded-xl border-white/10 bg-white/5 pl-11 text-white" /></div>
      <div className="grid gap-3">
        {filtered.map((item) => {
          const isEditing = editingId === item.id;
          return (
            <Card key={item.id} className="rounded-2xl border border-white/10 bg-[#15191a] text-white">
              <CardContent className="p-4">
                <div className="grid gap-3 lg:grid-cols-[1.2fr_0.6fr_0.6fr_1.6fr_auto] lg:items-center">
                  <div><h3 className="font-black">{item.name}</h3><p className="text-sm text-white/50">{item.section}</p></div>
                  <div>Venta: <b>{item.salePrice ? money(item.salePrice) : "Prep"}</b></div>
                  <div>Costo: <b>{money(getRecipeCost(item, products))}</b></div>
                  <div className="text-sm text-white/60">{item.ingredients.map((ingredientItem) => { const product = products.find((p) => p.id === ingredientItem.productId); return `${product?.name || "Producto"}: ${ingredientItem.qty} ${ingredientItem.unit || product?.unit || ""}`; }).join(" · ")}</div>
                  <Button onClick={() => isEditing ? (setEditingId(null), setDraft(null)) : startEdit(item)} className="rounded-xl bg-[#ead5b3] text-[#120e08] hover:bg-[#dfc59b]"><Pencil size={16} className="mr-2" />{isEditing ? "Cerrar" : "Editar"}</Button>
                </div>
                <div className="mt-3 grid gap-2 rounded-xl bg-white/5 p-3 text-sm text-white/60"><div><b className="text-white">Preparación:</b> {item.prepInstructions}</div><div><b className="text-white">Almacenamiento:</b> {item.storageInstructions}</div></div>
                {isEditing && draft && <RecipeEditor draft={draft} setDraft={setDraft} products={products} onSave={saveEdit} onCancel={() => { setEditingId(null); setDraft(null); }} />}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}

function SimpleCounterScreen({ title, subtitle, recipes, products, onApply, type }) {
  const [rows, setRows] = useState([]);
  const [fileName, setFileName] = useState("");
  const addRow = () => setRows((items) => [...items, { recipeId: recipes[0]?.id || 1, qty: 1 }]);
  const updateRow = (index, field, value) => setRows((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: Number(value) } : item));
  const removeRow = (index) => setRows((items) => items.filter((_, itemIndex) => itemIndex !== index));
  const impact = buildImpact(rows, recipes);
  const loadSample = () => setRows(sampleSalesRows);
  const handleFile = (event) => { const file = event.target.files?.[0]; if (file) setFileName(file.name); };
  return (
    <>
      <Header title={title} subtitle={subtitle} />
      <div className="mb-4 grid gap-3 rounded-2xl border border-white/10 bg-[#15191a] p-4 md:grid-cols-[auto_auto_auto_1fr]">
        <Button onClick={addRow} className="rounded-xl bg-[#ead5b3] text-[#120e08] hover:bg-[#dfc59b]"><Plus className="mr-2" size={18} /> Agregar</Button>
        <Button onClick={loadSample} className="rounded-xl bg-white/10 text-white hover:bg-white/15"><Sparkles className="mr-2" size={18} /> Ejemplo</Button>
        <label className="flex h-10 cursor-pointer items-center justify-center rounded-xl bg-white/10 px-4 text-sm font-bold text-white hover:bg-white/15"><Upload className="mr-2" size={16} /> Subir archivo<input type="file" accept=".pdf,.xlsx,.xls,.csv,.ods,image/*" onChange={handleFile} className="hidden" /></label>
        <div className="text-sm text-white/50">{fileName ? `Archivo cargado: ${fileName}` : "Carga manual o por archivo"}</div>
      </div>
      <div className="grid gap-3">
        {rows.map((row, index) => {
          const selectedRecipe = recipes.find((item) => item.id === Number(row.recipeId)) || recipes[0];
          return (
            <Card key={index} className="rounded-2xl border border-white/10 bg-[#15191a] text-white">
              <CardContent className="grid gap-3 p-4 md:grid-cols-[1fr_120px_80px] md:items-center">
                <select value={row.recipeId} onChange={(e) => updateRow(index, "recipeId", e.target.value)} className="h-11 rounded-xl border border-white/10 bg-[#080b0c] px-3 text-white">{recipes.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
                <Input type="number" step="1" value={row.qty} onChange={(e) => updateRow(index, "qty", e.target.value)} className="h-11 rounded-xl border-white/10 bg-white/5 text-white" />
                <Button onClick={() => removeRow(index)} className="h-11 rounded-xl bg-white/10 text-white hover:bg-white/15"><Trash2 size={16} /></Button>
                <div className="md:col-span-3 text-sm text-white/50">{type === "sales" ? "Venta" : "Producción"}: {selectedRecipe?.name} x {row.qty} · costo estimado {money(getRecipeCost(selectedRecipe, products) * Number(row.qty || 0))}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Card className="mt-4 rounded-2xl border border-white/10 bg-[#15191a] text-white">
        <CardContent className="p-4">
          <h3 className="mb-3 font-black">Preview de descuento del stock teórico</h3>
          <div className="grid gap-2 text-sm">{impact.length === 0 ? <div className="rounded-xl bg-white/5 p-3 text-white/55">Sin movimientos cargados.</div> : impact.map((item) => { const product = products.find((p) => p.id === item.productId); return <div key={item.productId} className="rounded-xl bg-white/5 p-3">{product?.name}: -{item.qty.toFixed(3)} {product?.unit}</div>; })}</div>
          <Button onClick={() => onApply(rows)} className="mt-4 rounded-xl bg-[#ead5b3] text-[#120e08] hover:bg-[#dfc59b]">Aplicar descuento al stock teórico</Button>
        </CardContent>
      </Card>
    </>
  );
}

function ProductionScreen({ recipes, products, onApply }) {
  const [query, setQuery] = useState("");
  const [counts, setCounts] = useState({});
  const productionRecipes = recipes.filter((item) => `${item.name} ${item.section}`.toLowerCase().includes(query.toLowerCase()));
  const rows = Object.entries(counts).filter(([, qty]) => Number(qty) > 0).map(([recipeIdValue, qty]) => ({ recipeId: Number(recipeIdValue), qty: Number(qty) }));
  const impact = buildImpact(rows, recipes);
  const totalUnits = rows.reduce((sum, row) => sum + Number(row.qty || 0), 0);
  const totalCost = rows.reduce((sum, row) => {
    const selectedRecipe = recipes.find((item) => item.id === Number(row.recipeId));
    return sum + getRecipeCost(selectedRecipe, products) * Number(row.qty || 0);
  }, 0);
  const quickUpdateRecipe = (recipeIdValue, delta) => setCounts((current) => ({ ...current, [recipeIdValue]: Math.max(0, Number(current[recipeIdValue] || 0) + delta) }));
  const applyProduction = () => {
    onApply(rows);
    setCounts({});
  };
  return (
    <>
      <Header title="Producción" subtitle="Todas las recetas están disponibles aquí. Usá - / cantidad / + como en Stock para cargar producción diaria." />
      <div className="mb-4 grid gap-3 rounded-2xl border border-white/10 bg-[#15191a] p-4 md:grid-cols-[1fr_auto] md:items-center">
        <div className="relative"><Search className="absolute left-4 top-3.5 text-white/45" size={18} /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar receta de producción" className="h-12 rounded-xl border-white/10 bg-white/5 pl-11 text-white" /></div>
        <div className="rounded-xl bg-[#ead5b3] px-5 py-3 text-sm font-black text-[#120e08]">Total: {totalUnits} · {money(totalCost)}</div>
      </div>
      <div className="grid gap-3">
        {productionRecipes.map((item) => {
          const qty = Number(counts[item.id] || 0);
          return (
            <motion.div layout key={item.id} className="rounded-2xl border border-white/10 bg-[#15191a] p-4 text-white">
              <div className="grid gap-3 lg:grid-cols-[1.25fr_0.5fr_0.6fr_1.4fr_170px] lg:items-center">
                <div><h3 className="font-black">{item.name}</h3><p className="text-sm text-white/50">{item.section}</p></div>
                <div className="text-sm">Costo<br /><b>{money(getRecipeCost(item, products))}</b></div>
                <div className="text-sm">Venta<br /><b>{item.salePrice ? money(item.salePrice) : "Prep"}</b></div>
                <div className="text-sm text-white/55">{item.ingredients.map((ingredientItem) => { const product = products.find((p) => p.id === ingredientItem.productId); return `${product?.name || "Producto"}: ${ingredientItem.qty} ${ingredientItem.unit || product?.unit || ""}`; }).join(" · ")}</div>
                <div className="flex items-center justify-end gap-2"><Button onClick={() => quickUpdateRecipe(item.id, -1)} className="h-11 w-11 rounded-xl bg-white/10 text-white hover:bg-white/15">-</Button><div className="flex h-12 min-w-20 items-center justify-center rounded-xl bg-[#ead5b3] px-3 text-lg font-black text-[#120e08]">{qty}</div><Button onClick={() => quickUpdateRecipe(item.id, 1)} className="h-11 w-11 rounded-xl bg-[#ead5b3] text-[#120e08] hover:bg-[#dfc59b]">+</Button></div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <Card className="mt-4 rounded-2xl border border-white/10 bg-[#15191a] text-white">
        <CardContent className="p-4">
          <h3 className="mb-3 font-black">Preview de descuento del stock teórico</h3>
          <div className="grid gap-2 text-sm">{impact.length === 0 ? <div className="rounded-xl bg-white/5 p-3 text-white/55">Sin producción cargada.</div> : impact.map((item) => { const product = products.find((p) => p.id === item.productId); return <div key={item.productId} className="rounded-xl bg-white/5 p-3">{product?.name}: -{item.qty.toFixed(3)} {product?.unit}</div>; })}</div>
          <Button onClick={applyProduction} className="mt-4 rounded-xl bg-[#ead5b3] text-[#120e08] hover:bg-[#dfc59b]">Aplicar producción al stock teórico</Button>
        </CardContent>
      </Card>
    </>
  );
}

function WasteScreen({ products, recipes, setProducts, wasteRows, setWasteRows }) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("products");
  const [productCounts, setProductCounts] = useState({});
  const [recipeCounts, setRecipeCounts] = useState({});

  const filteredProducts = products.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  const filteredRecipes = recipes.filter((item) => `${item.name} ${item.section}`.toLowerCase().includes(query.toLowerCase()));

  const productRows = Object.entries(productCounts)
    .filter(([, qty]) => Number(qty) > 0)
    .map(([productIdValue, qty]) => ({ type: "product", productId: Number(productIdValue), qty: Number(qty) }));

  const recipeRows = Object.entries(recipeCounts)
    .filter(([, qty]) => Number(qty) > 0)
    .map(([recipeIdValue, qty]) => ({ type: "recipe", recipeId: Number(recipeIdValue), qty: Number(qty) }));

  const pendingRows = [...productRows, ...recipeRows];
  const impact = getWasteImpact(pendingRows, recipes);
  const pendingCost = pendingRows.reduce((sum, row) => sum + getWasteRowCost(row, products, recipes), 0);
  const pendingUnits = pendingRows.reduce((sum, row) => sum + Number(row.qty || 0), 0);

  const quickUpdateProduct = (productIdValue, delta) => {
    setProductCounts((current) => ({ ...current, [productIdValue]: Math.max(0, Number((Number(current[productIdValue] || 0) + delta).toFixed(3))) }));
  };

  const quickUpdateRecipe = (recipeIdValue, delta) => {
    setRecipeCounts((current) => ({ ...current, [recipeIdValue]: Math.max(0, Number(current[recipeIdValue] || 0) + delta) }));
  };

  const applyWaste = () => {
    if (pendingRows.length === 0) return;
    setWasteRows((items) => [...items, ...pendingRows]);
    setProducts((items) => applyImpact(applyImpact(items, impact, "realStock"), impact, "theoreticalStock"));
    setProductCounts({});
    setRecipeCounts({});
  };

  return (
    <>
      <Header title="Mermas" subtitle="Registrá pérdidas de productos o recetas completas. Todo descuenta stock real y teórico." />
      <div className="mb-4 grid gap-3 rounded-2xl border border-white/10 bg-[#15191a] p-4 md:grid-cols-[1fr_auto_auto] md:items-center">
        <div className="relative"><Search className="absolute left-4 top-3.5 text-white/45" size={18} /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar producto o receta" className="h-12 rounded-xl border-white/10 bg-white/5 pl-11 text-white" /></div>
        <div className="flex rounded-xl bg-white/5 p-1">
          <button onClick={() => setMode("products")} className={`rounded-lg px-4 py-2 text-sm font-black ${mode === "products" ? "bg-[#ead5b3] text-[#120e08]" : "text-white/70"}`}>Productos</button>
          <button onClick={() => setMode("recipes")} className={`rounded-lg px-4 py-2 text-sm font-black ${mode === "recipes" ? "bg-[#ead5b3] text-[#120e08]" : "text-white/70"}`}>Recetas</button>
        </div>
        <div className="rounded-xl bg-[#ead5b3] px-5 py-3 text-sm font-black text-[#120e08]">Mermas: {pendingUnits} · {money(pendingCost)}</div>
      </div>

      {mode === "products" && <div className="grid gap-3">
        {filteredProducts.map((item) => {
          const qty = Number(productCounts[item.id] || 0);
          return (
            <motion.div layout key={`waste-product-${item.id}`} className="rounded-2xl border border-white/10 bg-[#15191a] p-4 text-white">
              <div className="grid gap-3 lg:grid-cols-[1.4fr_0.65fr_0.65fr_1fr_170px] lg:items-center">
                <div><h3 className="font-black">{item.name}</h3><p className="text-sm text-white/50">Producto · {item.category}</p></div>
                <div className="text-sm">Stock real<br /><b>{item.realStock} {item.unit}</b></div>
                <div className="text-sm">Costo<br /><b>{money(item.price)}</b></div>
                <div className="text-sm text-white/55">Pérdida pendiente: <b className="text-white">{qty} {item.unit}</b> · {money(qty * item.price)}</div>
                <div className="flex items-center justify-end gap-2"><Button onClick={() => quickUpdateProduct(item.id, -1)} className="h-11 w-11 rounded-xl bg-white/10 text-white hover:bg-white/15">-</Button><div className="flex h-12 min-w-20 items-center justify-center rounded-xl bg-[#ead5b3] px-3 text-lg font-black text-[#120e08]">{qty}</div><Button onClick={() => quickUpdateProduct(item.id, 1)} className="h-11 w-11 rounded-xl bg-[#ead5b3] text-[#120e08] hover:bg-[#dfc59b]">+</Button></div>
              </div>
            </motion.div>
          );
        })}
      </div>}

      {mode === "recipes" && <div className="grid gap-3">
        {filteredRecipes.map((item) => {
          const qty = Number(recipeCounts[item.id] || 0);
          return (
            <motion.div layout key={`waste-recipe-${item.id}`} className="rounded-2xl border border-white/10 bg-[#15191a] p-4 text-white">
              <div className="grid gap-3 lg:grid-cols-[1.25fr_0.55fr_1.5fr_170px] lg:items-center">
                <div><h3 className="font-black">{item.name}</h3><p className="text-sm text-white/50">Receta · {item.section}</p></div>
                <div className="text-sm">Costo<br /><b>{money(getRecipeCost(item, products))}</b></div>
                <div className="text-sm text-white/55">{item.ingredients.map((ingredientItem) => { const product = products.find((p) => p.id === ingredientItem.productId); return `${product?.name || "Producto"}: ${ingredientItem.qty} ${ingredientItem.unit || product?.unit || ""}`; }).join(" · ")}</div>
                <div className="flex items-center justify-end gap-2"><Button onClick={() => quickUpdateRecipe(item.id, -1)} className="h-11 w-11 rounded-xl bg-white/10 text-white hover:bg-white/15">-</Button><div className="flex h-12 min-w-20 items-center justify-center rounded-xl bg-[#ead5b3] px-3 text-lg font-black text-[#120e08]">{qty}</div><Button onClick={() => quickUpdateRecipe(item.id, 1)} className="h-11 w-11 rounded-xl bg-[#ead5b3] text-[#120e08] hover:bg-[#dfc59b]">+</Button></div>
              </div>
            </motion.div>
          );
        })}
      </div>}

      <Card className="mt-4 rounded-2xl border border-white/10 bg-[#15191a] text-white">
        <CardContent className="p-4">
          <h3 className="mb-3 font-black">Preview de descuento por merma</h3>
          <div className="grid gap-2 text-sm">{impact.length === 0 ? <div className="rounded-xl bg-white/5 p-3 text-white/55">Sin mermas cargadas.</div> : impact.map((item) => { const product = products.find((p) => p.id === item.productId); return <div key={item.productId} className="rounded-xl bg-white/5 p-3">{product?.name}: -{item.qty.toFixed(3)} {product?.unit}</div>; })}</div>
          <Button onClick={applyWaste} className="mt-4 rounded-xl bg-[#ead5b3] text-[#120e08] hover:bg-[#dfc59b]">Aplicar mermas al stock real y teórico</Button>
        </CardContent>
      </Card>

      <div className="mt-4 grid gap-2">
        {wasteRows.map((row, index) => {
          const itemName = row.type === "recipe" ? recipes.find((item) => item.id === row.recipeId)?.name : products.find((item) => item.id === row.productId)?.name;
          return <div key={`${row.type}-${index}`} className="rounded-xl bg-[#15191a] p-3 text-sm text-white">{row.type === "recipe" ? "Receta" : "Producto"}: {itemName} x {row.qty} · pérdida {money(getWasteRowCost(row, products, recipes))}</div>;
        })}
      </div>
    </>
  );
}

function ReportScreen({ products, recipes, salesRows, wasteRows }) {
  const metrics = getWeeklyMetrics(products, recipes, salesRows, wasteRows);
  const downloadReport = () => {
    const rows = [
      ["ARKA Weekly Report", STOCKTAKE_DATE],
      ["Ventas", metrics.sales],
      ["Costo teorico", metrics.theoreticalCost],
      ["Food Cost %", metrics.foodCost.toFixed(2)],
      ["Mermas", metrics.wasteCost],
      ["Stock real", metrics.currentStockValue],
      ["Stock teorico", metrics.theoreticalStockValue],
      ["Necesario proxima semana", metrics.purchaseNeed],
      [],
      ["Producto", "Real", "Teorico", "PAR", "Comprar", "Valor compra"],
      ...products.map((item) => [item.name, item.realStock, item.theoreticalStock, item.parLevel, Math.max(0, item.parLevel - item.realStock).toFixed(3), (Math.max(0, item.parLevel - item.realStock) * item.price).toFixed(2)]),
    ];
    exportCsv("arka-weekly-report.csv", rows);
  };
  return (
    <>
      <Header title="Reporte semanal" subtitle="Descarga un archivo para Excel o Google Sheets con stock, ventas, mermas, ahorro/pérdida y compra sugerida." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><KpiCard icon={WalletCards} label="Vendí" value={money(metrics.sales)} helper="Ventas cargadas" /><KpiCard icon={Scale} label="Consumí" value={money(metrics.theoreticalCost)} helper="Costo teórico vendido" /><KpiCard icon={Trash2} label="Perdí" value={money(metrics.wasteCost)} helper="Mermas" /><KpiCard icon={Package} label="Necesito" value={money(metrics.purchaseNeed)} helper="Compra sugerida" /></div>
      <Card className="mt-5 rounded-2xl border border-white/10 bg-[#15191a] text-white"><CardContent className="p-5"><h3 className="mb-3 text-xl font-black">Preguntas que responde ARKA</h3><div className="grid gap-2 text-sm"><div>¿Qué tengo? Stock real: <b>{money(metrics.currentStockValue)}</b></div><div>¿Cuánto vendí? <b>{money(metrics.sales)}</b></div><div>¿Cuánto perdí? <b>{money(metrics.wasteCost)}</b></div><div>¿Qué necesito para la próxima semana? <b>{money(metrics.purchaseNeed)}</b></div></div><Button onClick={downloadReport} className="mt-5 rounded-xl bg-[#ead5b3] text-[#120e08] hover:bg-[#dfc59b]"><Download className="mr-2" size={18} /> Descargar CSV para Excel / Sheets</Button></CardContent></Card>
    </>
  );
}

function UsersScreen() {
  return <><Header title="Usuarios" subtitle="Roles simples para uso diario: Owner, Manager, Chef y Kitchen." /><div className="grid gap-3">{["Owner", "Manager", "Chef", "Kitchen"].map((roleName) => <Card key={roleName} className="rounded-2xl border border-white/10 bg-[#15191a] text-white"><CardContent className="p-4"><b>{roleName}</b><p className="text-sm text-white/55">Permisos configurables en la versión con base de datos.</p></CardContent></Card>)}</div></>;
}

export default function ArkaApp() {
  const [active, setActive] = useState("dashboard");
  const [products, setProducts] = useState(initialProducts);
  const [recipes, setRecipes] = useState(initialRecipes);
  const [salesRows, setSalesRows] = useState([]);
  const [productionRows, setProductionRows] = useState([]);
  const [wasteRows, setWasteRows] = useState([]);

  const applySales = (rows) => {
    const impact = buildImpact(rows, recipes);
    setSalesRows((items) => [...items, ...rows]);
    setProducts((items) => applyImpact(items, impact, "theoreticalStock"));
  };

  const applyProduction = (rows) => {
    const impact = buildImpact(rows, recipes);
    setProductionRows((items) => [...items, ...rows]);
    setProducts((items) => applyImpact(items, impact, "theoreticalStock"));
  };

  const screen = useMemo(() => {
    if (active === "stock") return <StockScreen products={products} setProducts={setProducts} />;
    if (active === "recipes") return <RecipesScreen products={products} recipes={recipes} setRecipes={setRecipes} />;
    if (active === "production") return <ProductionScreen recipes={recipes} products={products} onApply={applyProduction} />;
    if (active === "waste") return <WasteScreen products={products} recipes={recipes} setProducts={setProducts} wasteRows={wasteRows} setWasteRows={setWasteRows} />;
    if (active === "sales") return <SimpleCounterScreen title="Ventas" subtitle="Cargá ventas diarias, semanales, quincenales o mensuales. ARKA descuenta stock teórico." recipes={recipes} products={products} onApply={applySales} type="sales" />;
    if (active === "report") return <ReportScreen products={products} recipes={recipes} salesRows={salesRows} wasteRows={wasteRows} />;
    if (active === "users") return <UsersScreen />;
    return <Dashboard products={products} recipes={recipes} salesRows={salesRows} wasteRows={wasteRows} />;
  }, [active, products, recipes, salesRows, productionRows, wasteRows]);

  return <Shell active={active} setActive={setActive}>{screen}</Shell>;
}
