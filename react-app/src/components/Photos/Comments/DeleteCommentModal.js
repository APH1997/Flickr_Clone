import { useModal } from "../../../context/Modal"
import { useDispatch } from "react-redux"
import { deleteCommentThunk, deleteReplyThunk } from "../../../store/photos"


function DeleteComment({commentId, photoId, reply}){
    const dispatch = useDispatch()
    const {closeModal} = useModal()

    async function handleYes(){
        if (!reply){
            await dispatch(deleteCommentThunk(photoId, commentId))
            closeModal()
        } else {
            await dispatch(deleteReplyThunk(commentId))
            closeModal()
        }
    }
    function handleNo(){
        closeModal()
    }

    return (
        <div className="delete-comment-modal-form">
            <h2>Delete {reply ? "Reply" : "Comment"}?</h2>
            <div className="delete-comment-buttons-container">
                <button onClick={handleYes}>Yes</button>
                <button onClick={handleNo}>No</button>
            </div>
        </div>
    )
}

export default DeleteComment
