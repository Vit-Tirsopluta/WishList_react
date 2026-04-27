import { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  const [wish, setWish] = useState("");

  const [items, setItem] = useState(() => {
    const saved = localStorage.getItem("myWishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("myWishlist", JSON.stringify(items));
  }, [items]);

  function handleAdd(e) {
    e.preventDefault();
    if (!wish.trim()) return;

    const newItem = {
      name: wish,
      id: Date.now(),
    };

    setItem([...items, newItem]);
    setWish("");
  }

  function handleDelete(idToRemove) {
    setItem(items.filter((item) => item.id !== idToRemove));
  }

  return (
    <div className="app-container">
      <h2>WishList✨🎁</h2>

      <form className="wish-form" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="What would you like to buy?"
          value={wish}
          onChange={(e) => setWish(e.target.value)}
          className="wish-input"
        />

        <button className="add-btn" type="submit">
          Add
        </button>
      </form>

      <ul className="wish-list">
        {items.map((item) => (
          <li key={item.id} className="wish-item">
            <span className="item-name">{item.name}</span>
            <button
              className="delete-btn"
              onClick={() => handleDelete(item.id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
