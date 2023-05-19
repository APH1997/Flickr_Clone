import { useState } from "react"

function ProfileNav(){
    const [selected, setSelected] = useState('')
    return (
        <div className="profile-nav-bar">
            <div onClick={() => setSelected('about')} className={selected === "about" ? "active-tab" : ""}>About</div>
            <div onClick={() => setSelected('photos')} className={selected === "photos" ? "active-tab" : ""}>Photos</div>
            <div onClick={() => setSelected('albums')} className={selected === "albums" ? "active-tab" : ""}>Albums</div>
        </div>
    )
}

export default ProfileNav
