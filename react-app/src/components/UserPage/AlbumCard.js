import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom";

function AlbumCard({album}){
    const pageOwner = useSelector(state => state.session.profilePageUser)
    const history = useHistory()

    if (!album) return null;
    return (

            <div className="album-card-container"
                onClick={() => history.push(`/albums/${album.id}`)}>
                <img id="album-cover-photo"src={album.cover_photo}></img>
                <div className="album-card-details">
                    <p className="album-cover-album-title">{album.title}</p>
                    <p className="album-cover-author">{album.length} photos</p>
                </div>
            </div>

    )
}

export default AlbumCard
