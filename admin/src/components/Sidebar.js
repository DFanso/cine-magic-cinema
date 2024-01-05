// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import "../css/Sidebar.css"; // Import the CSS file

const Sidebar = () => {
  // Navigation items
  const navigation = [
    { title: "Movies", link: "/movies-view" },
    { emptytitle: "", link: "" },
    { title: "Chat", link: "/chat" },

    // Add more navigation items here
  ];

  return (
    <div className="sidebar">
      {navigation.map((item, index) => (
        <Link to={item.link} key={index} className="sidebar-item">
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
