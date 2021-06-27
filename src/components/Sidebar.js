import React, { useState, useEffect } from "react";
import logo from "../img/a10dancelogo.png";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FiHome, FiLogOut, FiArrowLeftCircle } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";
import { FaSchool } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./components.css";

const Sidebar = () => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(true);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const mediaWatcher = window.matchMedia("(max-width: 700px)");
    function closeMenu(e) {
      setMenuCollapse(e.matches);
    }
    mediaWatcher.addEventListener("change", closeMenu);
    return function cleanup() {
      mediaWatcher.removeEventListener("change", closeMenu);
    };
  }, []);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div id="sidebar">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              <p>
                {menuCollapse ? (
                  <GiHamburgerMenu onClick={menuIconClick} size={42} />
                ) : (
                  <img src={logo} alt="Logo" />
                )}
              </p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? null : <FiArrowLeftCircle />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu>
              <MenuItem icon={<FiHome size={42} />}>
                Homepage
                <Link to="/" />
              </MenuItem>
              <MenuItem icon={<BsFillPersonFill size={42} />}>
                Profile
                <Link to="/profile" />
              </MenuItem>
              <MenuItem icon={<FaSchool size={42} />}>
                Classes
                <Link to="/classes" />
              </MenuItem>
              <MenuItem icon={<AiOutlineUsergroupAdd size={42} />}>
                Registration
                <Link to="/registration" />
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu>
              <MenuItem onClick={handleLogout} icon={<FiLogOut size={42} />}>
                Logout
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Sidebar;
