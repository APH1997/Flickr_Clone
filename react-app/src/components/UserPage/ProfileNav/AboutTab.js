import { useSelector } from "react-redux"

function AboutTab(){
    const pageOwner = useSelector(state => state.session.profilePageUser)

    return (
        <div id="userpage-bio-box">
            <h3 id="about-me-h3">About Me...</h3>
            <p id="bio-text">{pageOwner.bio || `It looks like ${pageOwner.first_name} is a little shy. Check back later to see if they update their information!`}</p>
        </div>
    )
}

export default AboutTab
