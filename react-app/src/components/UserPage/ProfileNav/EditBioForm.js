import { useState } from "react"

function EditBioForm({user}) {
    const [bio, setBio] = useState(user.bio || "")
    return (
        <form className="edit-bio-field">
            <textarea
                placeholder="Tell us about yourself"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />
        </form>
    )
}

export default EditBioForm
