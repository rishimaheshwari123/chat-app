import io from 'socket.io-client';
import { useEffect } from 'react';

const socket = io("https://chat-app-8x1z.onrender.com");

const useLogoutOnSessionExpiry = () => {
  useEffect(() => {
    socket.on('logout', (data) => {
      console.log(data.message);
      // Perform client-side logout
      localStorage.removeItem('token');
      window.location.reload(); // Refresh the page or redirect the user
    });

    return () => {
      socket.off('logout');
    };
  }, []);
};

export default useLogoutOnSessionExpiry;
