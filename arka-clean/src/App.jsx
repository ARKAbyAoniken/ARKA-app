import React, { useMemo, useState } from "react";

const STOCKTAKE_DATE = "22.05.2026";

const INITIAL_PRODUCTS = [
  { id: 1, name: "Rioplatense Arg Ribeye", category: "Meat", unit: "kg", price: 32.5, realStock: 23.7, theoreticalStock: 23.7, parLevel: 9.5 },
  { id: 2, name: "Rioplatense Arg rump Hearts", category: "Meat", unit: "kg", price: 15.95, realStock: 31.7, theoreticalStock: 31.7, parLevel: 12.7 },
  { id: 3, name: "Rioplatense Arg Striploin", category: "Meat", unit: "kg", price: 17.5, realStock: 40.8, theoreticalStock: 40.8, parLevel: 16.3 },
  { id: 4, name: "Entraña NZ Ocean T Hixson", category: "Meat", unit: "kg", price: 14, realStock: 13.6, theoreticalStock: 13.6, parLevel: 5.4 },
  { id: 5, name: "Chorizo Criollo", category: "Meat", unit: "unit", price: 1.17, realStock: 69, theoreticalStock: 69, parLevel: 28 },
  { id: 6, name: "Morcilla", category: "Meat", unit: "unit", price: 1.17, realStock: 20, theoreticalStock: 20, parLevel: 10 },
  { id: 7, name: "Squid tubes", category: "Seafood", unit: "kg", price: 4.15, realStock: 2, theoreticalStock: 2, parLevel: 1 },
  { id: 8, name: "Frozen spinach", category: "Frozen", unit: "kg", price: 2.4, realStock: 20, theoreticalStock: 20, parLevel: 8 },
  { id: 9, name: "Thin Skin on Fries", category: "Frozen", unit: "kg", price: 19.92, realStock: 52.5, theoreticalStock: 52.5, parLevel: 21 },
  { id: 10, name: "Sweet Potato Fries", category: "Frozen", unit: "kg", price: 39.99, realStock: 47.5, theoreticalStock: 47.5, parLevel: 19 },
  { id: 11, name: "Double Cream", category: "Dairy", unit: "L", price: 8.09, realStock: 6.81, theoreticalStock: 6.81, parLevel: 2.7 },
  { id: 12, name: "Butter salted", category: "Dairy", unit: "kg", price: 59.99, realStock: 6.7, theoreticalStock: 6.7, parLevel: 2.7 },
  { id: 13, name: "Blue Stilton", category: "Dairy", unit: "kg", price: 24.99, realStock: 0.5, theoreticalStock: 0.5, parLevel: 1 },
  { id: 14, name: "Eggs", category: "Dairy", unit: "unit", price: 0.21, realStock: 134, theoreticalStock: 134, parLevel: 54 },
  { id: 15, name: "Milk whole", category: "Dairy", unit: "L", price: 11.88, realStock: 27.24, theoreticalStock: 27.24, parLevel: 10.9 },
  { id: 16, name: "Cream Cheese Philadelphia", category: "Dairy", unit: "kg", price: 18.76, realStock: 1.65, theoreticalStock: 1.65, parLevel: 1 },
  { id: 17, name: "Mozzarella", category: "Dairy", unit: "kg", price: 12.26, realStock: 8, theoreticalStock: 8, parLevel: 3.2 },
  { id: 18, name: "Ham", category: "Dairy", unit: "kg", price: 2.25, realStock: 0, theoreticalStock: 0, parLevel: 1 },
  { id: 19, name: "Bread flour strong", category: "Dry Goods", unit: "kg", price: 26.78, realStock: 8, theoreticalStock: 8, parLevel: 3.2 },
  { id: 20, name: "Yeast", category: "Dry Goods", unit: "kg", price: 6.69, realStock: 0.25, theoreticalStock: 0.25, parLevel: 0.2 },
  { id: 21, name: "Dulce de leche", category: "Dry Goods", unit: "kg", price: 46.9, realStock: 7, theoreticalStock: 7, parLevel: 2.8 },
  { id: 22, name: "Nutella", category: "Dry Goods", unit: "kg", price: 8.1, realStock: 1, theoreticalStock: 1, parLevel: 1 },
  { id: 23, name: "Sugar", category: "Dry Goods", unit: "kg", price: 6.69, realStock: 3.3, theoreticalStock: 3.3, parLevel: 1.3 },
  { id: 24, name: "Vanilla Essence", category: "Dry Goods", unit: "L", price: 5.61, realStock: 0.5, theoreticalStock: 0.5, parLevel: 0.2 },
  { id: 25, name: "Olives Pitted", category: "Dry Goods", unit: "kg", price: 17.99, realStock: 8.4, theoreticalStock: 8.4, parLevel: 3.4 },
  { id: 26, name: "Black pepper cracked", category: "Dry Goods", unit: "kg", price: 24.59, realStock: 1, theoreticalStock: 1, parLevel: 0.4 },
  { id: 27, name: "Paprika", category: "Dry Goods", unit: "kg", price: 9.49, realStock: 1.3, theoreticalStock: 1.3, parLevel: 0.5 },
  { id: 28, name: "Salt", category: "Dry Goods", unit: "kg", price: 4.96, realStock: 1, theoreticalStock: 1, parLevel: 0.4 },
  { id: 29, name: "Potatoes red", category: "Vegetables", unit: "kg", price: 18.19, realStock: 10.8, theoreticalStock: 10.8, parLevel: 4.3 },
  { id: 30, name: "Courgettes", category: "Vegetables", unit: "kg", price: 2.73, realStock: 1.5, theoreticalStock: 1.5, parLevel: 1 },
  { id: 31, name: "Peppers Red", category: "Vegetables", unit: "kg", price: 16.24, realStock: 4.5, theoreticalStock: 4.5, parLevel: 1.8 },
  { id: 32, name: "Peppers Yellow", category: "Vegetables", unit: "kg", price: 3.74, realStock: 1, theoreticalStock: 1, parLevel: 1 },
  { id: 33, name: "Onions white", category: "Vegetables", unit: "kg", price: 2.15, realStock: 11.2, theoreticalStock: 11.2, parLevel: 4.5 },
  { id: 34, name: "Red Onions", category: "Vegetables", unit: "kg", price: 0.99, realStock: 3.8, theoreticalStock: 3.8, parLevel: 1.5 },
  { id: 35, name: "Tomato Salad Beef", category: "Vegetables", unit: "kg", price: 19.02, realStock: 3, theoreticalStock: 3, parLevel: 1.2 },
  { id: 36, name: "Mushrooms", category: "Vegetables", unit: "kg", price: 11.05, realStock: 5, theoreticalStock: 5, parLevel: 2 },
  { id: 37, name: "Garlic", category: "Vegetables", unit: "kg", price: 5.1, realStock: 0.5, theoreticalStock: 0.5, parLevel: 0.5 },
  { id: 38, name: "Lemons", category: "Vegetables", unit: "unit", price: 0.35, realStock: 12, theoreticalStock: 12, parLevel: 5 },
  { id: 39, name: "Extra Virgin Olive Oil", category: "Dry Goods", unit: "L", price: 51.25, realStock: 2, theoreticalStock: 2, parLevel: 1 },
  { id: 40, name: "Burger brioche buns", category: "Dry Goods", unit: "unit", price: 0.7, realStock: 10, theoreticalStock: 10, parLevel: 40 },
  { id: 41, name: "Angus Beefburger", category: "Meat", unit: "unit", price: 11.99, realStock: 25, theoreticalStock: 25, parLevel: 10 }
];

