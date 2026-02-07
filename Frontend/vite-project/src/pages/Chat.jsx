import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { initSocket, disconnectSocket } from "../services/socket";

export default function Chat() {
  const { user, logout } = useContext(AuthContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Initialize socket connection
      const socket = initSocket(user._id);

      return () => {
        disconnectSocket();
      };
    }
  }, [user]);

  const handleLogout = () => {
    disconnectSocket();
    logout();
    navigate("/login");
  };

  const handleSelectUser = (chatUser, chat) => {
    setSelectedUser(chatUser);
    setSelectedChat(chat);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Chat App</h2>
        <div>
          <span style={styles.username}>Welcome, {user?.name}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.chatContainer}>
        <Sidebar 
          onSelectUser={handleSelectUser} 
          selectedUserId={selectedUser?._id}
        />
        <ChatWindow 
          selectedUser={selectedUser} 
          selectedChat={selectedChat}
          currentUser={user}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "15px 20px",
    background: "#075E54",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  username: {
    marginRight: "15px",
  },
  logoutBtn: {
    padding: "8px 16px",
    background: "#25D366",
    border: "none",
    borderRadius: "4px",
    color: "white",
    cursor: "pointer",
  },
  chatContainer: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },
};