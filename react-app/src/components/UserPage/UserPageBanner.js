import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProfileThunk } from "../../store/session"
import { useParams } from "react-router-dom"
import OpenModalButton from "../OpenModalButton"
import ProfileModal from "./EditProfileModal"
import Loader from "../Loader"


function UserPageBanner(){

    const dispatch = useDispatch()
    const {userId} = useParams()
    const pageOwner = useSelector(state => state.session.profilePageUser)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getProfileThunk(userId))
    }, [dispatch])

    if (!pageOwner) return <Loader/>;

    return (
        <div className="user-page-banner-container">
            <div className="banner-left-user-info">
                <div><img id="banner-profile-bubble"src={`${pageOwner.profile_picture_url}`}></img></div>
                <div id="user-names">
                    <div className="owner-name-and-controls">
                        <h3>{pageOwner.first_name} {pageOwner.last_name}</h3>
                        {pageOwner.id === user.id &&
                            <OpenModalButton
                            buttonText={<i className="fas fa-ellipsis-h"></i>}
                            modalComponent={<ProfileModal user={user}/>}
                            />
                        }
                    </div>
                    <div id="names-bottom">
                        <p>{pageOwner.username}</p>
                        <span>{pageOwner.photos.length} photos • {pageOwner.albums.length} albums</span>
                    </div>
                </div>

            </div>
            <div id="banner-shadow"></div>

                <img alt="" id="cover-photo" src={pageOwner.cover_photo_url}></img>

        </div>
    )
}

export default UserPageBanner