const p = (name) => INITIAL_PRODUCTS.find((item) => item.name.toLowerCase().includes(name.toLowerCase()))?.id || 1;
const i = (name, qty) => ({ productId: p(name), qty });

const INITIAL_RECIPES = [
  { id: 1, name: "Ribeye 250g", section: "Main", salePrice: 35, ingredients: [i("Ribeye", 0.25)] },
  { id: 2, name: "Churrasco 220g", section: "Main", salePrice: 22.5, ingredients: [i("rump", 0.22)] },
  { id: 3, name: "Sirloin 400g", section: "Main", salePrice: 35, ingredients: [i("Striploin", 0.4)] },
  { id: 4, name: "Thin Skirt 220g", section: "Main", salePrice: 22.5, ingredients: [i("Entraña", 0.22)] },
  { id: 5, name: "Bife Burger", section: "Burger", salePrice: 19.95, ingredients: [i("Angus", 1), i("brioche", 1), i("Eggs", 1)] },
  { id: 6, name: "Breadbasket", section: "Starter", salePrice: 5.5, ingredients: [i("Bread flour", 0.12), i("Blue Stilton", 0.025), i("Olives", 0.04), i("Butter", 0.03)] },
  { id: 7, name: "Papas fritas", section: "Side", salePrice: 5, ingredients: [i("Fries", 0.2)] },
  { id: 8, name: "Sweet Potato Fries", section: "Side", salePrice: 7, ingredients: [i("Sweet Potato", 0.2)] },
  { id: 9, name: "Mash potatoes", section: "Production", salePrice: 0, ingredients: [i("Potatoes", 1), i("Butter", 0.12), i("Milk", 0.1), i("Salt", 0.01)] },
  { id: 10, name: "Cream spinach", section: "Production", salePrice: 0, ingredients: [i("Frozen spinach", 1), i("Double Cream", 0.35), i("Butter", 0.08)] },
  { id: 11, name: "Vegetales grillados", section: "Production", salePrice: 0, ingredients: [i("Courgettes", 0.5), i("Peppers Red", 0.4), i("Peppers Yellow", 0.25), i("Olive Oil", 0.05)] },
  { id: 12, name: "Salsa Blue Stilton", section: "Sauce", salePrice: 4, ingredients: [i("Blue Stilton", 0.12), i("Double Cream", 0.3)] },
  { id: 13, name: "Salsa Peppercorn", section: "Sauce", salePrice: 4, ingredients: [i("Black pepper", 0.02), i("Double Cream", 0.35)] },
  { id: 14, name: "Empanada de beef", section: "Empanadas", salePrice: 3.5, ingredients: [i("rump", 0.08), i("Onions", 0.04), i("Bread flour", 0.05)] },
  { id: 15, name: "Empanada de spicy beef", section: "Empanadas", salePrice: 3.5, ingredients: [i("rump", 0.08), i("Paprika", 0.003), i("Bread flour", 0.05)] },
  { id: 16, name: "Empanada de jamon y queso", section: "Empanadas", salePrice: 3.5, ingredients: [i("Ham", 0.05), i("Mozzarella", 0.05), i("Bread flour", 0.05)] },
  { id: 17, name: "Empanada de pollo", section: "Empanadas", salePrice: 3.5, ingredients: [i("Chicken", 0.08), i("Onions", 0.04), i("Bread flour", 0.05)] },
  { id: 18, name: "Empanada de spinach", section: "Empanadas", salePrice: 3.5, ingredients: [i("Frozen spinach", 0.08), i("Mozzarella", 0.04), i("Bread flour", 0.05)] },
  { id: 19, name: "Cheesecake de dulce de leche", section: "Dessert", salePrice: 7, ingredients: [i("Cream Cheese", 0.12), i("Dulce", 0.06), i("Sugar", 0.03)] },
  { id: 20, name: "Panqueques", section: "Dessert", salePrice: 7, ingredients: [i("Eggs", 1), i("Milk", 0.12), i("Bread flour", 0.06), i("Nutella", 0.05)] },
  { id: 21, name: "Flan", section: "Dessert", salePrice: 7, ingredients: [i("Eggs", 1), i("Milk", 0.18), i("Sugar", 0.05), i("Vanilla", 0.003)] },
  { id: 22, name: "Mise en place de calamaris", section: "Mise en place", salePrice: 0, ingredients: [i("Squid", 1), i("Bread flour", 0.15), i("Lemons", 2)] },
  { id: 23, name: "Mise en place de ensalada de tomates", section: "Mise en place", salePrice: 0, ingredients: [i("Tomato", 1), i("Red Onions", 0.25), i("Olive Oil", 0.05)] },
  { id: 24, name: "Mise en place de champiniones", section: "Mise en place", salePrice: 0, ingredients: [i("Mushrooms", 1), i("Butter", 0.05), i("Garlic", 0.02)] }
];

