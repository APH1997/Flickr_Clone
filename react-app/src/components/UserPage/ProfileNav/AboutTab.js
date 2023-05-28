import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import EditBioForm from "./EditBioForm"
import { useTab } from "../../../context/UserPageTab"

function AboutTab(){
    const {isEditing, setIsEditing} = useTab()

    const pageOwner = useSelector(state => state.session.profilePageUser)
    const user = useSelector(state => state.session.user)
    return (
        <div id="userpage-bio-box">
            <div>
                <h3 id="about-me-h3">
                About Me...
                {user.id === pageOwner.id &&
                    <span>
                        <i id="edit-bio-button" onClick={() => setIsEditing(!isEditing)} className={ isEditing ? "fas fa-edit under-edit" : "fas fa-edit"}></i>
                    </span>
                }
                </h3>
            </div>
            {!isEditing &&
                <p id="bio-text">{pageOwner.bio || `It looks like ${pageOwner.first_name} is a little shy. Check back later to see if they update their information!`}</p>
            }
            {isEditing &&
                <EditBioForm user={pageOwner}/>
            }
        </div>
    )
}

export default AboutTab
