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
        <div>
            <h2>Delete comment?</h2>
            <button onClick={handleYes}>Yes</button>
            <button onClick={handleNo}>No</button>
        </div>
    )
}

export default DeleteComment
