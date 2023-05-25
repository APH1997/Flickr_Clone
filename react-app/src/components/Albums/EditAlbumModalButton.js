import AlbumFormModal from "./AlbumFormModal";
import OpenModalButton from "../OpenModalButton";


function EditAlbum({album, show}){
    return (
    <span id="edit-album-button" className={show ? "album-show-edit" : ""}
        onClick={(e) => e.stopPropagation()}>
        <OpenModalButton
        buttonText={<i className="fas fa-edit"><span>Edit Album</span></i>}
        modalComponent={<AlbumFormModal album={album}/>}/>
    </span>
    )
}

export default EditAlbum
