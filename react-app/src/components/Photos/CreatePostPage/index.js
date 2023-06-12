import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { createPhotoThunk, updatePhotoThunk } from "../../../store/photos"
import "../index.css"
import { authenticate } from "../../../store/session"
import { useModal } from "../../../context/Modal"

function PostForm({ type }) {
    const { closeModal } = useModal()
    const {photoId} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const allPhotos = useSelector(state => state.photos.allPhotos)
    const [caption, setCaption] = useState(type ? allPhotos[photoId].caption : "")
    const [description, setDescription] = useState(type ? allPhotos[photoId].description : "")
    const [photo, setPhoto] = useState(null)
    const [photoPreview, setPhotoPreview] = useState(type ? allPhotos[photoId].url : null)
    const [isUploading, setIsUploading] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [errors, setErrors] = useState({})
    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
        setPhotoPreview(URL.createObjectURL(e.target.files[0]))
    }

    useEffect(() => {
        const errObj = {}
        if (!caption || !caption.trim()) {
            errObj.caption = "Please caption your photo."
        }

        if (caption.length > 100) {
            errObj.caption = "Caption must be less than 100 characters."
        }
        if (description && description.length > 500) {
            errObj.description = "Description must not exceed 500 characters."
        }
        if (!type && !photo) {
            errObj.photo = "Please select a photo to upload."
        }

        if (Object.keys(errObj).length) {
            setErrors(errObj)
        } else setErrors({})

    }, [caption, description, photo])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)
        if (Object.keys(errors).length) return;

        if (type) {
            const formData = new FormData();
            formData.append("author_id", user.id);
            photo && formData.append("photo", photo);
            formData.append("caption", caption);
            formData.append("description", description.trim())

            setIsUploading(true);
            await dispatch(updatePhotoThunk(photoId, formData))

            //reload user with updated photos
            setTimeout(() => {
                dispatch(authenticate())
            }, 1000)

            setTimeout(() => {
                setIsUploading(false);
            }, 1000)
            setHasSubmitted(false)
            closeModal()
            history.push(`/photos/${photoId}`);

        } else {

            const formData = new FormData();
            formData.append("author_id", user.id);
            formData.append("photo", photo);
            formData.append("caption", caption);
            formData.append("description", description)

            setIsUploading(true);
            const newPhoto = await dispatch(createPhotoThunk(formData));

            setTimeout(() => {
                setIsUploading(false);
            }, 1000);
            closeModal()
            setHasSubmitted(false)
            history.push(`/photos/${newPhoto.id}`)
        }

    }

    return (
        <div className="photo-form-container">
            <h1>{type ? "Edit your post" : "Upload a Photo"}</h1>
            <form className="photo-form" encType="multipart/form-data" onSubmit={handleSubmit} method={type ? "PUT" : "POST"}>
                <div className="photo-form-left-side">
                    <div className="photo-form-left-upper">
                        <div className="photo-form-section1">
                            <label>{type ? "Edit Caption" : "Caption"}{hasSubmitted && errors.caption ? <span style={{color:"red"}}>*</span>:''}</label>
                            <input
                                type="text"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                            />
                        </div>

                        <div className="photo-form-section2">
                            <label>{type ? "Edit Description" : "Description"}{hasSubmitted && errors.description ? <span style={{color:"red"}}>*</span>:''}</label>
                            <textarea
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <button disabled={isUploading}>{isUploading ? "Uploading..." : "Submit"}</button>
                    {hasSubmitted && Object.values(errors).length > 0 &&
                        Object.values(errors).map((error) =>
                        <p className="errors">*{error}</p>)
                    }
                </div>
                <div className="photo-form-section3">
                    <label className="upload-photo-input">
                        {type ? "Click to upload a different file" : ""}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange} />
                    <div className="photo-form-preview-container">
                        <span className="photo-form-preview-text" id={photoPreview ? "hide-text" : ""}>
                            {hasSubmitted && errors.photo ?
                            <span style={{color:"red", textDecoration:"none"}}>*</span> : ''}SELECT AN IMAGE FOR UPLOAD</span>
                        <img id="photo-form-preview" alt="" src={photoPreview}/>
                    </div>
                    </label>
                </div>
            </form>
        </div>
    )
}

export default PostForm
