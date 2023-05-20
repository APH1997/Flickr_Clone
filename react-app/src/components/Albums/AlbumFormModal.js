import "./index.css"
import { useModal } from "../../context/Modal"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";


function AlbumFormModal(){
    const history = useHistory();
    const dispatch = useDispatch();

    const {closeModal} = useModal();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [photos, setPhotos] = useState([])

    const [errors, setErrors] = useState({})

    const user = useSelector(state => state.session.user)

    function handleNoPhotoClick() {
        closeModal()
        history.push('/photos/new')
    }

    function handleCheckBox(e){
        if (e.target.checked) {
            setPhotos([
                ...photos, e.target.value
            ])
        } else {
            setPhotos(
                photos.filter((photo) => photo !== e.target.value)
            )
        }
    }

    function isThisSelected(id){
        return photos.includes(id.toString())
    }

    useEffect(() => {
        const errObj = {}
        if (!title){
            errObj.title = "Albums must have a title"
        }
        if (description && description.length > 500){
            errObj.description = "Description cannot exceed 500 characters."
        }
        if (!photos.length){
            errObj.photos = "Please select at least one photo"
        }

        if (Object.keys(errObj).length){
            setErrors(errObj)
        } else setErrors({})

    }, [title, description, photos.length])

    function handleSubmit(e){
        e.preventDefault()

        if (Object.keys(errors).length) return;

    }

    return(
        <div className="album-form-container">
            {(user.photos.length &&
            <div>
                <h1>Create an album out of uploaded photos</h1>
                    <form onSubmit={handleSubmit} method="POST">
                        <h1>Create an album</h1>
                        <div>
                            <label>Title</label>
                            <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                            {errors.title && <p className="errors">{errors.title}</p>}
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            />
                            {errors.description && <p className="errors">{errors.description}</p>}
                        </div>
                        <div>
                            <label>Choose photos</label>
                            <div className="image-select-card-container">
                            {user.photos.map(photo =>
                                <div className="image-select-card">
                                    <label>
                                        <div className={isThisSelected(photo.id) ? "selected-photo" : "unselected-photo"} style={{height: "100px", width: "100px"}}>
                                            <i class="fas fa-check"></i>
                                        </div>
                                        <img className="image-card-image" style={{height: "100px", width: "100px"}} src={photo.url}></img>
                                        <input
                                        type="checkbox"
                                        name='photo'
                                        value={photo.id}
                                        onChange={handleCheckBox}
                                        />
                                    </label>
                                </div>
                                )}
                                {errors.photos && <p className="errors">{errors.photos}</p>}
                            </div>
                        </div>
                        <button>Submit</button>
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
