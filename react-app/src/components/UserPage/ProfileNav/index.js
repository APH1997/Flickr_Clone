import { useState } from "react";
import AboutTab from "./AboutTab";
import PhotosTab from "./PhotosTab";
import AlbumsTab from "./AlbumsTab";
import { useTab } from "../../../context/UserPageTab";

function ProfileNav(){
    const {tab, setTab} = useTab()

    return (
        <>
            <div className="profile-nav-bar">
                <div onClick={() => setTab('about')} className={tab === "about" ? "active-tab" : ""}>About</div>
                <div onClick={() => setTab('photos')} className={tab === "photos" ? "active-tab" : ""}>Photos</div>
                <div onClick={() => setTab('albums')} className={tab === "albums" ? "active-tab" : ""}>Albums</div>
            </div>
            {(tab === "about" &&
            <div className="about-tab-main-container">
                <AboutTab />
            </div>
            )}
            {(tab === "photos" &&
                <PhotosTab />
            )}
            {(tab === "albums" &&
                <AlbumsTab />
            )}

        </>
    )
}

export default ProfileNav
