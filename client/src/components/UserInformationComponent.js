import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import "./css/UserInformationComponent.css";

function UserInformationComponent() {
  const { userData } = useContext(UserContext);
  return (
    <div className="user-information">
      <form>
        <h1>user profile</h1>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <p>{userData.firstName || "First name not set"}</p>
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <p>{userData.lastName || "Last name not set"}</p>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <p>{userData.email || "Email not set"}</p>
        </div>        
        <div className="button-container">
          <a href="/forgot-password">
            <button type="button">Reset Password</button>
          </a>
        </div>
      </form>
    </div>
  );
}

export default UserInformationComponent;
