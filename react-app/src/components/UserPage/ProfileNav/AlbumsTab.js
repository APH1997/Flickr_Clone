import { useSelector } from "react-redux"
import AlbumCard from "../AlbumCard";
import { useHistory } from "react-router-dom";

function AlbumsTab(){
    const history = useHistory()
    const pageOwner = useSelector(state => state.session.profilePageUser)
    const sessionUser = useSelector(state => state.session.user)

    if (!pageOwner) return null;
    return (
        <div>
            {pageOwner.id === sessionUser.id &&
            <div id="create-album-button" onClick={() => history.push('/albums/new')}>
                Create an album
            </div>
            }

            {pageOwner.id !== sessionUser.id &&
                <h2>
                    {!pageOwner.albums.length ? `It looks like ${pageOwner.first_name} hasn't put together any albums... yet.` : ''}
                </h2>
            }

            <div className="main-album-card-container">
                {pageOwner.albums.map(album => {
                    return <AlbumCard album={album}/>
                })}
            </div>
        </div>
    )
}

export default AlbumsTab
