import { useSelector } from "react-redux"

function AboutTab(){
    const pageOwner = useSelector(state => state.session.profilePageUser)
    const user = useSelector(state => state.session.user)
    return (
        <div id="userpage-bio-box">
            <div>
                <h3 id="about-me-h3">
                {user.id === pageOwner.id &&
                    <i className="fas fa-edit"></i>
                }
                About Me...</h3>
            </div>
            <p id="bio-text">{pageOwner.bio || `It looks like ${pageOwner.first_name} is a little shy. Check back later to see if they update their information!`}</p>
        </div>
    )
}

export default AboutTab
