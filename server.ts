const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const server = http.createServer(app)
const PORT = process.env.PORT || 3000
const socketio = require('socket.io')
const io = socketio(server)


server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

app.get('/', (req , res)=>{
    res.end("TGR")
})