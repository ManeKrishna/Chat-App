import { useState, useEffect, useRef } from "react";
import api from "../services/api";
import { getSocket } from "../services/socket";
import Message from "./Message";

export default function ChatWindow({ selectedUser, selectedChat, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages();
    }
  }, [selectedChat]);

  useEffect(() => {
    if (!selectedUser) return;

    const socket = getSocket();

    // Listen for incoming messages
    socket.on("receiveMessage", ({ senderId, message }) => {
      if (senderId === selectedUser._id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/chats/${selectedChat._id}/messages`);
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const res = await api.post(`/chats/${selectedChat._id}/messages`, {
        text: newMessage,
      });

      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");

      // Emit socket event to notify receiver
      const socket = getSocket();
      socket.emit("sendMessage", {
        senderId: currentUser._id,
        receiverId: selectedUser._id,
        message: res.data,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!selectedUser) {
    return (
      <div style={styles.empty}>
        <div style={styles.emptyIcon}>💬</div>
        <h3>Welcome to Chat App</h3>
        <p>Select a contact to start messaging</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Chat Header */}
      <div style={styles.header}>
        <div style={styles.headerInfo}>
          {selectedUser.profilePic ? (
            <img
              src={`http://localhost:5001/${selectedUser.profilePic}`}
              alt={selectedUser.name}
              style={styles.headerImage}
            />
          ) : (
            <div style={styles.headerPlaceholder}>
              {selectedUser.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <div style={styles.headerName}>{selectedUser.name}</div>
            <div style={styles.headerStatus}>Online</div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div style={styles.messages}>
        {loading ? (
          <div style={styles.loadingText}>Loading messages...</div>
        ) : messages.length === 0 ? (
          <div style={styles.noMessages}>
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg) => (
            <Message
              key={msg._id}
              message={msg}
              isMe={msg.sender._id === currentUser._id}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div style={styles.inputBox}>
        <input
          placeholder="Type a message..."
          style={styles.input}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSendMessage} style={styles.sendBtn}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  empty: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#888",
    background: "#fafafa",
  },
  emptyIcon: {
    fontSize: "64px",
    marginBottom: "20px",
  },
  container: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    background: "#fff",
  },
  header: {
    padding: "15px 20px",
    borderBottom: "1px solid #e0e0e0",
    background: "#f5f5f5",
  },
  headerInfo: {
    display: "flex",
    alignItems: "center",
  },
  headerImage: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "12px",
    objectFit: "cover",
  },
  headerPlaceholder: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#075E54",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "bold",
    marginRight: "12px",
  },
  headerName: {
    fontWeight: "600",
    fontSize: "16px",
  },
  headerStatus: {
    fontSize: "12px",
    color: "#25D366",
  },
  messages: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    background: "#e5ddd5",
  },
  loadingText: {
    textAlign: "center",
    color: "#666",
    padding: "20px",
  },
  noMessages: {
    textAlign: "center",
    color: "#666",
    padding: "40px 20px",
  },
  inputBox: {
    display: "flex",
    padding: "15px",
    borderTop: "1px solid #e0e0e0",
    background: "#f5f5f5",
  },
  input: {
    flex: 1,
    marginRight: "10px",
    padding: "10px 15px",
    border: "1px solid #ddd",
    borderRadius: "20px",
    fontSize: "14px",
    outline: "none",
  },
  sendBtn: {
    padding: "10px 25px",
    background: "#075E54",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "500",
  },
};