import { useSelector } from "react-redux"
import PhotoShow from "../PhotoShow";
import { useState } from "react";
import PostForm from "../../Photos/CreatePostPage";

function PhotosTab(){
    const [uploadComponent, setUploadComponent] = useState(false)

    const pageOwner = useSelector(state => state.session.profilePageUser)
    const user = useSelector(state => state.session.user)
    if (!pageOwner) return null;
    const photos = pageOwner.photos

    return (
        <div className="user-page-photo-container">
            {user.id === pageOwner.id &&
                <div onClick={() => setUploadComponent(!uploadComponent)}>Upload a photo</div>
            }

            <div>
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
