/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
  const express = require('express');
  const bodyParser = require('body-parser');
  
  const app = express();
  
  app.use(bodyParser.json());
  
  // main database array where todo list is stored
  const todoDB = [

    {
      id: 1,
      title: "learn typescript",
      descriptn: "ts is a modified form of js",
      completed: false
    },

    {
      id: 2, 
      title:"learn express",
      descriptn: "express is a library used to create http servers",
      completed: true
    }
  ]


  // Helper function to generate unique IDs in order
const generateId = () => {
  return todoDB.length > 0 ? Math.max(...todoDB.map(todo => todo.id)) + 1 : 1;
};

  // first get route which gives an array containing all items
  app.get('/todos', (req, res) => {
    
    res.status(200).json(todoDB);
  })

  //gives specific item by id as parameter
  app.get('/todos/:id', (req, res) => {

    const returnID = parseInt(req.params.id);
    let found = false ;

    for (let i= 0; i<todoDB.length; i++) {
      if(returnID === todoDB[i].id) {
        res.status(200).json(todoDB[i]);
        found = true;
        break;
      }
    }if(!found) {
      res.status(404).send("not found");
    }
  })


  //creates a new item
  app.post('/todos', (req, res) => {

    const newTodo = {
      id: generateId(),
      title: req.body.title,
      descriptn: req.body.descriptn,
      completed: req.body.completed
    }
    todoDB.push(newTodo);
    res.status(201).json(newTodo.id);
  })

  // changes an existing item
  app.put('/todos/:id', (req, res) => {

    const returnID = parseInt(req.params.id);
    let found = false ;

    for (let i= 0; i<todoDB.length; i++) {
      if(returnID === todoDB[i].id) {
        
        todoDB[i] = [{
          id: returnID,
          title: req.body.title,
          descriptn: req.body.descriptn,
          completed: req.body.completed
        }]
        res.status(200).send("ok");
        found = true;
        break;
      }
    }if(!found) {
      res.status(404).send("not found");
    }

  })

  //deletes an existing item
  app.delete('/todos/:id', (req, res) => {

    const returnID = parseInt(req.params.id);
    let k = 0 ;

    for (let i= 0; i<todoDB.length; i++) {
      if(returnID == todoDB[i].id) {
        
        todoDB.splice(i, 1);
        res.status(200).send("ok");
        k = 1;
        break;
      }
    }if(k == 0) {
      res.status(404).send("not found");
    }    
  })


  app.listen(3000);
  module.exports = app;