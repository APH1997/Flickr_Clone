import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useState, useEffect } from "react"


function CreatePostForm() {
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    const dispatch = useDispatch()
    const [caption, setCaption] = useState("")
    const [description, setDescription] = useState("")
    const [photo, setPhoto] = useState(null)
    const [photoPreview, setPhotoPreview] = useState(null)

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
        setPhotoPreview(URL.createObjectURL(e.target.files[0]))
    }

    return (
        <form encType="multipart/form-data">
            <div>
                <label>Caption</label>
                <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                />
            </div>
            <div>
                <label>Description</label>
                <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label>Upload Photo</label>
                <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}/>
                <img src={photoPreview} style={{width:"100px", height:"100px"}}/>
            </div>

        </form>
    )
}

export default CreatePostForm
