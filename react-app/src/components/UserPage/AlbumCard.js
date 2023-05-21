import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import EditAlbum from "../Albums/EditAlbumModalButton";

function AlbumCard({album}){
    const pageOwner = useSelector(state => state.session.profilePageUser)
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    if (!album || !user || !pageOwner) return null;

    return (

            <div className="album-card-container"
                onClick={() => history.push(`/albums/${album.id}`)}>
                <div className="album-card-details">
                    <p className="album-cover-album-title">{album.title}</p>
                    <p className="album-cover-author">{album.pics.length} photos
                        {user.id === pageOwner.id &&
                            <EditAlbum album={album}/>
                        }
                    </p>
                </div>
                <img id="album-cover-photo"src={album.cover_photo}></img>
            </div>

    )
}

export default AlbumCard
