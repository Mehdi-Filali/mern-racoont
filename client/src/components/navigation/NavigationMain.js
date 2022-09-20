import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "../AppContext";
import { FiLogIn } from "react-icons/fi";
import Logout from "../log/Logout";
import { useSelector } from "react-redux";

const NavigationMain = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink to={"/racoont-mern/home"}>
            <div className="logo">
              <img src="/img/icon.png" alt="icon" />
              <h3>Racoont</h3>
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink to={"/racoont-mern/profil"}>
                <h5>Salut {userData.pseudo}</h5>
                <img src={userData.picture} alt="user-pic" />
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink to={"/racoont-mern/profil"}>
                <FiLogIn />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavigationMain;
