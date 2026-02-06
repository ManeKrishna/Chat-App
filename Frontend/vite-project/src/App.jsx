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
      {/* ROOT */}
      <Route
        path="/"
        element={user ? <Navigate to="/chat" /> : <Navigate to="/login" />}
      />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* PROTECTED */}
      <Route
        path="/chat"
        element={user ? <Chat /> : <Navigate to="/login" />}
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
