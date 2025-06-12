import express from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const app = express();
app.use(express.json());

app.get("/", (req,res)=>{
    res.send(`
        <h1>Welcome to Tasha's tasks API</h1>
        <h4>The api gives you a title, the description of the task and whether the task is completed or not</h4>`)
})

const port = process.env.PORT|| 3500;
app.post('/task',async(req,res)=>{
    try {
        const tasks = req.body
        const task = await client.tasks.createManyAndReturn({
            data:tasks
        }
        );
        return res.status(201).json({
            success:true,
            message:'Task created successfully',
            data:task
        })
    } catch (error) {
        console.log(error);
       return res.status(500).json({
            success:false,
            message:`Something went wrong`})
    }
})
app.get("/tasks",async (req,res) => {
    try {
        const tasks = await client.tasks.findMany()
        return res.status(201).json({
            success:true,
            message:'successful',
            data:tasks
        })
    } catch (error) {
        res.status(500).json({
            message:`Something went wrong`
        })
    }
    
})
app.get("/task/:id",async (req,res) => {
    try {
        const {id} = req.params
        const task = await client.tasks.findFirst({
            where:{id}
        })
       if(task){
        return res.status(201).json({
            success:true,
            data:task
        })
       }
       else{
        return res.status(404).json({
            success:false,
            message:"Task not found"
        })
       }
    } catch (error) {
        res.status(500).json({
            message:`Something went wrong`
        })
    }
    
})
app.put(`/task/:id`,async (req,res) => {
    try {
        const {title,description,isCompleted,isDeleted} =req.body;
        const {id} = req.params
        const task = await client.tasks.update({
            where : {id},
            data:{
                title,
                description,
                isCompleted,
                isDeleted
            }
        });
        res.status(200).json({
            success:true,
            message:"Task updated successfully",
            updatedTask:task
        })
    } catch (error) {
        res.status(500).json({
            message:`Something went wrong`
        })
    }
})

app.patch(`/task/:id`,async (req,res) => {
    try {
        const {id} = req.params
        const {title,description}=req.body
        await client.tasks.update({
           where :{id} ,data:{
            title,
            description
           }
        });
        res.status(200).json({
            success:true,
            message:"Task partially updated successfully",
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:`Something went wrong`
        })
    }
})
// This piece of code changes the is deleted status to true

// app.delete(`/task/:id`, async (req,res) => {
//     try {
//         const {id} = req.params
//          await client.tasks.update({
//             where : {id},
//             data:{
//                 isDeleted:true
//             }
//         });
//         res.status(200).json({
//             success:true,
//             message:"Task deleted successfully",
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             message:`Something went wrong`
//         })
//     }
// })

// This one hard deletes a piece of code
app.delete(`/task/:id`, async (req,res) => {
    try {
        const {id} = req.params
         await client.tasks.delete({
            where:{id}
        })
        return res.status(200).json({
            message:`Task deleted `
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:`Something went wrong`
        })
    }
})
app.listen(port,()=>{
    console.log(`The API is running on port ${port}`)
})
