import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import EditAlbum from "../Albums/EditAlbumModalButton";
import DeleteAlbum from "../Albums/DeleteAlbumModalButton";
import { useState } from "react";


function AlbumCard({album}){
    const [hover, setHover] = useState(false)
    const pageOwner = useSelector(state => state.session.profilePageUser)
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    if (!album || !user || !pageOwner) return null;

    return (

            <div className="album-card-container"
                onClick={() => history.push(`/albums/${album.id}`)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <div className="album-card-details">
                    <div className="delete-album-icon-container">
                        {user.id === pageOwner.id &&
                            <DeleteAlbum album={album}/>
                        }
                    </div>
                    <div>
                        <p className="album-cover-album-title">{album.title}</p>
                        <p className="album-cover-author">{album.pics.length} photos
                            {user.id === pageOwner.id &&
                                <EditAlbum album={album}/>
                            }
                        </p>
                    </div>
                </div>

                <img alt="" id="album-cover-photo"src={album.cover_photo}></img>

            </div>

    )
}

export default AlbumCard
