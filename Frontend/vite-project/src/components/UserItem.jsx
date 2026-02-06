const UserItem = ({ user }) => {
  return (
    <div>
      <img
        src={`http://localhost:5001/${user.profilePic}`}
        width="40"
      />
      <span>{user.name}</span>
    </div>
  );
};

export default UserItem;