function money(value) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(Number(value || 0));
}

function recipeCost(recipe, products) {
  return recipe.ingredients.reduce((sum, ingredient) => {
    const product = products.find((item) => item.id === ingredient.productId);
    return sum + Number(ingredient.qty || 0) * Number(product?.price || 0);
  }, 0);
}

function buildImpact(rows, recipes) {
  const map = new Map();
  rows.forEach((row) => {
    const recipe = recipes.find((item) => item.id === Number(row.recipeId));
    if (!recipe) return;
    recipe.ingredients.forEach((ingredient) => {
      map.set(ingredient.productId, (map.get(ingredient.productId) || 0) + ingredient.qty * Number(row.qty || 0));
    });
  });
  return Array.from(map.entries()).map(([productId, qty]) => ({ productId, qty }));
}

function applyImpact(products, impact, field) {
  return products.map((product) => {
    const row = impact.find((item) => item.productId === product.id);
    if (!row) return product;
    return { ...product, [field]: Math.max(0, Number((product[field] - row.qty).toFixed(3))) };
  });
}

function exportCsv(filename, rows) {
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function Counter({ value, onMinus, onPlus }) {
  return (
    <div className="counter">
      <button onClick={onMinus}>−</button>
      <strong>{value}</strong>
      <button onClick={onPlus}>+</button>
    </div>
  );
}

function Header({ active, setActive }) {
  const tabs = ["Inicio", "Stock", "Recetas", "Producción", "Mermas", "Ventas", "Reporte"];
  return (
    <header className="topbar">
      <div className="brand"><div className="logo">△</div><div><h1>ARKA</h1><small>Restaurant Operating System</small></div></div>
      <nav>{tabs.map((tab) => <button key={tab} onClick={() => setActive(tab)} className={active === tab ? "active" : ""}>{tab}</button>)}</nav>
    </header>
  );
}

function Dashboard({ products, recipes, salesRows, wasteRows }) {
  const stockValue = products.reduce((s, p) => s + p.realStock * p.price, 0);
  const sales = salesRows.reduce((s, row) => s + (recipes.find((r) => r.id === row.recipeId)?.salePrice || 0) * row.qty, 0);
  const cost = salesRows.reduce((s, row) => s + recipeCost(recipes.find((r) => r.id === row.recipeId), products) * row.qty, 0);
  const waste = wasteRows.reduce((s, row) => s + row.cost, 0);
  const buy = products.reduce((s, p) => s + Math.max(0, p.parLevel - p.realStock) * p.price, 0);
  return <main><h2>Inicio · {STOCKTAKE_DATE}</h2><div className="cards"><Card title="Stock real" value={money(stockValue)} /><Card title="Ventas" value={money(sales)} /><Card title="Food Cost" value={`${sales ? ((cost / sales) * 100).toFixed(1) : 0}%`} /><Card title="Mermas" value={money(waste)} /><Card title="Comprar" value={money(buy)} /></div></main>;
}

function Card({ title, value }) { return <section className="card"><span>{title}</span><strong>{value}</strong></section>; }

function Stock({ products, setProducts }) {
  const [query, setQuery] = useState("");
  const filtered = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
  const update = (id, field, delta) => setProducts((list) => list.map((p) => p.id === id ? { ...p, [field]: Math.max(0, Number((p[field] + delta).toFixed(3))) } : p));
  return <main><h2>Stock</h2><input placeholder="Buscar producto..." value={query} onChange={(e) => setQuery(e.target.value)} /><div className="list">{filtered.map((p) => <div className="row" key={p.id}><div><b>{p.name}</b><small>{p.category} · {money(p.price)} / {p.unit}</small></div><span>Real: {p.realStock} {p.unit}</span><span>PAR: {p.parLevel}</span><Counter value={p.realStock} onMinus={() => update(p.id, "realStock", -1)} onPlus={() => update(p.id, "realStock", 1)} /></div>)}</div></main>;
}

function Recipes({ recipes, products }) {
  const [query, setQuery] = useState("");
  const filtered = recipes.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()));
  return <main><h2>Recetas</h2><input placeholder="Buscar receta..." value={query} onChange={(e) => setQuery(e.target.value)} /><div className="list">{filtered.map((r) => <div className="recipe" key={r.id}><h3>{r.name}</h3><p>{r.section} · Venta: {r.salePrice ? money(r.salePrice) : "Prep"} · Costo: {money(recipeCost(r, products))}</p><small>{r.ingredients.map((ing) => { const p = products.find((x) => x.id === ing.productId); return `${p?.name}: ${ing.qty} ${p?.unit}`; }).join(" · ")}</small></div>)}</div></main>;
}

