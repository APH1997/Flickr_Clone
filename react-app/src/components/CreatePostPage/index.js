import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useState, useEffect } from "react"
import { createPhotoThunk } from "../../store/photos"


function CreatePostForm() {
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    const dispatch = useDispatch()
    const [caption, setCaption] = useState("")
    const [description, setDescription] = useState("")
    const [photo, setPhoto] = useState(null)
    const [photoPreview, setPhotoPreview] = useState(null)
    const [errors, setErrors] = useState({})

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
        setPhotoPreview(URL.createObjectURL(e.target.files[0]))
    }

    useEffect(() => {
        const errObj = {}
        if (!caption){
            errObj.caption = "Please caption your photo."
        }
        if (caption.length > 100){
            errObj.caption = "Caption must be less than 100 characters."
        }
        if (description && description.length > 500){
            errObj.description = "Description must not exceed 500 characters."
        }
        if (!photo){
            errObj.photo = "Please select a photo to upload"
        }

        if (Object.keys(errObj).length){
            setErrors(errObj)
        } else setErrors({})

    }, [caption, description, photo])


    const handleSubmit = (e) => {
        e.preventDefault()

        if (Object.keys(errors).length) return;
        alert("success!")


    }

    return (
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <div>
                <label>Caption</label>
                {errors.caption &&
                <p className="errors">{errors.caption}</p>
                }
                <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                />
            </div>
            <div>
                <label>Description</label>
                {errors.description &&
                <p className="errors">{errors.description}</p>
                }
                <textarea
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label>Upload Photo</label>
                {errors.photo &&
                <p className="errors">{errors.photo}</p>
                }
                <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}/>
                <img src={photoPreview} style={{width:"100px", height:"100px"}}/>
            </div>

            <button>Submit</button>

        </form>
    )
}

export default CreatePostForm
