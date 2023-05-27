import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deletePhotoThunk } from "../../store/photos"
import { useState } from "react"
import { useHistory } from "react-router-dom"


function DeletePostModal({photoId}){
    const history = useHistory()
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const [isDeleting, setIsDeleting] = useState(false)

    const handleYes = async () => {
        setIsDeleting(true)
        await dispatch(deletePhotoThunk(photoId))
        setTimeout(() => setIsDeleting(false), 500)
        history.push('/')
        closeModal()
    }


    return (
        <div className="delete-modal-content-container">
            <h2>Are you sure you want to remove this post?</h2>
            <div className="delete-yes-no-btns">
                <button onClick={() => handleYes()}>{isDeleting ? "Deleting..." : "Yes, delete it"}</button>
                <button onClick={() => closeModal()} disabled={isDeleting}>No</button>
            </div>
        </div>
    )
}

export default DeletePostModal
