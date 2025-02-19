const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { setIO } = require('./socketIO/socket'); // Import the utility
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoute = require('./routes/userRoute');
const chatRoutes = require("./routes/chat");
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 8080;
const Chat = require("./models/chtasSchema")


const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Set the Socket.IO instance
setIO(io);

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "*",
  credentials: true,
}));





// API routes
app.use('/api/v1/user', userRoute);
app.use("/api/v1/chat", chatRoutes);
// Test route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Your server is up and running ...',
  });
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinConversation', (conversationId) => {
    socket.join(conversationId);
  });

  socket.on('typing', (conversationId, userId) => {
    console.log("typing")
    socket.to(conversationId).emit('displayTyping', { userId });
  });



  socket.on('stopTyping', (conversationId, userId) => {
    socket.to(conversationId).emit('removeTyping', { userId });
  });

  socket.on('sendMessage', async (messageData) => {
    const { conversationId, sender, message } = messageData;

    if (message === "") {
      return
    }
    const newMessage = new Chat({ conversationId, sender, message });
    await newMessage.save();
    io.to(conversationId).emit('receiveMessage', {
      conversationId,
      sender,
      message,
    });

    io.emit('new_message', { conversationId, message });
  });

  socket.on('markMessagesAsRead', async ({ conversationId, userId }) => {
    try {
      // Mark unread messages as read for the current conversation
      await Chat.updateMany(
        { conversationId, sender: { $ne: userId }, read: false },
        { $set: { read: true } }
      );

      // Emit the message_read event to the conversation room
      io.to(conversationId).emit('message_read', { conversationId });
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
})


// Start server and Socket.IO
server.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
