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
