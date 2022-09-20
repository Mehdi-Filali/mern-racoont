import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import NavigationLeft from "../components/navigation/NavigationLeft";
import NewPostForm from "../components/post/NewPostForm";
import Thread from "../components/Thread";
import Log from "../components/log";
import Trends from "../components/Trends";
import FriendsHint from "../components/profil/FriendsHint";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div className="home">
      <NavigationLeft />
      <div className="main">
        <div className="home-header">
          {uid ? <NewPostForm /> : <Log signup={false} signin={true} />}
        </div>
        <Thread />
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            <Trends />
            {uid && <FriendsHint />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
