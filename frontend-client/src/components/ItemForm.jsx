
import React, { useState, useEffect } from 'react';
import { createItem, getItem, updateItem } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ItemForm({ editMode = false }) {
  const { id } = useParams();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', description: '', quantity: 0, userId: user ? user.id : null });
  const [error, setError] = useState('');

  useEffect(() => {
    if (editMode && id) {
      getItem(id)
        .then((response) => {
          setForm(response.data);
        })
        .catch((err) => console.error(err));
    }
  }, [editMode, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      updateItem(id, form, token)
        .then(() => navigate('/'))
        .catch((err) => setError(err.response?.data?.error || 'Update failed.'));
    } else {
      createItem(form, token)
        .then(() => navigate('/'))
        .catch((err) => setError(err.response?.data?.error || 'Creation failed.'));
    }
  };

  return (
    <div>
      <h2>{editMode ? 'Edit Item' : 'Add New Item'}</h2>
      {error && <div className="alert">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <button type="submit">{editMode ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
}

export default ItemForm;