function MovementScreen({ title, recipes, products, onApply }) {
  const [counts, setCounts] = useState({});
  const [query, setQuery] = useState("");
  const rows = Object.entries(counts).filter(([, qty]) => qty > 0).map(([recipeId, qty]) => ({ recipeId: Number(recipeId), qty }));
  const impact = buildImpact(rows, recipes);
  const filtered = recipes.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()));
  const update = (id, delta) => setCounts((c) => ({ ...c, [id]: Math.max(0, Number(c[id] || 0) + delta) }));
  return <main><h2>{title}</h2><input placeholder="Buscar receta..." value={query} onChange={(e) => setQuery(e.target.value)} /><div className="list">{filtered.map((r) => <div className="row" key={r.id}><div><b>{r.name}</b><small>{r.section} · Costo {money(recipeCost(r, products))}</small></div><Counter value={counts[r.id] || 0} onMinus={() => update(r.id, -1)} onPlus={() => update(r.id, 1)} /></div>)}</div><section className="panel"><h3>Preview descuento</h3>{impact.length === 0 ? <p>Sin movimientos.</p> : impact.map((x) => { const p = products.find((item) => item.id === x.productId); return <p key={x.productId}>{p?.name}: -{x.qty.toFixed(3)} {p?.unit}</p>; })}<button className="primary" onClick={() => { onApply(rows); setCounts({}); }}>Aplicar</button></section></main>;
}

