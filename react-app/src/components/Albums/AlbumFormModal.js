import "./index.css"
import { useModal } from "../../context/Modal"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


function AlbumFormModal(){
    const dispatch = useDispatch()
    const {closeModal} = useModal();

    const user = useSelector(state => state.session.user)



    return(
        <div className="album-form-container">
            <h1>Create an album out of uploaded photos</h1>
            {(user.photos.length &&
                <form>
                    <h1>Form</h1>
                </form>
                ) || <h1>No photos!</h1>
            }
        </div>
    )
}

export default AlbumFormModal
