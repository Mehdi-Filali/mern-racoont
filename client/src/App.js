import React, { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Profil from "./pages/Profil";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import NavigationMain from "./components/navigation/NavigationMain";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => setUid(res.data))
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <>
      <UidContext.Provider value={uid}>
        <BrowserRouter>
          <NavigationMain />
          <Routes>
            <Route path="/racoont-mern/home" element={<Home />} />
            <Route path="/racoont-mern/trending" element={<Trending />} />
            <Route path="/racoont-mern/profil" element={<Profil />} />
            <Route path="*" element={<Navigate to="/racoont-mern/home" />} />
          </Routes>
        </BrowserRouter>
      </UidContext.Provider>
    </>
  );
};

export default App;
