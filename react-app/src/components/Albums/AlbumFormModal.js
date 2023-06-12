import "./index.css"
import { useModal } from "../../context/Modal"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { createAlbumThunk, getAllPhotosThunk } from "../../store/photos";
import { updateAlbumThunk } from "../../store/albums";
import NoPhotos from "../UserPage/ProfileNav/NoPhotos";

function AlbumFormModal({album}){
    // if album is defined, then it is an edit form
    const history = useHistory();
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const [title, setTitle] = useState(album ? album.title : '')
    const [description, setDescription] = useState(album ? album.description : '')
    const [hasSubmitted, setHasSubmitted] = useState(false)
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
    const allPhotos = useSelector(state => state.photos.allPhotos)

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
        if (title && title.length > 100){
            errObj.title = "Album titles cannot exceed 100 characters"
        }
        if (!title.trim()){
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
        setHasSubmitted(true)

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
            history.push(`/albums/${album.id}`)

        } else {
            const data = await dispatch(createAlbumThunk(albumData))
            //{newAlbumId: #}

            setTimeout(() => setIsLoading(false), 3000)
            closeModal();
            history.push(`/albums/${data.newAlbumId}`)
        }
    }
    if (!allPhotos){
        dispatch(getAllPhotosThunk())
        return null;
    }
    const userPhotos = Object.values(allPhotos).filter((pic) => pic.author.id === user.id)
    return(
        <div className="album-form-container">
            {(userPhotos.length &&
            <div>
                <h1>{album ? "Update Album":"Create an album from your uploaded photos"}</h1>
                    <form onSubmit={handleSubmit} method={album ? "PUT" : "POST"}>
                        <div className="album-form-left-half">
                            <div className="album-title-input">
                                <label>
                                    {errors.title && hasSubmitted ? <span style={{color:"red"}}>*</span> : ""}
                                    Title</label>
                                <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="album-desc-input">
                                <label>
                                {errors.description && hasSubmitted ? <span style={{color:"red"}}>*</span> : ""}
                                    Description</label>
                                <textarea
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <button disabled={isLoading}>{isLoading ? "loading..." : "Submit"}</button>
                            {Object.values(errors).length > 0 &&
                            hasSubmitted &&
                            Object.values(errors).map((error) =>
                                <p className="errors">*{error}</p>)}
                        </div>
                        <div className="album-form-right-half">
                            <label>
                            {errors.photos && hasSubmitted ? <span style={{color:"red"}}>*</span> : ""}
                                Choose photos</label>
                            <div className="image-select-card-container">
                            {userPhotos.map(photo =>
                                <div className="image-select-card">
                                    <label>
                                        <div className={isThisSelected(photo.id) ? "selected-photo" : "unselected-photo"} style={{height: "100px", width: "100px"}}>
                                            <i class="fas fa-check"></i>
                                        </div>
                                        <img alt="" className="image-card-image" style={{height: "100px", width: "100px"}} src={photo.url}></img>
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
                            </div>
                        </div>
                    </form>
            </div>)
            //If no photos, redirect to upload photos
            ||
                <div>
                    <NoPhotos />
                </div>

            }
        </div>
    )
}

export default AlbumFormModal
