export default function UserItem({ user, onClick, isSelected }) {
    return (
      <div
        onClick={onClick}
        style={{
          ...styles.item,
          background: isSelected ? "#f0f0f0" : "transparent",
        }}
      >
        <div style={styles.avatar}>{user.name[0]}</div>
        <span>{user.name}</span>
      </div>
    );
  }
  
  const styles = {
    item: {
      display: "flex",
      alignItems: "center",
      padding: "10px",
      cursor: "pointer",
      borderBottom: "1px solid #eee",
    },
    avatar: {
      width: "35px",
      height: "35px",
      borderRadius: "50%",
      background: "#ccc",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "10px",
      fontWeight: "bold",
    },
  };
  