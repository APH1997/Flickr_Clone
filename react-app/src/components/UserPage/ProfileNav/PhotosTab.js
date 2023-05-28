import { useSelector } from "react-redux"
import PhotoShow from "../PhotoShow";
import PostForm from "../../Photos/CreatePostPage";
import OpenModalButton from "../../OpenModalButton";
import NoPhotos from "./NoPhotos";

function PhotosTab(){
    const pageOwner = useSelector(state => state.session.profilePageUser)
    const user = useSelector(state => state.session.user)
    if (!pageOwner) return null;
    const photos = pageOwner.photos

    return (
        <div className="user-page-photo-container">
            {user.id === pageOwner.id && photos.length > 0 &&
                <div className="upload-photo-user-page-container">
                    <OpenModalButton
                    buttonText="Upload a photo"
                    modalComponent={<PostForm />}
                    />
                </div>
            }

            {photos.length > 0 &&
                <div className="photo-show-container">
                    {
                        photos.map(photo => {
                            return <PhotoShow id={photo.id} photo={photo}/>
                        })}
                </div>
            }

            {pageOwner.id !== user.id &&
                <h2>
                    {!pageOwner.photos.length ? `${pageOwner.first_name} doesn't have any photos to show off.` : ''}
                </h2>
            }

            {!photos.length && user.id === pageOwner.id &&
                <NoPhotos />
            }


        </div>
    )
}

export default PhotosTab
