import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, profilePic: e.target.files[0] });
  };

  const handleSubmit = async () => {
    const data = new FormData();
    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    await api.post("/auth/signup", data);
    navigate("/login");
  };

  return (
    <>
      <input name="name" onChange={handleChange} placeholder="Name" />
      <input name="email" onChange={handleChange} placeholder="Email" />
      <input name="password" type="password" onChange={handleChange} />
      <input type="file" onChange={handleFile} />
      <button onClick={handleSubmit}>Signup</button>
    </>
  );
};

export default Signup;
