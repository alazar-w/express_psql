const express = require('express');
const app = express();
const pool = require("./db");

app.use(express.json())  //req->body

//ROUTES//

//get all todos
app.get("/todos",async(req,res) =>{
    try{
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    }catch(err){
        console.error(err.message)
    }
});

//get a todo
app.get("/todos/:id",async(req,res) => {
    const {id} = req.params;
    try{
    
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id])
        res.json({todos: todo.rows[0]});


    }catch(err){
        console.error(err.message);
    }
});

//create a todo
app.post('/todos',async(req,res) => {
    try{
    const {description} = req.body;
    const newTodo = await pool.query(
        "INSERT INTO todo (description) VALUES ($1) RETURNING *",[description]
    );
    res.json({todo: newTodo.rows[0],msg:"sucessfuly created todo"});

    }catch(err){ 
        console.error(err.message)
    }

})

//update a todo

app.put("/todos/:id",async(req,res) => {
    const {id} = req.params;
    const {description} = req.body;
    try{
    
        const todo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description,id]);
        res.json("To do was updated!");


    }catch(err){
        console.error(err.message);
    }
});

//delete a todo
app.delete("/todos/:id",async(req,res) => {
    const {id} = req.params;
    try{
        const todo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id])
        res.json("row " + id  + " delated");

    }catch(err){
        console.error(err.message);
    }
});




app.listen(5000,()=>{
    console.log("server listining on port 5000")
})  