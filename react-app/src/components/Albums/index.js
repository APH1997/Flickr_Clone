import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

function AlbumShow(){
    const {albumId} = useParams()
    const allPhotos = useSelector((state => state.photos.allPhotos))
    if (!allPhotos.length) return null

    
    return (
        <h1>Welcome to the album show</h1>
    )
}
export default AlbumShow
