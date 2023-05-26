import { useState } from "react"
import { useDispatch } from "react-redux";
import { updateBioThunk } from "../../../store/session";
import { useTab } from "../../../context/UserPageTab";


function EditBioForm({user}) {
    const {setIsEditing} = useTab()

    const [bio, setBio] = useState(user.bio || "")
    const dispatch = useDispatch();

    function bioLimit(e){
        if (e.target.value.length > 1000) return;
        setBio(e.target.value)
    }

    async function handleBioUpdate(e){
        e.preventDefault()

        const data = {bio}
        await dispatch(updateBioThunk(data, user.id))

        setIsEditing(false)

    }

    return (
        <form className="edit-bio-field"
        method="PUT"
        onSubmit={(e) => handleBioUpdate(e)}>
            <textarea
                placeholder="Tell us about yourself"
                value={bio}
                onChange={(e) => bioLimit(e)}
            />
            {bio.length > 0 &&
            <div id="bio-submit-and-count">
                <button>Submit</button>
                <span>{bio.length}/1000</span>
            </div>
            }
        </form>
    )
}

export default EditBioForm
