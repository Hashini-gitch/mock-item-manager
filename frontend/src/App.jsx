import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([]);
  const [brand, setBrand] = useState("");

  const API_URL = "https://mock-item-manager.onrender.com/api/items";

  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setItems(response.data);
    } catch (error) {
      console.error("Fetch items error:", error);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();

    if (!itemName.trim() || price === "") {
      alert("Please enter item name and price");
      return;
    }

    try {
      await axios.post(API_URL, {
        itemName: itemName.trim(),
        price: Number(price),
        brand: brand.trim(),
      });

      setItemName("");
      setPrice("");
      setBrand("");
      fetchItems();
    } catch (error) {
      console.error("Add item error:", error.response?.data || error.message);
      alert("Failed to add item");
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Delete item error:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="page">
      <h1>Mock Item Manager</h1>

      <form className="form" onSubmit={addItem}>
        <input
          type="text"
          placeholder="Item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <button type="submit">Add Item</button>
      </form>

      <h2>Home Page - Items</h2>
      {items.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <div className="items">
          {items.map((item) => (
            <div className="card" key={item._id}>
              <h3>{item.itemName}</h3>
              <p>Price: Rs. {item.price}</p>
              {item.brand}
              <button onClick={() => deleteItem(item._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
