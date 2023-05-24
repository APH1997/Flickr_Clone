import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);


  async function handlePhotoNav(){
    closeMenu()
    setTimeout(() => history.push('/photos/new'), 300)
  }
  async function handleAlbumNav(){
    closeMenu()
    setTimeout(() => history.push('/albums/new'), 300)

  }
  async function handleProfileNav(){
    closeMenu();
    setTimeout(() => history.push(`/users/${user.id}`), 300)

  }
  return (
    <>
      <button id="profile-dropdown-button" onClick={openMenu}>
        <i className="fas fa-bars"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li id="hello-li">Hello, {user.username}!</li>
            <li onClick={() => handleProfileNav()}>Profile</li>
            <li onClick={() => handleAlbumNav()}>
								<i className="fas fa-folder-plus"></i>
								Create Album
            </li>
            <li onClick={() => handlePhotoNav()}>
								<i className="fas fa-cloud-upload-alt"></i>
                Upload Photo
            </li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
