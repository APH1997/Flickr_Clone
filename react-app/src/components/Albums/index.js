import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import { getAllAlbumsThunk } from "../../store/albums"
import "./index.css"

function AlbumShow(){
    const {albumId} = useParams()
    const dispatch = useDispatch()
    const allAlbums = useSelector((state => state.albums.allAlbums))


    useEffect(() => {
        dispatch(getAllAlbumsThunk())
    }, [dispatch])

    if (!allAlbums) return null


    const singleAlbum = allAlbums[albumId]

    return (
        <>
            <div className="album-photos-container">
                <div>
                    <div id="cover-photo-mask" style={{width:"80%", height:"250px"}}>
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
                    <img id="album-show-cover-photo" src={singleAlbum.cover_photo}></img>
                </div>
                <div className="non-cover-photos">
                    {singleAlbum.pics.map((photo) =>
                        <div className="album-photo-card">
                            <img src={photo.url}/>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default AlbumShow
