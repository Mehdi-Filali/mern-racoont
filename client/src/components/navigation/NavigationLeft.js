import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { IoRocketOutline } from "react-icons/io5";
import { RiContactsLine } from "react-icons/ri";

const NavigationLeft = () => {
  return (
    <div className="left-nav-container">
      <ul className="icons">
        <div className="icons-bis">
          <NavLink
            to="/racoont-mern/home"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>
              <AiOutlineHome />
            </li>
          </NavLink>

          <NavLink
            to="/racoont-mern/trending"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>
              <IoRocketOutline />
            </li>
          </NavLink>

          <NavLink
            to="/racoont-mern/profil"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>
              <RiContactsLine />
            </li>
          </NavLink>
        </div>
      </ul>
    </div>
  );
};

export default NavigationLeft;
