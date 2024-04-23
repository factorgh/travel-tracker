/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);

  const clearList = () => {
    const confiremd = window.confirm("Do you want to clear list");
    if (confiremd) setItems([]);
  };

  const handleDelItem = (id) => {
    setItems((items) =>
      items ? items.filter((filterItem) => filterItem.id !== id) : []
    );
  };
  const handleToggleItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleAddItem = (item) => {
    setItems((items) => [...items, item]);
  };

  return (
    <div className="main-page">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDelItem={handleDelItem}
        onToggle={handleToggleItem}
        clearList={clearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <div className="logo">😎 Far Away from Home 🚀</div>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItem(newItem);

    setDescription("");
    setQuantity(1);
  };
  return (
    <form className="form-area" onSubmit={handleSubmit}>
      <h1>What do you need for your trip 😅</h1>
      <select
        value={quantity}
        className="seltaken"
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option style={{ color: "black" }} value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onDelItem, onToggle, clearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="packing">
      <ul className="packing-list">
        {sortedItems &&
          sortedItems.map((item) => (
            <Item
              key={item.id}
              item={item}
              onToggle={onToggle}
              onDelItem={onDelItem}
            />
          ))}
      </ul>
      <div>
        <select
          value={sortBy}
          className="sorting"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="input">SortByInput</option>
          <option value="description">SortByDescription</option>
          <option value="packed">SortByPacked</option>
        </select>
        <button onClick={clearList}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onDelItem, onToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggle(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {" "}
        <span></span> {item.quantity} {item.description}{" "}
      </span>
      <button
        onClick={() => onDelItem(item.id)}
        style={{ backgroundColor: "orange" }}
      >
        &times;
      </button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <footer>
        <em>😜Start adding some items to your packing list 👜</em>
      </footer>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer>
      <em>
        📒You have {numItems} items on your list ,you already packed {numPacked}
        ({percentage} %) 🧳
      </em>
    </footer>
  );
}

export default App;
