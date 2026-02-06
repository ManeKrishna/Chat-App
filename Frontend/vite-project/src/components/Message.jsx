export default function Message({ message }) {
    const isMe = message.sender === "me";
  
    return (
      <div
        style={{
          textAlign: isMe ? "right" : "left",
          marginBottom: "8px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "8px 12px",
            borderRadius: "15px",
            background: isMe ? "#dcf8c6" : "#eee",
          }}
        >
          {message.text}
        </span>
      </div>
    );
  }
  