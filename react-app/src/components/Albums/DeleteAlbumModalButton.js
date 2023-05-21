import OpenModalButton from "../OpenModalButton";
import DeleteAlbumModal from "./DeleteModal";

function DeleteAlbum({album}){
    return (
    <span id="delete-album-button"
        onClick={(e) => e.stopPropagation()}>
        <OpenModalButton
        buttonText={<i className="fas fa-trash-alt"></i>}
        modalComponent={<DeleteAlbumModal album={album}/>}/>
    </span>
    )
}

export default DeleteAlbum
