import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deletePhotoThunk } from "../../store/photos"
import { useContext, useState } from "react"
import { authenticate } from "../../store/session"
import { ThunkHubContext } from "../../context/ThunkHub"
import { useHistory } from "react-router-dom"


function DeletePostModal({photoId}){
    const {setDestination} = useContext(ThunkHubContext)

    const history = useHistory()
    const { closeModal } = useModal()

    const dispatch = useDispatch()
    const [isDeleting, setIsDeleting] = useState(false)

    const handleYes = async () => {
        setIsDeleting(true)
        setDestination('/')
        history.push('/thunk/hub')
        await dispatch(deletePhotoThunk(photoId))
        setTimeout(() => setIsDeleting(false), 100)
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
