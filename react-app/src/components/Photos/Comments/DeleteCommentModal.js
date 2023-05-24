import { useModal } from "../../../context/Modal"

function DeleteComment(){
    const {closeModal} = useModal()
    function handleYes(){

        
        closeModal()
    }
    function handleNo(){
        closeModal()
    }
    return (
        <div>
            <h2>Delete comment?</h2>
            <button onClick={handleYes}>Yes</button>
            <button onClick={handleNo}>No</button>
        </div>
    )
}

export default DeleteComment
