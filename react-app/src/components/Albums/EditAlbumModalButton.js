import { useModal } from "../../context/Modal";
import AlbumFormModal from "./AlbumFormModal";
import OpenModalButton from "../OpenModalButton";


function EditAlbum(){
    return (
    <span id="edit-album-button" onClick={(e) => e.stopPropagation()}>
        <OpenModalButton
        buttonText={<i class="fas fa-edit"></i>}
        modalComponent={<AlbumFormModal type={"edit"}/>}/>
    </span>
    )
}

export default EditAlbum
