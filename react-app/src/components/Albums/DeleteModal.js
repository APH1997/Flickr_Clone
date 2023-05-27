import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { useHistory } from "react-router-dom"
import { deleteAlbumThunk } from "../../store/albums"
import { useState } from "react"
import { useContext } from "react"
import { getProfileThunk } from "../../store/session"

function DeleteAlbumModal({album}){
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const history = useHistory()
    const [isDeleting, setIsDeleting] = useState(false)

    async function handleDelete(){
        setIsDeleting(true)
        await dispatch(deleteAlbumThunk(album.id))
        await dispatch(getProfileThunk(album.author.id))

        closeModal();
        setTimeout(() => setIsDeleting(false), 1500)
        history.push(`/users/${album.author.id}`)

    }
    return (
        <div className="delete-album-modal">
            <h2>Are you sure want to delete this album?</h2>
            <h3>{album.title}: {album.pics.length} photo(s)</h3>
            <p>Photos within this album will NOT be deleted</p>

            <div className="delete-album-modal-btns">
                <button onClick={() => handleDelete()}>
                    {isDeleting ? "Deleting..." : "Yes, delete it"}
                </button>
                <button onClick={() => closeModal()}>
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default DeleteAlbumModal
