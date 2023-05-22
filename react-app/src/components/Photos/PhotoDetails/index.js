import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { getAllPhotosThunk } from "../../../store/photos"
import "./index.css"

function PhotoDetails(){
    const dispatch = useDispatch()
    const {photoId} = useParams()
    const allPhotos = useSelector((state) => state.photos.allPhotos)


    useEffect(() => {
        dispatch(getAllPhotosThunk())
    },[dispatch])

    if (!allPhotos) return null;
    const photo = allPhotos[photoId];
    return (
        <div>
            <div className="big-black-background-div">
                <div id="breadcrumb-to-dash">
                    <i class="fas fa-arrow-left"></i>
                    <span>Back to feed</span>
                </div>
                <div><img src={photo.url}></img></div>
                <div>author controls</div>
            </div>
            <h2>Second div is a column of all comments</h2>
            <div className="dark-div">
                <h1>Make a comment card to map</h1>
            </div>
        </div>
    )
}

export default PhotoDetails
