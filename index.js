const express = require("express")
const firebase = require("firebase")
require("dotenv").config()
const cors = require('cors')
const Message = require("./model")
const app = express()
app.use(express.json())
app.use(cors({origin: "*",}))

const{
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID
} = process.env

const config = {
  apiKey: API_KEY, 
  authDomain: AUTH_DOMAIN, 
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
}
firebase.initializeApp(config)
const db = firebase.firestore()
app.post("/send",(req,res)=>{
  console.log(req.body)
  const message = new Message(req.body.email, req.body.name, req.body.contact, req.body.message)
  if(message.validEmail()){
    if(message.email!==""&&message.name.match(/^[a-z ,.'-]+$/i)&&message.contact.match(/^[0-9]\d{9}$/)&&message.message!==""){
      db.collection("Messages").add({
        email: message.email,
        name: message.name,
        contact: message.contact,
        message: message.message
      })
      res.send({message: "Thank You for reaching out"})
    }else{
      res.send({message: "Please check your data and make sure none of it / had wierd characters"})
    }
  }else{
    res.status(200).send({message: "Not Valid Email"})
  }
})


app.listen(process.env.PORT?process.env.PORT:3005,()=>{
  console.log(`listening on ${process.env.PORT?process.env.PORT:3005}`)
})