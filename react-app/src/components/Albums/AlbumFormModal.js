import "./index.css"
import { useModal } from "../../context/Modal"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";


function AlbumFormModal(){
    const history = useHistory()
    const dispatch = useDispatch()
    const {closeModal} = useModal();

    const user = useSelector(state => state.session.user)


    function handleNoPhotoClick() {
        closeModal()
        history.push('/photos/new')
    }
    return(
        <div className="album-form-container">
            {(user.photos.length &&
            <div>
                <h1>Create an album out of uploaded photos</h1>
                    <form>
                        <h1>Form</h1>
                    </form>
            </div>)
            //If no photos, redirect to upload photos
            ||
                <div>
                    <h2>Hm...</h2>
                    <h3>You don't have any photos yet!</h3>
                    <div onClick={handleNoPhotoClick}>Click here to upload some!</div>
                </div>

            }
        </div>
    )
}

export default AlbumFormModal
