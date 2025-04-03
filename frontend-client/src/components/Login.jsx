
import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(form)
      .then((response) => {
        login(response.data.user, response.data.token);
        navigate('/');
      })
      .catch((err) => {
        setError(err.response?.data?.error || 'Login failed.');
      });
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div className="alert">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          value={form.username} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={form.password} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
