import { NavLink } from "react-router-dom"

function CommentCard({comment}){

    return(
        <div className="comment-card-container">
            <div>
                <img id="comment-card-pro-pic" src={comment.author.profile_picture_url}></img>
            </div>
            <div className="comment-card-content">
                <NavLink to={`/users/${comment.author.id}`}>{comment.author.first_name} {comment.author.last_name}</NavLink>
                <div>{comment.content}</div>
            </div>
        </div>
    )
}

export default CommentCard
