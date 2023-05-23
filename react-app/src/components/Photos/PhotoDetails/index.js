import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { useEffect } from "react"
import { getAllPhotosThunk } from "../../../store/photos"
import "./index.css"
import AuthorControls from "../../Dashboard/AuthorControls"

function PhotoDetails(){
    const history = useHistory()
    const dispatch = useDispatch()
    const {photoId} = useParams()
    const allPhotos = useSelector((state) => state.photos.allPhotos)
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(getAllPhotosThunk())
    },[dispatch])

    if (!allPhotos) return null;
    const photo = allPhotos[photoId];
    return (
        <div>
            <div className="big-black-background-div">
                <div className="breadcrumb-to-dash-container">
                    <div onClick={() => history.push('/')}id="breadcrumb">
                        <i class="fas fa-arrow-left"></i>
                        <span>Back to feed</span>
                    </div>
                </div>
                <div id="main-photo-container">
                    <img id="photo-show-main-img"src={photo.url}></img>
                </div>
                <div className="specific" id="author-controls-container">
                    {user.id === photo.author.id &&
                        <AuthorControls photo={photo}/>
                    }
                </div>
            </div>
            <h2>Second div is a column of all comments</h2>
            <div className="dark-div">
                <h1>Make a comment card to map</h1>
            </div>
        </div>
    )
}

export default PhotoDetails
