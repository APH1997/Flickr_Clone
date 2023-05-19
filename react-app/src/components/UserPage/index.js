import ProfileNav from "./ProfileNav"
import UserPageBanner from "./UserPageBanner"
import "./index.css"


function UserPage() {
    return (
        <div className="user-page-main-container">
            <UserPageBanner />
            <ProfileNav />
        </div>

    )
}

export default UserPage
