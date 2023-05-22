import "./index.css"
import { useModal } from "../../context/Modal"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { ThunkHubContext } from "../../context/ThunkHub";
import { createAlbumThunk } from "../../store/photos";
import { updateAlbumThunk } from "../../store/albums";

function AlbumFormModal({album}){
    const {setDestination} = useContext(ThunkHubContext)
    // if album is defined, then it is an edit form
    const history = useHistory();
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const [title, setTitle] = useState(album ? album.title : '')
    const [description, setDescription] = useState(album ? album.description : '')
    /*
    If editing an album, need to convert album.pics to an array of ids
    */
    const editIds = []
    if (album){
        for (let pic of album.pics){
            editIds.push(pic.id.toString())
        }
   }
    const [photos, setPhotos] = useState(album ? editIds : [])

    const [isLoading, setIsLoading] = useState(false)
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
        // This function is used to conditionally render check graphic
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


    async function handleSubmit(e){
        e.preventDefault()

        if (Object.keys(errors).length) return;

        setIsLoading(true);

        const photoArr = photos.join(',')
        const albumData = {
            author_id: user.id,
            photos: photoArr,
            title,
            description
        }

        //If album is defined, this should be an edit
        if (album){
            await dispatch(updateAlbumThunk(album.id, albumData))

            setTimeout(() => setIsLoading(false), 3000)

            closeModal();
            setDestination(`/albums/${album.id}`)
            history.push(`/thunk/hub`)

        } else {
            const data = await dispatch(createAlbumThunk(albumData))
            //{newAlbumId: #}

            setTimeout(() => setIsLoading(false), 3000)
            closeModal();
            setDestination(`/albums/${data.newAlbumId}`)
            history.push(`/thunk/hub`)
        }
    }


    return(
        <div className="album-form-container">
            {(user.photos.length &&
            <div>
                <h1>{album ? "Update Album":"Create an album out of uploaded photos"}</h1>
                    <form onSubmit={handleSubmit} method={album ? "PUT" : "POST"}>
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
                                        checked={isThisSelected(photo.id)}
                                        value={photo.id}
                                        onChange={handleCheckBox}
                                        />
                                    </label>
                                </div>
                                )}
                                {errors.photos && <p className="errors">{errors.photos}</p>}
                            </div>
                        </div>
                        <button disabled={isLoading}>{isLoading ? "loading..." : "Submit"}</button>
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
