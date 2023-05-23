import { useSelector } from "react-redux"
import PhotoShow from "../PhotoShow";
import { useState } from "react";
import PostForm from "../../Photos/CreatePostPage";
import { useModal } from "../../../context/Modal";
import OpenModalButton from "../../OpenModalButton";

function PhotosTab(){
    const [uploadComponent, setUploadComponent] = useState(false)

    const pageOwner = useSelector(state => state.session.profilePageUser)
    const user = useSelector(state => state.session.user)
    if (!pageOwner) return null;
    const photos = pageOwner.photos

    return (
        <div className="user-page-photo-container">
            {user.id === pageOwner.id &&
                <div className="upload-photo-user-page-container">
                    <OpenModalButton
                    buttonText="Upload a photo"
                    modalComponent={<PostForm />}
                    />
                </div>
            }

            <div className="photo-show-container">
                {!uploadComponent &&
                photos.map(photo => {
                    return <PhotoShow id={photo.id} photo={photo}/>

                })}
            </div>
            {uploadComponent &&
                <PostForm />
            }

        </div>
    )
}

export default PhotosTab
