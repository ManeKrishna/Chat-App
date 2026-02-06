import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

export default function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div style={styles.container}>
      <Sidebar
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
      />
      <ChatWindow selectedUser={selectedUser} />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
};
