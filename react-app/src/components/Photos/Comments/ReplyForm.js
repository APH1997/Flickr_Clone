import { useSelector } from "react-redux"

function ReplyForm() {
    const user = useSelector(state => state.session.user)
    if (!user) return null;
    return (
        <div className="comment-card-container reply-container">
            <div className="comment-card-content-container">
                <div>
                    <img id="comment-card-pro-pic" src={user.profile_picture_url}></img>
                </div>
                <div className="comment-card-content">
                    <div>{user.first_name} {user.last_name}</div>
                    <form>
                        <textarea></textarea>
                    </form>
                </div>
            </div>
        </div>





    )
}

export default ReplyForm
