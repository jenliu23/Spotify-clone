import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";

import { thunkAddFav, thunkDeleteFav } from "../../store/session";

import "./FavoriteIcon.css";

const FavoriteIcon = ({ sessionUser, listId, favType }) => {
  const dispatch = useDispatch();
  const ulRef = useRef();

  let [heartColor, setHeartColor] = useState("");

  if (!sessionUser) heartColor = "";

  if (sessionUser && sessionUser[favType]) {
    for (let favId of sessionUser[favType]) {
      if (favId == listId) heartColor = "green-heart";
    }
  }

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    
  }, [heartColor]);

  const handleFavorite = async () => {

    if (heartColor == "green-heart") {
      await dispatch(thunkDeleteFav(listId, sessionUser.id, favType));
      setHeartColor("");
    } else if (heartColor == "") {
      await dispatch(thunkAddFav(listId, sessionUser.id, favType));
      setHeartColor("green-heart");
    }
  };

  return (
    <div>
      {!sessionUser ? (
        <OpenModalButton
          buttonText={
            <div className="favorite">
              <i
                className={
                  heartColor ? "fa-solid fa-heart" : "fa-regular fa-heart"
                }
              />
            </div>
          }
          onItemClick={closeMenu}
          modalComponent={<LoginFormModal />}
        />
      ) : (
        <button onClick={handleFavorite} className={heartColor+ " favIcon"}>
          <i
            className={
              heartColor
                ? "fa-solid fa-heart fa-lg"
                : "fa-regular fa-heart fa-lg"
            }
          />
        </button>
      )}
    </div>
  );
};

export default FavoriteIcon;
