const TodoService = require("../services/TodoService");
const { validateTodo } = require("../validations/todoValidation");

exports.getTodos = async (req, res) => {
    try {
        const search = req.query.search || ''; 
        const todoData = await TodoService.getTodos(search);
        res.json(todoData);
    } catch (err) {
     
        res.status(500).send('Internal Server Error');
    }
};

exports.createTodo = async (req, res) => {
    try {

        const { error } = validateTodo(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

    
        const newTodoData = await TodoService.createTodo({
            name: req.body.name,
        });

        res.status(201).json(newTodoData);
    } catch (err) {
  
        res.status(500).send('Internal Server Error');
    }
};

exports.updateTodo = async (req, res) => {
    const todoId = req.params.id;

    try {
       
        const { error } = validateTodo(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const updatedTodo = await TodoService.updateTodo(todoId, {
            name: req.body.name,
        });

        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(updatedTodo);
    } catch (err) {
   
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteTodo = async (req, res) => {
    const todoId = req.params.id;

    try {
        const result = await TodoService.deleteTodo(todoId);

        if (!result) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
       
        res.status(500).send('Internal Server Error');
    }
};