function Waste({ products, recipes, setProducts, wasteRows, setWasteRows }) {
  const [mode, setMode] = useState("products");
  const [counts, setCounts] = useState({});
  const items = mode === "products" ? products : recipes;
  const update = (id, delta) => setCounts((c) => ({ ...c, [id]: Math.max(0, Number(c[id] || 0) + delta) }));
  const apply = () => {
    const rows = Object.entries(counts).filter(([, qty]) => qty > 0);
    let impact = [];
    let log = [];
    if (mode === "products") {
      impact = rows.map(([id, qty]) => ({ productId: Number(id), qty: Number(qty) }));
      log = rows.map(([id, qty]) => { const p = products.find((x) => x.id === Number(id)); return { name: p.name, qty: Number(qty), cost: p.price * Number(qty) }; });
    } else {
      const recipeRows = rows.map(([id, qty]) => ({ recipeId: Number(id), qty: Number(qty) }));
      impact = buildImpact(recipeRows, recipes);
      log = recipeRows.map((row) => { const r = recipes.find((x) => x.id === row.recipeId); return { name: r.name, qty: row.qty, cost: recipeCost(r, products) * row.qty }; });
    }
    setProducts((p) => applyImpact(applyImpact(p, impact, "realStock"), impact, "theoreticalStock"));
    setWasteRows((w) => [...w, ...log]);
    setCounts({});
  };
  return <main><h2>Mermas</h2><div className="switch"><button className={mode === "products" ? "active" : ""} onClick={() => setMode("products")}>Productos</button><button className={mode === "recipes" ? "active" : ""} onClick={() => setMode("recipes")}>Recetas</button></div><div className="list">{items.map((item) => <div className="row" key={item.id}><div><b>{item.name}</b><small>{mode === "products" ? item.category : item.section}</small></div><Counter value={counts[item.id] || 0} onMinus={() => update(item.id, -1)} onPlus={() => update(item.id, 1)} /></div>)}</div><button className="primary" onClick={apply}>Aplicar mermas</button><h3>Historial</h3>{wasteRows.map((w, idx) => <p key={idx}>{w.name} x {w.qty} · {money(w.cost)}</p>)}</main>;
}

function Report({ products, recipes, salesRows, wasteRows }) {
  const download = () => exportCsv("arka-report.csv", [["Product", "Real", "Theoretical", "PAR", "Buy"], ...products.map((p) => [p.name, p.realStock, p.theoreticalStock, p.parLevel, Math.max(0, p.parLevel - p.realStock)])]);
  return <main><h2>Reporte</h2><p>Exporta un CSV para Excel o Google Sheets.</p><button className="primary" onClick={download}>Descargar CSV</button></main>;
}

export default function App() {
  const [active, setActive] = useState("Inicio");
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [recipes] = useState(INITIAL_RECIPES);
  const [salesRows, setSalesRows] = useState([]);
  const [productionRows, setProductionRows] = useState([]);
  const [wasteRows, setWasteRows] = useState([]);

  const applyRows = (rows, kind) => {
    const impact = buildImpact(rows, recipes);
    setProducts((p) => applyImpact(p, impact, "theoreticalStock"));
    if (kind === "sales") setSalesRows((s) => [...s, ...rows]);
    if (kind === "production") setProductionRows((s) => [...s, ...rows]);
  };

  const content = useMemo(() => {
    if (active === "Stock") return <Stock products={products} setProducts={setProducts} />;
    if (active === "Recetas") return <Recipes recipes={recipes} products={products} />;
    if (active === "Producción") return <MovementScreen title="Producción" recipes={recipes} products={products} onApply={(rows) => applyRows(rows, "production")} />;
    if (active === "Ventas") return <MovementScreen title="Ventas" recipes={recipes} products={products} onApply={(rows) => applyRows(rows, "sales")} />;
    if (active === "Mermas") return <Waste products={products} recipes={recipes} setProducts={setProducts} wasteRows={wasteRows} setWasteRows={setWasteRows} />;
    if (active === "Reporte") return <Report products={products} recipes={recipes} salesRows={salesRows} wasteRows={wasteRows} />;
    return <Dashboard products={products} recipes={recipes} salesRows={salesRows} wasteRows={wasteRows} />;
  }, [active, products, recipes, salesRows, productionRows, wasteRows]);

  return <><Header active={active} setActive={setActive} />{content}</>;
}
