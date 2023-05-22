import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProfileThunk } from "../../store/session"
import { useParams } from "react-router-dom"

function UserPageBanner(){
    const dispatch = useDispatch()
    const {userId} = useParams()
    const pageOwner = useSelector(state => state.session.profilePageUser)

    useEffect(() => {
        dispatch(getProfileThunk(userId))
    }, [dispatch])

    if (!pageOwner) return null;

    return (
        <div className="user-page-banner-container">
            <div className="banner-left-user-info">
                <div>bubble</div>
                <div id="user-names">
                    <h3>{pageOwner.first_name} {pageOwner.last_name}</h3>
                    <div id="names-bottom">
                        <p>{pageOwner.username}</p>
                        <span>{pageOwner.photos.length} photos • {pageOwner.albums.length} albums</span>
                    </div>
                </div>

            </div>
            <img alt="" id="cover-photo" src={pageOwner.cover_photo_url}></img>
        </div>
    )
}

export default UserPageBanner
