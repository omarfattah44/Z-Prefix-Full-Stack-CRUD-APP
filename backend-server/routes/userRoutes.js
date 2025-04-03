const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/db');



// Endpoint for user registration
router.post('/register', function(req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const password = req.body.password;

  if (!firstName || !lastName || !username || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Check if the user already exists
  db('users').where({ username: username }).first()
    .then(function(existingUser) {
      if (existingUser) {
        res.status(400).json({ error: 'Username already exists.' });
        return Promise.reject('User exists');
      }

      // Hash the password
      return bcrypt.hash(password, 10);
    })
    .then(function(hashedPassword) {

      // Inserting the new user into the database     
      return db('users')
        .insert({
          firstName: firstName,
          lastName: lastName,
          username: username,
          password: hashedPassword
        })
        .returning('*');
    })
    .then(function(newUsers) {
      const newUser = newUsers[0];

      // Generating a JWT token for the new user
      const token = jwt.sign(
        { id: newUser.id, username: newUser.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      res.status(201).json({ user: newUser, token: token });
    })
    .catch(function(error) {
      if (error !== 'User exists') {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed.' });
      }
    });
});

// Endpoint for user login
router.post('/login', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  // Finding the user by username
  db('users').where({ username: username }).first()
    .then(function(user) {
      if (!user) {
        res.status(400).json({ error: 'Invalid credentials.' });
        return Promise.reject('No user');
      }

      // Comparing the password with the stored hashed password
      return Promise.all([user, bcrypt.compare(password, user.password)]);
    })
    .then(function(results) {
      const user = results[0];
      const validPassword = results[1];
      if (!validPassword) {
        return res.status(400).json({ error: 'Invalid credentials.' });
      }

      // Generating a JWT token for the user
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      res.status(200).json({
        user: {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName
        },
        token: token
      });
    })
    .catch(function(error) {
      if (error !== 'No user') {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed.' });
      }
    });
});

module.exports = router;