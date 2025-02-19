import io from 'socket.io-client';


const socket = io("https://chat-app-8x1z.onrender.com", {
  withCredentials: true,
  transports: ['websocket', 'polling']
});

socket.on('connect', () => {
  console.log('Socket connected:', socket.id);
});


socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// Example: Listen for events
socket.on('user-login', (data) => {
  console.log('User login event received:', data);
});



// socket.on('logout', ({ sessionId, message }) => {
//   // Clear local storage
//   console.log(sessionId)
//   localStorage.removeItem('token');
//   localStorage.removeItem('user');
//   localStorage.removeItem('sessionID');

//   // Redirect to login page or handle UI update


//   // Optionally show a message
//   console.log(message);
// });



export default socket;
