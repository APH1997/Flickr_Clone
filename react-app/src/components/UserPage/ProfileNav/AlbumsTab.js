import { useSelector } from "react-redux"
import AlbumCard from "../AlbumCard";

function AlbumsTab(){
    const pageOwner = useSelector(state => state.session.profilePageUser)

    if (!pageOwner) return null;
    return (
        <div>
            <h1>Albums Tab</h1>
            <h2>{!pageOwner.albums.length ? `It looks like ${pageOwner.first_name} hasn't put together any albums... yet.` : ''}</h2>

            <div className="main-album-card-container">
                {pageOwner.albums.map(album => {
                    return <AlbumCard album={album}/>
                })}
            </div>
        </div>
    )
}

export default AlbumsTab
