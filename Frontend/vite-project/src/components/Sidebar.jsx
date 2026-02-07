import { useEffect, useState } from "react";
import api from "../services/api";
import UserItem from "./UserItem";

const Sidebar = ({ onSelectUser, selectedUserId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = async (user) => {
    try {
      // Create or get existing chat
      const res = await api.post("/chats", { userId: user._id });
      onSelectUser(user, res.data);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  if (loading) {
    return <div style={styles.container}>Loading users...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3>Contacts</h3>
      </div>
      <div style={styles.userList}>
        {users.length === 0 ? (
          <div style={styles.empty}>No users found</div>
        ) : (
          users.map((user) => (
            <UserItem
              key={user._id}
              user={user}
              onClick={() => handleUserClick(user)}
              isSelected={user._id === selectedUserId}
            />
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "30%",
    borderRight: "2px solid #e0e0e0",
    display: "flex",
    flexDirection: "column",
    background: "#f5f5f5",
  },
  header: {
    padding: "15px",
    background: "#fff",
    borderBottom: "1px solid #e0e0e0",
  },
  userList: {
    flex: 1,
    overflowY: "auto",
  },
  empty: {
    padding: "20px",
    textAlign: "center",
    color: "#666",
  },
};

export default Sidebar;