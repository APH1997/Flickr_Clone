import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deletePhotoThunk } from "../../store/photos"
import { useState } from "react"
import { useHistory } from "react-router-dom"



function DeletePostModal({photo}){
    const history = useHistory()
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const [isDeleting, setIsDeleting] = useState(false)


    async function handleYes() {
        setIsDeleting(true)
        await dispatch(deletePhotoThunk(photo.id))
        setTimeout(() => setIsDeleting(false), 1000)
        history.replace(`/`)
        closeModal()
    }

    if (!photo) return null;

    return (
        <div className="delete-modal-content-container">
            <h2>Are you sure you want to remove this post?</h2>
            <div className="delete-yes-no-btns">
                <button onClick={() => handleYes()}>{isDeleting ? "Deleting..." : "Yes, delete it"}</button>
                <button onClick={() => closeModal()} disabled={isDeleting}>Cancel</button>
            </div>
        </div>
    )
}

export default DeletePostModal
