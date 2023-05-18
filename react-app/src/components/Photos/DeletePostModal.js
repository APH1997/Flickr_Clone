import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deletePhotoThunk } from "../../store/photos"


function DeletePostModal({photoId}){
    const { closeModal } = useModal()
    const dispatch = useDispatch()

    const handleYes = async () => {
        await dispatch(deletePhotoThunk(photoId))
        closeModal()
    }


    return (
        <div>
            <h2>Are you sure you want to remove this post?</h2>
            <button onClick={handleYes}>Yes</button>
            <button onClick={() => closeModal()}>No</button>
        </div>
    )
}

export default DeletePostModal
