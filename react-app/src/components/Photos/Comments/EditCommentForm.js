import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateCommentThunk } from "../../../store/photos"

function EditComment({content, setIsEditing}){
    const dispatch = useDispatch()
    const [comment, setComment] = useState(content.content)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [errors, setErrors] = useState({})

    async function handleSubmit(e){
        e.preventDefault()
        setHasSubmitted(true)
        if (Object.values(errors).length) return;
        setHasSubmitted(false)

        const commentData = {
            content: comment,
        }
        await dispatch(updateCommentThunk(content.id, commentData))
        setIsEditing(false)
    }

    function handleComment(e){
        if (e.target.value.length > 200 ) return;
        setHasSubmitted(false)
        setComment(e.target.value)
    }

    useEffect(() => {
        const errObj = {}
        if (!comment){
            errObj.noComment = "Comments cannot be empty!"
        }
        if (!comment.trim()){
            errObj.noComment = "Comments cannot be empty!"
        }
        if (comment.length > 250){
            errObj.commentLength = "Comments cannot exceed 250 characters"
        }
        if (Object.values(errObj).length){
            setErrors(errObj)
        } else setErrors({})

    }, [comment])

    return (
        <span>
            <form onSubmit={(e) => handleSubmit(e)} style={{width: "100%"}}>
                <textarea style={{width: "300px"}}
                value={comment}
                onChange={(e) => handleComment(e)}/>
                {hasSubmitted && Object.values(errors).length && Object.values(errors).map(error =>
                    <p className="errors">{error}</p>
                )}
            <div>
                <button>Submit</button>
            </div>
            </form>
        </span>
    )
}

export default EditComment
