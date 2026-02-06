import { useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await api.post("/auth/login", { email, password });
    login(res.data.user, res.data.token);
    navigate("/");
  };

  return (
    <>
      <input onChange={(e) => setEmail(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </>
  );
};

export default Login;
