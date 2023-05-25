import OpenModalButton from "../../OpenModalButton"
import PostForm from "../../Photos/CreatePostPage"

function NoPhotos(){
    return(
        <div className="no-photos-comp-container">
            <h2>You don't have any photos yet!</h2>
            <p>That's ok, we all get lost in the clouds sometimes.</p>
            <OpenModalButton
                buttonText="Upload a photo"
                modalComponent={<PostForm />}
            />
        </div>
    )
}

export default NoPhotos
