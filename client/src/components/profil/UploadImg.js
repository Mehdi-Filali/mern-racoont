import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";
import { isEmpty } from "../../utils/Utils";

const UploadImg = () => {
  const [file, setFile] = useState();
  const [profilPicture, setProfilPicture] = useState(null);
  const [updateImg, setUpdateImg] = useState(false);

  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.userError);
  const dispatch = useDispatch();

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("userId", userData._id);
    data.append("name", userData.pseudo);
    data.append("file", file);

    dispatch(uploadPicture(data, userData._id));
    setFile("");
    setProfilPicture(userData.picture);
    setUpdateImg(false);
  };

  const setNewPicture = (e) => {
    setFile(e.target.files[0]);
    setProfilPicture(URL.createObjectURL(e.target.files[0]));
    setUpdateImg(!updateImg);
  };

  return (
    <div className="left-part">
      <h3>Photo de profil</h3>

      {updateImg === false && (
        <>
          <img src={userData.picture} alt="user-pic" />
          <div>
            <div className="upload-pic">
              <label htmlFor="file">Changer l'image</label>
              <input
                type="file"
                id="file"
                name="file"
                accept=".jpg, .png, .jpeg"
                onChange={(e) => setNewPicture(e)}
              />
              {/* <br /> */}
              {/* <button onClick={() => setUpdateImg(!updateImg)}>
                Changer l'image
              </button> */}
            </div>
          </div>
        </>
      )}
      {updateImg && (
        <>
          <img src={profilPicture} alt="user-pic" />
          <div>
            <div
              // onSubmit={handlePicture}
              // encType="multipart/form-data"
              className="upload-pic"
            >
              <button onClick={handlePicture}>Valider les modifications</button>
              {/* <input type="submit" value="Valider la modification" /> */}
            </div>
          </div>
        </>
      )}
      {!isEmpty(error.format) && <p>{error.format}</p>}
      {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
    </div>
  );
};

export default UploadImg;
