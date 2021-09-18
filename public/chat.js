const socket = io.connect("http://localhost:3000")

const container = document.querySelector("#container")
const userInput = document.querySelector("#user")
const messageInput = document.querySelector("#message")
const typingIndicator = document.querySelector("#typing")
let typingTimer

socket.on("chat", (data) => {
  typingIndicator.innerHTML = ""
  output.innerHTML += `<p><strong>${data.user}:</strong> ${data.message}</p>`
})

socket.on("typing", (user) => {
  typingIndicator.innerHTML = `<p><em>${user} is typing...</em></p>`
})

socket.on("stopped typing", (_) => {
  console.log("")
  typingIndicator.innerHTML = ``
})

messageInput.addEventListener("keypress", (e) => {
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
    clearTimeout(typingTimer)
    socket.emit("typing", userInput.value)

    typingTimer = setTimeout(() => {
      socket.emit("stopped typing", userInput.value)
    }, 3000)
  }
})
