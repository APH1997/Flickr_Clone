import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { useEffect } from "react"
import { getAllPhotosThunk } from "../../../store/photos"
import "./index.css"
import AuthorControls from "../../Dashboard/AuthorControls"
import CommentSection from "../Comments"
import { usePhoto } from "../../../context/Photo"
import PhotoAuthorDetails from "./PhotoAuthorDetails"

function PhotoDetails(){
    //history has location.state based on
    //if user gets here from album,feed, or userpage
    const {setPhoto} = usePhoto()
    const history = useHistory()
    const dispatch = useDispatch()
    const {photoId} = useParams()
    const allPhotos = useSelector((state) => state.photos.allPhotos)
    const user = useSelector((state) => state.session.user)


    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    useEffect(() => {
        dispatch(getAllPhotosThunk())
    },[dispatch])

    if (!allPhotos) return null;
    const photo = allPhotos[photoId];
    //SET PHOTO CONTEXT HERE
    setPhoto(photo)


    function breadCrumbTrail(){
        //based on history object, will render different text :D)
        switch (history.location.state?.from) {
            case "FEED":{
                return "Back to feed"
            }
            case "ALBUM":{
                return "Back to album"
            }
            case "PROFILE":{
                return "Back to profile"
            }

            default:{
                return "Back"
            }
        }
    }

    function followBreadCrumbs(){
        if (breadCrumbTrail() === "Back"){
            history.push('/')
        } else {
            history.goBack()
        }
    }
    return (
        <div>
            <div className="big-black-background-div">
                <div className="breadcrumb-to-dash-container">
                    <div onClick={() => followBreadCrumbs()} id="breadcrumb">
                        <i class="fas fa-arrow-left"></i>
                        <span>{breadCrumbTrail()}</span>
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
            <div className="big-white-background-div">
                <div className="photo-author-details-component">
                    <PhotoAuthorDetails />
                </div>
                <div className="photo-comments-component">
                    <CommentSection/>
                </div>
            </div>
        </div>
    )
}

export default PhotoDetails
