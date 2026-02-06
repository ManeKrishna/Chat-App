import { useEffect, useState } from "react";
import api from "../services/api";
import UserItem from "./UserItem";

export default function Sidebar({ selectedUser, onSelectUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    console.log("USER FROM LS:", stored);
  
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
  
    fetchUsers();
  }, []);
  

  return (
    <div style={styles.sidebar}>
      <h3>Chats</h3>

      {users.map((user) => (
        <UserItem
          key={user._id}
          user={user}
          isSelected={selectedUser?._id === user._id}
          onClick={() => onSelectUser(user)}
        />
      ))}
    </div>
  );
}

const styles = {
  sidebar: {
    width: "30%",
    borderRight: "1px solid #ddd",
    padding: "10px",
    overflowY: "auto",
  },
};
