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
            <img src={pageOwner.cover_photo_url}></img>
        </div>
    )
}

export default UserPageBanner
