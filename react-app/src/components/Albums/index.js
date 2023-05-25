import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory, useParams } from "react-router-dom"
import { getAllAlbumsThunk } from "../../store/albums"
import "./index.css"
import EditAlbum from "./EditAlbumModalButton"
import DeleteAlbum from "./DeleteAlbumModalButton"

function AlbumShow() {
    const history = useHistory()
    const { albumId } = useParams()
    const dispatch = useDispatch()
    const allAlbums = useSelector((state => state.albums.allAlbums))
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(getAllAlbumsThunk())
    }, [dispatch])

    if (!allAlbums) return null


    const singleAlbum = allAlbums[albumId]
    if (!singleAlbum) return null;

    return (
        <>
            <div className="album-photos-container">
                <div>
                    <div className="album-by-id-author-controls-container">
                        {user.id === singleAlbum.author.id &&
                            <EditAlbum album={singleAlbum} show={true} />}
                        {user.id === singleAlbum.author.id &&
                            <DeleteAlbum album={singleAlbum} />}
                    </div>

                    <div id="cover-photo-mask" style={{ width: "80%", height: "250px" }}>
                        <div id="cover-photo-mask-details">
                            <div id="title-and-photo-count">
                                <h4>{singleAlbum.title}</h4>
                                <p>{singleAlbum.pics.length} photos</p>
                            </div>
                            <NavLink id="album-show-nav-link-to-author" to={`/users/${singleAlbum.author.id}`}>
                                By: {singleAlbum.author.first_name} {singleAlbum.author.last_name}
                            </NavLink>
                        </div>
                    </div>
                    <img alt="" id="album-show-cover-photo" src={singleAlbum.cover_photo}></img>
                </div>
                <div className="non-cover-photos">
                    {singleAlbum.pics.map((photo) =>

                        <div className="album-photo-card"
                            onClick={() => history.push({
                                pathname: `/photos/${photo.id}`,
                                state: { from: 'ALBUM' }
                            })}>

                            <img alt="" src={photo.url} />

                        </div>

                    )}

                </div>
            </div>
        </>
    )
}
export default AlbumShow
