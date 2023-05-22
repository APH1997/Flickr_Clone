import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import OpenModalButton from "../OpenModalButton"
import DeletePostModal from "../Photos/DeletePostModal"
import AuthorControls from "./AuthorControls"

function ContentCard({photo}){
    const user = useSelector(state => state.session.user)

    return (
        <div className="content-card">
            <div className="cc-poster-info">
                <div className="username-and-pro-pic">
                    <img id="" alt="" src={photo.author.profile_picture_url}></img>
                    <p>{photo.author.username}</p>
                </div>

                {user.id === photo.author.id &&
                    <AuthorControls photo={photo}/>
                }

            </div>
            <img alt="" id="photo" src={photo.url}></img>
            <p id="photo-caption">{photo.caption}</p>
            <div className="description-and-comments">
                <p>{photo.description}</p>
                <p id="comments-button">{photo.comments.length} comments</p>
            </div>

        </div>
    )
}

export default ContentCard
