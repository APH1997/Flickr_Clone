import { useState } from "react";
import AboutTab from "./AboutTab";
import PhotosTab from "./PhotosTab";
import AlbumsTab from "./AlbumsTab";

function ProfileNav(){
    const [selected, setSelected] = useState('photos')
    return (
        <>
            <div className="profile-nav-bar">
                <div onClick={() => setSelected('about')} className={selected === "about" ? "active-tab" : ""}>About</div>
                <div onClick={() => setSelected('photos')} className={selected === "photos" ? "active-tab" : ""}>Photos</div>
                <div onClick={() => setSelected('albums')} className={selected === "albums" ? "active-tab" : ""}>Albums</div>
            </div>
            {(selected === "about" &&
            <div className="about-tab-main-container">
                <AboutTab />
            </div>
            )}
            {(selected === "photos" &&
                <PhotosTab />
            )}
            {(selected === "albums" &&
                <AlbumsTab />
            )}

        </>
    )
}

export default ProfileNav
