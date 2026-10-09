import { useAuth } from "../../AuthContext";

const AccountDetails = () => {
  const { user } = useAuth();

  return (
    <div>
      <h3>Account Details</h3>
      <div className="accountDetailRow">
        <span className="label">Name</span>
        <span>{user.name}</span>
      </div>
      <div className="accountDetailRow">
        <span className="label">Email</span>
        <span>{user.email}</span>
      </div>
    </div>
  );
};

export default AccountDetails;
