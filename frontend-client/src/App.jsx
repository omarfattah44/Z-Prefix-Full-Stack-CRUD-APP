import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Inventory from './components/Inventory';
import ItemForm from './components/ItemForm';

function App() {
  return (
    <div className="container">
      <nav>
        <Link to="/" style={{ marginRight: '15px' }}>Inventory</Link>
        <Link to="/login" style={{ marginRight: '15px' }}>Login</Link>
        <Link to="/register" style={{ marginRight: '15px' }}>Register</Link>
        <Link to="/item-form">Add Item</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Inventory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/item-form" element={<ItemForm />} />
        <Route path="/item-form/:id" element={<ItemForm editMode={true} />} />
      </Routes>
    </div>
  );
}

export default App;

