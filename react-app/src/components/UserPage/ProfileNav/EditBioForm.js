import { useState } from "react"


function EditBioForm({user}) {
    const [bio, setBio] = useState(user.bio || "")

    function bioLimit(e){
        if (e.target.value.length > 1000) return;
        setBio(e.target.value)
    }

    function handleBioUpdate(e){
        e.preventDefault()

        const data = {
            bio,
        }

    }

    return (
        <form className="edit-bio-field"
        method="PUT"
        onSubmit={(e) => handleBioUpdate}>
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
