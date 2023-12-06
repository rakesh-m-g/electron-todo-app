// TodoList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editedTodoId, setEditedTodoId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDone, setShowDone] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/todo');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todo/${id}`);
      fetchTodos();
      setEditedTodoId(null);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleEdit = (id) => {
    setEditedTodoId(id);
  };

  const handleToggleDone = async (id, isDone) => {
    try {
      await axios.put(`http://localhost:3000/todo/${id}`, { isDone: !isDone });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const filteredTodos = todos.filter((todo) =>
    todo.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!showDone || !todo.isDone)
  );

  return (
    <div className="container mt-4">
      <TodoForm
        onAdd={(newTodo) => setTodos((prevTodos) => [...prevTodos, newTodo])}
        onEdit={(editedId, newName) => {
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo._id === editedId ? { ...todo, name: newName } : todo
            )
          );
          setEditedTodoId(null);
        }}
        editingTodo={todos.find((todo) => todo._id === editedTodoId)}
      />

      <div className="my-3">
        <input
          type="text"
          placeholder="Search Todo"
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
       
      </div>

      {filteredTodos.map((todo) => (
        <div key={todo._id} className="d-flex justify-content-between align-items-center mt-3 border p-2">
          {editedTodoId === todo._id ? (
            null
          ) : (
            <>
              <div>
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={todo.isDone}
                  onChange={() => handleToggleDone(todo._id, todo.isDone)}
                />
                <span>{todo.name}</span>
              </div>
              <div>
                <button className="btn btn-danger mx-2" onClick={() => handleDelete(todo._id)}>
                  Delete
                </button>
                <button className="btn btn-primary" onClick={() => handleEdit(todo._id)}>
                  Edit
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
