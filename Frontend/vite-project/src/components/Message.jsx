export default function Message({ message, isMe }) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      style={{
        ...styles.container,
        justifyContent: isMe ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          ...styles.bubble,
          ...(isMe ? styles.myMessage : styles.theirMessage),
        }}
      >
        {!isMe && message.sender && (
          <div style={styles.senderName}>{message.sender.name}</div>
        )}
        <div style={styles.text}>{message.text}</div>
        <div style={styles.time}>
          {formatTime(message.createdAt || new Date())}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    marginBottom: "10px",
  },
  bubble: {
    maxWidth: "60%",
    padding: "8px 12px",
    borderRadius: "8px",
    position: "relative",
    wordWrap: "break-word",
  },
  myMessage: {
    background: "#dcf8c6",
    borderTopRightRadius: "0",
  },
  theirMessage: {
    background: "#fff",
    borderTopLeftRadius: "0",
  },
  senderName: {
    fontSize: "12px",
    color: "#075E54",
    fontWeight: "600",
    marginBottom: "4px",
  },
  text: {
    fontSize: "14px",
    lineHeight: "1.4",
    marginBottom: "4px",
  },
  time: {
    fontSize: "10px",
    color: "#667781",
    textAlign: "right",
  },
};