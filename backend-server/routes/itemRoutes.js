const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Endpoint to get all items
router.get('/', function(req, res) {
  db('items').select('*')
    .then(function(items) {
      // Optionally truncate description if longer than 100 characters
      const modifiedItems = items.map(function(item) {
        if (item.description && item.description.length > 100) {
          item.description = item.description.substring(0, 100) + '...';
        }
        return item;
      });
      res.status(200).json(modifiedItems);
    })
    .catch(function(error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ error: 'Failed to fetch items.' });
    });
});

// Endpoint to get an item by id
router.get('/:id', function(req, res) {
  const id = req.params.id;
  db('items').where({ id: id }).first()
    .then(function(item) {
      if (!item) {
        return res.status(404).json({ error: 'Item not found.' });
      }
      res.status(200).json(item);
    })
    .catch(function(error) {
      console.error('Error fetching item:', error);
      res.status(500).json({ error: 'Failed to fetch item.' });
    });
});

// Endpoint to create a new item
router.post('/', function(req, res) {
  const userId = req.body.userId;
  const name = req.body.name;
  const description = req.body.description;
  const quantity = req.body.quantity;

  if (!userId || !name || !description || quantity === undefined) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  db('items').insert({
      userId: userId,
      name: name,
      description: description,
      quantity: quantity
    })
    .returning('*')
    .then(function(newItems) {
      const newItem = newItems[0];
      res.status(201).json(newItem);
    })
    .catch(function(error) {
      console.error('Error creating item:', error);
      res.status(500).json({ error: 'Failed to create item.' });
    });
});

// Endpoint to update an item
router.put('/:id', function(req, res) {
  const id = req.params.id;
  const name = req.body.name;
  const description = req.body.description;
  const quantity = req.body.quantity;

  db('items').where({ id: id })
    .update({ name: name, description: description, quantity: quantity })
    .returning('*')
    .then(function(updatedItems) {
      if (!updatedItems || updatedItems.length === 0) {
        return res.status(404).json({ error: 'Item not found.' });
      }
      const updatedItem = updatedItems[0];
      res.status(200).json(updatedItem);
    })
    .catch(function(error) {
      console.error('Error updating item:', error);
      res.status(500).json({ error: 'Failed to update item.' });
    });
});

// Endpoint to delete an item
router.delete('/:id', function(req, res) {
  const id = req.params.id;
  db('items').where({ id: id }).del()
    .then(function(deletedCount) {
      if (!deletedCount) {
        return res.status(404).json({ error: 'Item not found.' });
      }
      res.status(200).json({ message: 'Item deleted successfully.' });
    })
    .catch(function(error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ error: 'Failed to delete item.' });
    });
});

module.exports = router;