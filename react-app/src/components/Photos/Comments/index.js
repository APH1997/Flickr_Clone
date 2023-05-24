import { usePhoto } from "../../../context/Photo";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

function CommentSection(){
    const {photo} = usePhoto()

    if (!photo) return null;

    return(
        <div className="comment-section-container">
            {photo.comments.map((comment) =>
                <CommentCard comment={comment}/>
            )}
            <CommentForm />
        </div>
    )
}

export default CommentSection
