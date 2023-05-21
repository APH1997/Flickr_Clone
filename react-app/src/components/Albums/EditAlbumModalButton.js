import { useModal } from "../../context/Modal";
import AlbumFormModal from "./AlbumFormModal";
import OpenModalButton from "../OpenModalButton";


function EditAlbum({album}){
    return (
    <span id="edit-album-button"
        onClick={(e) => e.stopPropagation()}>
        <OpenModalButton
        buttonText={<i class="fas fa-edit"></i>}
        modalComponent={<AlbumFormModal album={album}/>}/>
    </span>
    )
}

export default EditAlbum
