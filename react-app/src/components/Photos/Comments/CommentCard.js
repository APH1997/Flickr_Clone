import { NavLink } from "react-router-dom"
import OpenModalButton from "../../OpenModalButton"
import DeleteComment from "./DeleteCommentModal"
import { useSelector } from "react-redux"
import { usePhoto } from "../../../context/Photo"
import { useState } from "react"
import EditComment from "./EditCommentForm"



function CommentCard({ comment }) {
    const user = useSelector((state) => state.session.user)
    const [isEditing, setIsEditing] = useState(false)
    const { photo } = usePhoto()
    return (
        <div className="comment-card-container">
            <div className="comment-card-content-container">
                <div>
                    <img id="comment-card-pro-pic" src={comment.author.profile_picture_url}></img>

                </div>
                <div className="comment-card-content">
                    <NavLink to={`/users/${comment.author.id}`}>{comment.author.first_name} {comment.author.last_name}</NavLink>
                    <div>
                        {!isEditing && comment.content}
                        {isEditing && <EditComment content={comment} setIsEditing={setIsEditing}/>}
                    </div>
                </div>
            </div>
            {user.id === comment.author.id &&
                <div className="delete-comment-modal-button">
                    <button>
                        <i className="fas fa-edit" onClick={() => setIsEditing(!isEditing)}></i>
                    </button>
                    <OpenModalButton
                        buttonText={<i className="fas fa-trash-alt"></i>}
                        modalComponent={
                            <DeleteComment
                                commentId={comment.id}
                                photoId={photo.id}
                            />
                        }
                    />
                </div>
            }
        </div>
    )
}

export default CommentCard
