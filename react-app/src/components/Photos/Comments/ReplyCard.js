import { NavLink } from "react-router-dom"

function ReplyCard({ reply }) {
    return (
        <div className="comment-card-container reply-container">
            <div className="comment-card-content-container">
                <div>
                    <img id="comment-card-pro-pic" src={reply.author.profile_picture_url}></img>
                </div>
                <div className="comment-card-content">
                    <NavLink to={`/users/${reply.author.id}`}>{reply.author.first_name} {reply.author.last_name}</NavLink>
                    <div className="comment-reply-content-container">
                        {reply.content}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReplyCard
