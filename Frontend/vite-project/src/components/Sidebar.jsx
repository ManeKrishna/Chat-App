import { useEffect, useState } from "react";
import api from "../services/api";
import UserItem from "./UserItem";

const Sidebar = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div style={{ width: "30%", borderRight: "1px solid gray" }}>
      {users.map((u) => (
        <UserItem key={u._id} user={u} />
      ))}
    </div>
  );
};

export default Sidebar;
