import { useParams } from "react-router-dom"
import ProfileNav from "./ProfileNav/index.js"
import UserPageBanner from "./UserPageBanner"
import "./index.css"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getProfileThunk } from "../../store/session.js"


function UserPage() {
    const {userId} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfileThunk(userId))
    }, [userId])

    return (
        <div className="user-page-main-container">
            <UserPageBanner />
            <ProfileNav />
        </div>

    )
}

export default UserPage
