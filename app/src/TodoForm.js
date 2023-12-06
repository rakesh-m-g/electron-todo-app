// TodoForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const TodoForm = ({ onAdd, onEdit, editingTodo }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setName(editingTodo.name);
    }
  }, [editingTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTodo) {
        await axios.put(`http://localhost:3000/todo/${editingTodo._id}`, { name });
        onEdit(editingTodo._id, name);
      } else {
        const response = await axios.post('http://localhost:3000/todo', { name });
        onAdd(response.data);
      }

      setName('');
    } catch (error) {
      console.error(`Error ${editingTodo ? 'editing' : 'adding'} todo:`, error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Todo Name:</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {editingTodo ? 'Save Edit' : 'Add Todo'}
      </button>
    </form>
  );
};

export default TodoForm;
