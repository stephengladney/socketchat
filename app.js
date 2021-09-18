const express = require("express")
const app = express()
const socket = require("socket.io")

app.use(express.static("public"))

const server = app.listen(3000, () => {
  console.log("Chat app server running on port 3000")
})

const io = socket(server)

io.on("connection", (socket) => {
  console.log(`New socket opened: ${socket.id}`)

  socket.on("chat", (data) => {
    io.sockets.emit("chat", data)
  })

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data)
  })

  socket.on("stopped typing", (data) => {
    socket.broadcast.emit("stopped typing", data)
  })
})
