import express from "express"
import mongoose from "mongoose"
import Cards from "./dbCards.js"
import Cors from "cors";

//App config
const app = express()
const port =  5000
const connection_url = "mongodb+srv://admin:vpdVCscSKkCIQyvP@cluster0.xoqk4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//Middlewares
app.use(express.json())
app.use(Cors())

//Db config
mongoose.connect(connection_url)

// /API endpoints
app.get('/',(req,res)=>{
    res.status(200).send("hello")
})

app.post("/tinder/cards",(req,res)=>{
    const dbCard = req.body

    Cards.create(dbCard,(err,data)=> {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})

app.get("/tinder/cards",(req,res)=>{

    Cards.find((err,data)=> {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

// Listener
app.listen(port,()=>console.log(port))