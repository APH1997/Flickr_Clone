import { useSelector } from "react-redux"
import PhotoShow from "../PhotoShow";

function PhotosTab(){
    const pageOwner = useSelector(state => state.session.profilePageUser)

    if (!pageOwner) return null;
    const photos = pageOwner.photos

    return (
        <div className="user-page-photo-container">
            {photos.map(photo => {
                return <PhotoShow id={photo.id} photo={photo}/>
            })}
        </div>
    )
}

export default PhotosTab
