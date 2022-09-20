import React, { useContext } from "react";
import { useSelector } from "react-redux";
import NavigationLeft from "../components/navigation/NavigationLeft";
import Trends from "../components/Trends";
import Card from "../components/post/Card";
import { UidContext } from "../components/AppContext";
import FriendsHint from "../components/profil/FriendsHint";
import { isEmpty } from "../utils/Utils";

const Trending = () => {
  const uid = useContext(UidContext);
  const trendList = useSelector((state) => state.trendingReducer);

  return (
    <div className="trending-page">
      <NavigationLeft />
      <div className="main">
        <ul>
          {!isEmpty(trendList[0]) &&
            trendList.map((post) => <Card post={post} key={post._id} />)}
        </ul>
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <Trends />
          {uid && <FriendsHint />}
        </div>
      </div>
    </div>
  );
};

export default Trending;
