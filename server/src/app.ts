import express from "express"

const app = express()

app.use(express.json()) 

app.get('/health',(req,res)=>{
    res.json({message:"Health Okay"})
})



export default app