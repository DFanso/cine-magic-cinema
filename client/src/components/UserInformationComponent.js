import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./css/UserInformationComponent.css";

function UserInformationComponent() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (isLoggedIn && token) {
        setLoading(true);
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_PATH}/users/profile`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Failed to fetch user data.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [isLoggedIn]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-information">
      <form>
        <h1>User Profile</h1>
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
