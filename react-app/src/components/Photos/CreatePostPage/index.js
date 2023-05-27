import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { createPhotoThunk, updatePhotoThunk } from "../../../store/photos"
import "../index.css"
import { authenticate } from "../../../store/session"
import { useModal } from "../../../context/Modal"

function PostForm({ post }) {
    const { closeModal } = useModal()
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    const dispatch = useDispatch()
    const [caption, setCaption] = useState(post ? post.caption : "")
    const [description, setDescription] = useState(post ? post.description : "")
    const [photo, setPhoto] = useState(null)
    const [photoPreview, setPhotoPreview] = useState(post ? post.url : null)
    const [isUploading, setIsUploading] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [errors, setErrors] = useState({})

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
        setPhotoPreview(URL.createObjectURL(e.target.files[0]))
    }

    useEffect(() => {
        const errObj = {}
        if (!caption) {
            errObj.caption = "Please caption your photo."
        }
        if (caption.length > 100) {
            errObj.caption = "Caption must be less than 100 characters."
        }
        if (description && description.length > 500) {
            errObj.description = "Description must not exceed 500 characters."
        }
        if (!post && !photo) {
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

        if (post) {
            const formData = new FormData();
            formData.append("author_id", user.id);
            photo && formData.append("photo", photo);
            formData.append("caption", caption);
            formData.append("description", description)

            setIsUploading(true);
            await dispatch(updatePhotoThunk(post.id, formData))

            //reload user with updated photos
            setTimeout(() => {
                dispatch(authenticate())
            }, 1000)

            setTimeout(() => {
                setIsUploading(false);
            }, 1000)
            setHasSubmitted(false)
            closeModal()
            history.push(`/photos/${post.id}`);

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
            <form className="photo-form" encType="multipart/form-data" onSubmit={handleSubmit} method={post ? "PUT" : "POST"}>
                <div className="photo-form-left-side">
                    <div className="photo-form-left-upper">
                        <div className="photo-form-section1">
                            <label>Caption{hasSubmitted && errors.caption ? <span style={{color:"red"}}>*</span>:''}</label>
                            <input
                                type="text"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                            />
                        </div>

                        <div className="photo-form-section2">
                            <label>Description{hasSubmitted && errors.description ? <span style={{color:"red"}}>*</span>:''}</label>
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
                        <p className="errors">{error}</p>)
                    }
                </div>
                <div className="photo-form-section3">
                    <label className="upload-photo-input">Upload Photo {hasSubmitted && errors.photo ? <span style={{color:"red"}}>*</span>:''}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange} />
                    <img alt="" src={photoPreview} style={{ width: "400px", height: "400px" }}/>
                    </label>
                </div>
            </form>
        </div>
    )
}

export default PostForm
