import OpenModalButton from "../OpenModalButton";
import DeletePostModal from "../Photos/DeletePostModal";
import { NavLink } from "react-router-dom";

function AuthorControls({photo}){
    return(
        <div>
            <OpenModalButton
            buttonText="Delete"
            modalComponent={<DeletePostModal photoId={photo.id}/>}
            />

            <NavLink to={`/photos/${photo.id}/edit`}>Edit</NavLink>
        </div>
    )
}

export default AuthorControls
