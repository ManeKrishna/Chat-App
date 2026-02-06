import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/chat"
        element={user ? <Chat /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
