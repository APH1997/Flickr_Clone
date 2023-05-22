import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

function PhotoDetails(){
    const {photoId} = useParams()
    const photo = useSelector((state) => state.photos.allPhotos[photoId])

    console.log('PHOTODETAILS PHOTO:', photo)

    return (
        <h1>Welcome to da photo show</h1>
    )
}

export default PhotoDetails
