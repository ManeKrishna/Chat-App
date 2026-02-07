const UserItem = ({ user, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      style={{
        ...styles.container,
        ...(isSelected ? styles.selected : {}),
      }}
    >
      <div style={styles.avatar}>
        {user.profilePic ? (
          <img
            src={`http://localhost:5001/${user.profilePic}`}
            alt={user.name}
            style={styles.image}
          />
        ) : (
          <div style={styles.placeholder}>
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div style={styles.info}>
        <div style={styles.name}>{user.name}</div>
        <div style={styles.email}>{user.email}</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    padding: "12px 15px",
    cursor: "pointer",
    borderBottom: "1px solid #e0e0e0",
    background: "#fff",
    transition: "background 0.2s",
  },
  selected: {
    background: "#e8f5e9",
  },
  avatar: {
    marginRight: "12px",
  },
  image: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  placeholder: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "#075E54",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "bold",
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: "500",
    marginBottom: "4px",
  },
  email: {
    fontSize: "12px",
    color: "#666",
  },
};

export default UserItem;