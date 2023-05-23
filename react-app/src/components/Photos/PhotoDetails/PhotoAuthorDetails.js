import { NavLink } from "react-router-dom";
import { usePhoto } from "../../../context/Photo";


function PhotoAuthorDetails(){
    const {photo} = usePhoto()
    if (!photo) return null;
    
    return (
        <div className="photo-author-details-card">
            <div style={{height:"100%"}}>
                <img id="comments-head-author-head"src={photo.author.profile_picture_url}/>
            </div>
            <div className="photo-caption-author-name">
                <NavLink to={`/users/${photo.author.id}`}id="comments-photo-author-name">{photo.author.first_name} {photo.author.last_name}</NavLink>
                <div id="comments-photo-caption">{photo.caption}</div>
                <div>{photo.description}</div>
            </div>
        </div>
    )
}

export default PhotoAuthorDetails
