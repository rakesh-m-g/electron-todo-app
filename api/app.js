const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const Todo = require('./model/todomodel'); 
const todoroute = require('./routes/todoroute');

app.use(cors());
app.use(express.json());

const mongoDB = 'mongodb://127.0.0.1:27017/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const options = {
    definition: {
        openapi: "3.0.0",
        servers: [
            {
                url: "http://localhost:3000/",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(options);
app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs)
);

app.use('/todo', todoroute); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
