const express = require('express')

const app = express()
app.use(express.json())
 
const PORT = 5001

//All Tasks
let tasks = [
    { id : 1 , task : "Learn Backend", completed : false},
    { id : 2 , task : "Learn Express", completed : false},
    { id : 3 , task : "Learn React", completed : false}
]

//GET all tasks
app.get('/tasks', (req, res)=> {
    res.json(tasks)
})

//GET single task by ID
app.get('/tasks/:id', (req, res)=> {
    const task = tasks.find(t => t.id === parseInt(req.params.id))
    if(!task) return res.status(404).json({Message : "Task Not found"})

        res.json(task)
})

//POST ( Add New Task )
app.post('/tasks', (req, res)=> {
    const { task } = req.body;
    const newTask = { id : tasks.length + 1, task, completed : false }
    tasks.push(newTask)
    const Alltasks = tasks

    res.status(201).json({"New": newTask, Alltasks})
})

//PUT (Update the Task) 
app.put('/tasks/:id', (req, res)=> {
    const Task = tasks.find(t => t.id === parseInt(req.params.id))
    if(!Task) return res.status(404).json("Task Not Found")
    const { task , completed } = req.body
    Task.task = task !== undefined ? task : Task.task;
    Task.completed = completed !== undefined ? completed : Task.completed

    const Alltasks = tasks

    res.json({"Updated Task " : Task, Alltasks})
})

//DELETE (delet Task by ID)
app.delete('/tasks/:id', (req, res)=> {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id))

    res.json({msg : "Task Deleted", tasks})
})


app.listen(PORT , ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
    
})