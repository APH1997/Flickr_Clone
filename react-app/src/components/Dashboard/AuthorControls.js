import { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import DeletePostModal from "../Photos/DeletePostModal";
import { NavLink, useHistory } from "react-router-dom";
import UpdatePostForm from "../Photos/UpdatePostPage";

function AuthorControls({photo}){
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)){
                setShowMenu(false);
            }
        }

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu)
    })

    const ulClassName = "author-controls-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false)

    return(
        <div onClick={(e) => e.stopPropagation()}>
            <button id="open-author-controls-btn"onClick={openMenu}>
                <i className="fas fa-ellipsis-h"></i>
            </button>
            <ul className={ulClassName} ref={ulRef}>
                <li>
                    <OpenModalButton
                    buttonText="Edit"
                    onItemClick={closeMenu}
                    modalComponent={<UpdatePostForm post={photo}/>}
                    />
                </li>
                <li>
                    <OpenModalButton
                    buttonText="Delete"
                    onItemClick={closeMenu}
                    modalComponent={<DeletePostModal photoId={photo.id}/>}
                    />
                </li>
            </ul>
        </div>
    )
}

export default AuthorControls
