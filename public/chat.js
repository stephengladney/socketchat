const socket = io.connect("http://localhost:3000")

const container = document.querySelector("#container")
const userInput = document.querySelector("#user")
const messageInput = document.querySelector("#message")
const typingIndicator = document.querySelector("#typing")

socket.on("chat", data => {
  typingIndicator.innerHTML = ""
  output.innerHTML += `<p><strong>${data.user}:</strong> ${data.message}</p>`
})

socket.on("typing", user => {
  typingIndicator.innerHTML = `<p><em>${user} is typing...</em></p>`
})

messageInput.addEventListener("keypress", e => {
  if (e.code === "Enter") {
    if (messageInput.value.length === 0) return
    if (userInput.value.length === 0) {
      userInput.style.borderColor = "#f55"
      setTimeout(() => (userInput.style.borderColor = ""), 1000)
      return
    }
    socket.emit("chat", { user: userInput.value, message: messageInput.value })
    messageInput.value = ""
  } else {
    socket.emit("typing", userInput.value)
  }
})
