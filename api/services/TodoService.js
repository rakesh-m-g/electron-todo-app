const Todo = require('../model/todomodel');

class TodoService {
  static async createTodo(data) {
    return Todo.create(data);
  }

  static async getTodos(search = '') {
    const searchQuery = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
      ],
    };

    return Todo.find(searchQuery);
  }

  static async getTodoById(todoId) {
    return Todo.findById(todoId);
  }

  static async updateTodo(todoId, updatedData) {
    return Todo.findByIdAndUpdate(todoId, updatedData, { new: true });
  }

  static async deleteTodo(todoId) {
    return Todo.findByIdAndDelete(todoId);
  }


}

module.exports = TodoService;
