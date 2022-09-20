import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";

const DeleteCard = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () => dispatch(deletePost(props.id));

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez vous supprimer cet article ?! 🫣")) {
          deleteQuote();
        }
      }}
    >
      <AiOutlineDelete />
    </div>
  );
};

export default DeleteCard;
