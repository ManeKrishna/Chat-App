import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Chat() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Chat Page</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
