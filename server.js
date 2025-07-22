const express= require('express')
const app=express();
app.use(express.json());


let todo=[]

app.get('/todos',(req,res)=>{
    res.status(200).json(todo)
})

app.post('/todos',(req,res)=>{
    const { task } =req.body;

    if(!task){
       return  res.status(400).json({Error:"Input required"})
    }

    const newtodo= {
        id: Date.now()+Math.floor(Math.random()*10000),
        task
    }
    
    todo.push(newtodo)
    res.status(201).json(newtodo)
})

app.delete('/todos/:id',(req,res)=>{
    const id= parseInt(req.params.id)
    const index=todo.findIndex((item)=>{
        return item.id===id;
    })
    
    if(index===-1){
        return res.status(404).json({error:"To-Do not found"})
    }

    const deleted= todo.splice(index,1)[0]
    res.status(200).json({message:"deleted", deletedTodo: deleted});

})


const PORT=3000

app.listen(PORT, ()=>{
    console.log(`The app is working at http://localhost:${PORT}`)
})