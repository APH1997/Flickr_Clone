import { usePhoto } from "../../../context/Photo"
import CommentCard from "./CommentCard"

function CommentSection(){
    const {photo} = usePhoto()

    if (!photo) return null;

    return(
        <div className="comment-section-container">
            {photo.comments.map((comment) =>
                <CommentCard comment={comment}/>
            )}
        </div>
    )
}

export default CommentSection
