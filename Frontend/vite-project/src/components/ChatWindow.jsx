export default function ChatWindow({ selectedUser }) {
    if (!selectedUser) {
      return (
        <div style={styles.empty}>
          Select a user to start chatting
        </div>
      );
    }
  
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          {selectedUser.name}
        </div>
  
        <div style={styles.messages}>
          {/* messages will come later */}
        </div>
  
        <div style={styles.inputBox}>
          <input placeholder="Type a message..." style={styles.input} />
          <button>Send</button>
        </div>
      </div>
    );
  }
  
  const styles = {
    empty: {
      width: "70%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#888",
    },
    container: {
      width: "70%",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      padding: "10px",
      borderBottom: "1px solid #ddd",
      fontWeight: "bold",
    },
    messages: {
      flex: 1,
      padding: "10px",
    },
    inputBox: {
      display: "flex",
      padding: "10px",
      borderTop: "1px solid #ddd",
    },
    input: {
      flex: 1,
      marginRight: "10px",
    },
  };
  