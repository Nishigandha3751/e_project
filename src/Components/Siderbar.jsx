import React from "react";
import { IoGrid } from "react-icons/io5";
import { Link, Outlet, useLocation } from "react-router-dom"; // Import Link

const Sidebar = () => {
  const path = useLocation();
  const ActivePath = path.pathname;

  return (
    <div className="d-flex flex-row bg-light mt-2 " style={{ minHeight: "100vh" , fontWeight:'bolder'}}>
      <section  
        id="main-sidebar" 
        className="bg-white " 
        style={{ height: "100vh", width: '240px', fontSize: '1.5rem', paddingLeft:'1rem'  }}
      >
        <ul className="list-unstyled">
          <li className="d-flex align-items-center" style={{ padding: '0.5rem 0' }}>
            <Link 
              to="/user"
              style={{
                textDecoration: 'none',
                color: ActivePath === "/user" ? "#6941C6" : "black",
                backgroundColor: ActivePath === "/user" ? "light" : "transparent", // Add active background color
                fontWeight: ActivePath === "/user" ? 'bolde' : "normal"
              }}  
              className="d-flex align-items-center"> 
              <IoGrid className="me-2" />
              Overview
            </Link>
          </li>

          <li className="d-flex align-items-center" style={{ padding: '0.5rem 0',}}>
            <Link 
              to="/user/students"
              style={{
                textDecoration: 'none',
                color: ActivePath === "/user/students" ? "#6941C6" : "black",
                
                fontWeight: ActivePath === "/user/students" ? 'bold' : "normal"
              }}  
              className="d-flex align-items-center"> 
              <IoGrid  className="me-2" />
              People Directory
            </Link>
          </li>
        </ul>
      </section>
      <section style={{ flex: 1 }}>
        <Outlet />
      </section>
    </div>
  );
}

export default Sidebar;
