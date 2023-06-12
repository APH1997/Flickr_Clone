import { useEffect, useState } from "react"
import { useModal } from "../../context/Modal"
import { useDispatch } from "react-redux"
import { updateProfileThunk } from "../../store/session"

function ProfileModal({user}){
    const dispatch = useDispatch()
    const [proPic, setProPic] = useState(null)
    const [coverPic, setCoverPic] = useState(null)
    const [firstName, setFirstName] = useState(user.first_name)
    const [lastName, setLastName] = useState(user.last_name)
    const [username, setUsername] = useState(user.username)
    const [errors, setErrors] = useState({})

    const {closeModal} = useModal()

    // Check state variables against these
    const defaultValues = [
        null, null, user.first_name,
        user.last_name, user.username
    ]
    //Diffing algo
    function editDiff(){
        const inputs = [
            proPic, coverPic, firstName,
            lastName, username
        ]
        const diff = defaultValues.filter((val, i) =>
            val !== inputs[i]
        )
        if (diff.length) return true
        else return false
    }

    async function handleSubmit(e){
        e.preventDefault()
        if (!editDiff()){
            closeModal();
            return
        }

        if (Object.values(errors).length){
            return;
        }

        const formData = new FormData()
        if (proPic) {
            formData.append("profile_pic", proPic)
        }
        if (coverPic) {
            formData.append("cover_photo", coverPic)
        }
        if (firstName) {
            formData.append("first_name", firstName)
        }
        if (lastName) {
            formData.append("last_name", lastName)
        }
        if (username && username !== user.username) {
            formData.append("username", username)
        }

        await dispatch(updateProfileThunk(formData, user.id));

        setTimeout(() => true, 300)
        closeModal()

    }

    useEffect(() => {
        const errObj = {};

        if (firstName && firstName.length > 50){
            errObj.firstName = "First name cannot exceed 50 characters"
        }
        if (!firstName){
            errObj.firstName = "First name is required"
        }
        if (!firstName.trim()){
            errObj.firstName = "First name is required"
        }
        if (lastName && lastName.length > 50){
            errObj.lastName = "Last name cannot exceed 50 characters"
        }
        if (!lastName){
            errObj.lastName = "Last name is required"
        }
        if (!lastName.trim()){
            errObj.lastName = "Last name is required"
        }
        if (username && username.length > 40){
            errObj.username = "Username cannot exceed 40 characters"
        }
        if (!username){
            errObj.username = "Username is required"
        }
        if (!username.trim()){
            errObj.username = "Username is required"
        }

        setErrors(errObj)

    }, [proPic, coverPic, firstName, lastName, username])

    return (
        <form method="PUT"
        className="profile-edit-form"
        encType="multipart/form-data"
        onSubmit={(e) => handleSubmit(e)}
        >

            <label>Change Profile Picture
                <input
                type="file"
                accept="image/*"
                onChange={(e) => setProPic(e.target.files[0])}
                />
            </label>
            <label>Change Cover Photo
                <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverPic(e.target.files[0])}
                />
            </label>
            <label>Edit First Name
                <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                />
            </label>
            {errors.firstName && <p className="errors">{errors.firstName}</p>}
            <label>Edit Last Name
                <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                />
            </label>
            {errors.lastName && <p className="errors">{errors.lastName}</p>}
            <label>Edit Username
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            {errors.username && <p className="errors">{errors.username}</p>}
            <button>Submit</button>
        </form>
    )
}

export default ProfileModal
