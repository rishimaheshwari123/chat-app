import "./App.css";
import LoginForm from "./pages/Login";
import OpenRoute from "./components/routes/OpenRoute";
import PrivateRoute from "./components/routes/PrivateRoute";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProfile } from "./service/operations/user";
import { useEffect } from "react";
import useSocket from "./socket io/useSocket";
import MainSidebar from "./components/dashboard/index";

import SearchUsers from "./pages/SearchUser";
import ChatContainer from "./pages/SelectUser";
import ChatsApp from "./pages/MainChat";
import Register from "./pages/Register";

function App() {
  const { token } = useSelector((state) => state.auth);
  const { sessionID } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useSocket();

  useEffect(() => {
    console.log(token);

    if (token) {
      dispatch(fetchMyProfile(token, navigate, sessionID));
    }
  }, [token]);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <OpenRoute>
              <LoginForm />
            </OpenRoute>
          }
        />
        <Route
          path="/register"
          element={
            <OpenRoute>
              <Register />
            </OpenRoute>
          }
        />
        <Route
          path="/ChatContainer"
          element={
            <PrivateRoute>
              <ChatContainer />
            </PrivateRoute>
          }
        />
        <Route
          path="/ss"
          element={
            <PrivateRoute>
              <SearchUsers />
            </PrivateRoute>
          }
        />

        <Route
          element={
            <PrivateRoute>
              <MainSidebar />
            </PrivateRoute>
          }
        >
          <Route
            path="/chats"
            element={
              <PrivateRoute>
                <ChatsApp />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
