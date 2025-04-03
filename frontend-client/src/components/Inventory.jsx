
import React, { useState, useEffect } from 'react';
import { getItems, deleteItem } from '../services/api';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Inventory() {
  const [items, setItems] = useState([]);
  const { user, token, logout } = useAuth();

  useEffect(() => {
    getItems()
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(id, token)
        .then(() => {
          setItems(items.filter(item => item.id !== id));
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <h2>Inventory</h2>
      {user ? (
        <div>
          <Link to="/item-form">Add New Item</Link>
          <button onClick={logout} style={{ marginLeft: '10px' }}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register" style={{ marginLeft: '10px' }}>Register</Link>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description Preview</th>
            <th>Quantity</th>
            {user && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              {user && (
                <td>
                  <Link to={`/item-form/${item.id}`} style={{ marginRight: '5px' }}>Edit</Link>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
