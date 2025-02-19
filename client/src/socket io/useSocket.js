import { useEffect } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../slices/authSlice';
import { setSessionID, setUser } from '../slices/profileSlice';
import Swal from 'sweetalert2';

const useSocket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sessionID } = useSelector(state => state.profile);

  useEffect(() => {
    const socket = io("https://chat-app-8x1z.onrender.com");

    socket.on('logout', ({ sessionId, message }) => {
      if (sessionID === sessionId) {
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(setSessionID(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Show SweetAlert2 popup
        Swal.fire({
          icon: 'warning',
          title: 'Logged Out',
          text: 'You logged out from another device.',
          confirmButtonText: 'OK'
        }).then(() => {
          // Redirect after the popup is closed
          navigate('/');
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [navigate, sessionID, dispatch]);

  return null;
};

export default useSocket;
