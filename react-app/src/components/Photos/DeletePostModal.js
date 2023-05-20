import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deletePhotoThunk } from "../../store/photos"
import { useState } from "react"
import { authenticate } from "../../store/session"


function DeletePostModal({photoId}){
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const [isDeleting, setIsDeleting] = useState(false)

    const handleYes = async () => {
        setIsDeleting(true)
        await dispatch(deletePhotoThunk(photoId))

        //update session store
        setTimeout(() => dispatch(authenticate()), 1000)
        setTimeout(() => setIsDeleting(false), 1000)

        closeModal()
    }


    return (
        <div>
            <h2>Are you sure you want to remove this post?</h2>
            <button onClick={handleYes}>{isDeleting ? "Deleting..." : "Yes"}</button>
            <button onClick={() => closeModal()} disabled={isDeleting}>No</button>
        </div>
    )
}

export default DeletePostModal
