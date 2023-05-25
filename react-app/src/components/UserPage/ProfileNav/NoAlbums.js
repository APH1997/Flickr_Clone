import OpenModalButton from "../../OpenModalButton";
import AlbumFormModal from "../../Albums/AlbumFormModal";

function NoAlbums(){
    return (
        <div className="no-albums-comp-container">
            <h2>Let's make an album!</h2>
            <p>Click on the button below to get started.</p>
            <OpenModalButton
                buttonText="Create an album"
                modalComponent={<AlbumFormModal />}/>
        </div>
    )
}

export default NoAlbums
