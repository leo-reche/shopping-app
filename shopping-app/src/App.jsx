import { useState } from "react";

const initialItems = [
  { id: 1, name: "Bananas", category: "🍎 Produce", checked: false },
  { id: 2, name: "Tuna", category: "🥫 Pantry", checked: false },
  { id: 3, name: "Cream", category: "🥛 Dairy", checked: false },
  { id: 4, name: "Pasta", category: "🥫 Pantry", checked: false },
  { id: 5, name: "Salt", category: "🧂 Spices", checked: false },
  { id: 6, name: "Paper Towels", category: "🧻 Household", checked: false },
];

const categoryColors = {
  "🍎 Produce": "#d4f5c0",
  "🥫 Pantry": "#fde9c0",
  "🥛 Dairy": "#d8eeff",
  "🧂 Spices": "#fce4d6",
  "🧻 Household": "#e8e0f7",
};

export default function App() {
  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState("");
  const [newCategory, setNewCategory] = useState("🍎 Produce");

  const categories = Object.keys(categoryColors);

  const toggle = (id) =>
    setItems(items.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)));

  const removeItem = (id) => setItems(items.filter((i) => i.id !== id));

  const addItem = () => {
    if (!newItem.trim()) return;
    setItems([
      ...items,
      { id: Date.now(), name: newItem.trim(), category: newCategory, checked: false },
    ]);
    setNewItem("");
  };

  const clearChecked = () => setItems(items.filter((i) => !i.checked));

  const grouped = categories.reduce((acc, cat) => {
    const group = items.filter((i) => i.category === cat);
    if (group.length) acc[cat] = group;
    return acc;
  }, {});

  const checkedCount = items.filter((i) => i.checked).length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#faf8f5",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      padding: "32px 16px",
      display: "flex",
      justifyContent: "center",
    }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 40, marginBottom: 4 }}>🛒</div>
          <h1 style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#1a1a1a",
            margin: 0,
            letterSpacing: "-0.5px",
          }}>My Shopping List</h1>
          <p style={{ color: "#888", fontSize: 14, marginTop: 4 }}>
            {checkedCount} of {items.length} items checked
          </p>
        </div>

        <div style={{
          background: "#fff",
          borderRadius: 16,
          padding: 16,
          marginBottom: 20,
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
          border: "1px solid #eee",
        }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              placeholder="Add an item..."
              style={{
                flex: 1,
                border: "1.5px solid #e0dbd4",
                borderRadius: 10,
                padding: "9px 14px",
                fontSize: 15,
                fontFamily: "inherit",
                background: "#faf8f5",
                outline: "none",
                color: "#1a1a1a",
              }}
            />
            <button
              onClick={addItem}
              style={{
                background: "#1a1a1a",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "9px 18px",
                fontSize: 20,
                cursor: "pointer",
                fontWeight: "bold",
                lineHeight: 1,
              }}
            >+</button>
          </div>
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            style={{
              width: "100%",
              border: "1.5px solid #e0dbd4",
              borderRadius: 10,
              padding: "8px 12px",
              fontSize: 14,
              fontFamily: "inherit",
              background: "#faf8f5",
              color: "#555",
              outline: "none",
              cursor: "pointer",
            }}
          >
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        {Object.entries(grouped).map(([cat, catItems]) => (
          <div key={cat} style={{ marginBottom: 18 }}>
            <div style={{
              display: "inline-block",
              background: categoryColors[cat] || "#eee",
              borderRadius: 20,
              padding: "3px 14px",
              fontSize: 12,
              fontWeight: "bold",
              color: "#333",
              marginBottom: 8,
              letterSpacing: "0.3px",
            }}>{cat}</div>
            <div style={{
              background: "#fff",
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              border: "1px solid #eee",
            }}>
              {catItems.map((item, idx) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "13px 16px",
                    borderBottom: idx < catItems.length - 1 ? "1px solid #f0ece6" : "none",
                    background: item.checked ? "#f9f9f9" : "#fff",
                    transition: "background 0.15s",
                  }}
                >
                  <button
                    onClick={() => toggle(item.id)}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      border: item.checked ? "none" : "2px solid #ccc",
                      background: item.checked ? "#4caf50" : "transparent",
                      cursor: "pointer",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 14,
                      transition: "all 0.2s",
                      padding: 0,
                    }}
                  >{item.checked ? "✓" : ""}</button>
                  <span style={{
                    flex: 1,
                    marginLeft: 12,
                    fontSize: 16,
                    color: item.checked ? "#aaa" : "#1a1a1a",
                    textDecoration: item.checked ? "line-through" : "none",
                    transition: "all 0.2s",
                  }}>{item.name}</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#ccc",
                      fontSize: 18,
                      cursor: "pointer",
                      padding: "0 4px",
                      lineHeight: 1,
                    }}
                  >×</button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {checkedCount > 0 && (
          <button
            onClick={clearChecked}
            style={{
              width: "100%",
              marginTop: 8,
              padding: "12px",
              background: "transparent",
              border: "1.5px dashed #ccc",
              borderRadius: 12,
              color: "#999",
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Remove {checkedCount} checked item{checkedCount > 1 ? "s" : ""}
          </button>
        )}

        {items.length === 0 && (
          <div style={{ textAlign: "center", color: "#bbb", padding: 40, fontSize: 15 }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🎉</div>
            All done! Add more items above.
          </div>
        )}
      </div>
    </div>
  );
}
