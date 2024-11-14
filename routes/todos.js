const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// POST /todos - Create a new to-do
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = await Todo.create({ title, description });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /todos - Retrieve all to-dos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    if (todos.length === 0) {
        return res.status(200).json({ message: 'No Todo is created' });
      }
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /todos/:id - Retrieve a specific to-do by ID
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOne({ id: parseInt(req.params.id) });
    if (!todo) {
      return res.status(404).json({ message: 'To-do not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /todos/:id - Update a specific to-do by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const updatedTodo = await Todo.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      { title, description, completed },
      { new: true, runValidators: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: 'To-do not found' });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /todos/:id - Delete a specific to-do by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!deletedTodo) {
      return res.status(404).json({ message: 'To-do not found' });
    }
    res.json({ message: 'To-do item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;