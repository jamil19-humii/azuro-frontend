import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const Account = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="accountSec">
      <div className="container">
        <div className="accountHeader">
          <h1>My Account</h1>
          <p>Welcome back, {user.name}</p>
        </div>

        <div className="accountLayout">
          <aside className="accountSidebar">
            <NavLink
              to="/account"
              end
              className={({ isActive }) => `accountSidebarBtn ${isActive ? "active" : ""}`}
            >
              Account Details
            </NavLink>
            <NavLink
              to="/account/orders"
              className={({ isActive }) => `accountSidebarBtn ${isActive ? "active" : ""}`}
            >
              Order History
            </NavLink>
            <NavLink
              to="/account/addresses"
              className={({ isActive }) => `accountSidebarBtn ${isActive ? "active" : ""}`}
            >
              Saved Addresses
            </NavLink>
            <button onClick={logout} className="accountLogoutBtn">
              Log out
            </button>
          </aside>

          <div className="accountContent">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;