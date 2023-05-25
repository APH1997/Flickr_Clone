import { useSelector } from "react-redux"
import AlbumCard from "../AlbumCard";
import AlbumFormModal from "../../Albums/AlbumFormModal";
import OpenModalButton from "../../OpenModalButton";
import NoPhotos from "./NoPhotos";


function AlbumsTab(){
    const pageOwner = useSelector(state => state.session.profilePageUser)
    const sessionUser = useSelector(state => state.session.user)

    if (!pageOwner) return null;
    return (
        <div style={{marginTop: "5px"}}>
            {pageOwner.id === sessionUser.id && (pageOwner.photos.length > 0 &&
                <div id="create-album-button">
                    <OpenModalButton
                    buttonText="Create an album"
                    modalComponent={<AlbumFormModal />}/>
                </div>)
                || pageOwner.id === sessionUser.id &&
                <NoPhotos />
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
