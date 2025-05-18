import React, { useState } from 'react';

const ItemInventory = ({ items, onAddItem }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    quantity: 1,
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem.name) {
      onAddItem({ ...newItem, id: Date.now() });
      setNewItem({ name: '', category: '', quantity: 1, location: '' });
    }
  };

  return (
    <div className="item-inventory">
      <h2>Item Inventory</h2>
      <form onSubmit={handleSubmit} className="add-item-form">
        <input
          type="text"
          placeholder="Item name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Location"
          value={newItem.location}
          onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
        />
        <button type="submit">Add Item</button>
      </form>

      <div className="inventory-list">
        {items.map((item) => (
          <div key={item.id} className="inventory-item">
            <h3>{item.name}</h3>
            <p>Category: {item.category}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Location: {item.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemInventory;
