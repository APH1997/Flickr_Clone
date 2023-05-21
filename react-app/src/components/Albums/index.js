import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
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
                <img id="album-show-cover-photo" src={singleAlbum.cover_photo}></img>
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
