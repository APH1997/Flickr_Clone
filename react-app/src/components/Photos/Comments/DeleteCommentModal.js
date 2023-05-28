import { useModal } from "../../../context/Modal"
import { useDispatch } from "react-redux"
import { deleteCommentThunk } from "../../../store/photos"


function DeleteComment({commentId, photoId}){
    const dispatch = useDispatch()
    const {closeModal} = useModal()

    async function handleYes(){
        await dispatch(deleteCommentThunk(photoId, commentId))
        closeModal()
    }
    function handleNo(){
        closeModal()
    }

    return (
        <div className="delete-comment-modal-form">
            <h2>Delete comment?</h2>
            <div className="delete-comment-buttons-container">
                <button onClick={handleYes}>Yes</button>
                <button onClick={handleNo}>No</button>
            </div>
        </div>
    )
}

export default DeleteComment
