const express = require('express');
const app = express()
require('dotenv').config()
const port = process.env.PORT ;
const server = require('http').createServer(app)
const io = require('socket.io')(server , {
    cors:{
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
        credentials: true, // Allow credentials
  }
})



app.get('/',(req,res)=>{
    res.send('Hello world')
})

io.on('connection',socket=>{
    console.log('Made a connection')
    const id = socket.handshake.query.id
    console.log(id)
    // I has to make a room with the sender id such that its easy to send messsages across different persons 
    socket.join(id)
    socket.on('send-message',({receipients, text})=>{
       
       receipients.forEach(receipient => {
        // We are making newreceipients since the receiver should not have his Id in (receipients array [ids]) in the conversation
        const newReceipients = receipients.filter(r => r !== receipient)
        // And we need to push the id of sender for receiver
        newReceipients.push(id)
        // Then broadcast to their Respective Ids 
        socket.broadcast.to(receipient).emit('receive-message',{
            receipients : newReceipients , sender : id , text ,
        },(message)=>{
            console.log(message)
        })
       });
    })
})


server.listen(port , ()=>{
    console.log(`server is running on port ${port}`)
})
