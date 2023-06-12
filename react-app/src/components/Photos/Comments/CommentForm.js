import { useState } from "react"
import { usePhoto } from "../../../context/Photo"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { createCommentThunk } from "../../../store/photos"
function CommentForm(){
    const dispatch = useDispatch()

    const {photo} = usePhoto()
    const [errors, setErrors] = useState({})
    const [comment, setComment] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        setHasSubmitted(true)
        if (Object.values(errors).length) return;
        setHasSubmitted(false)

        const commentData = {
            content: comment,
        }
        await dispatch(createCommentThunk(commentData, photo.id))
        setComment('')
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
        <form className="post-comment-form" onSubmit={(e) => handleSubmit(e)}>
            <div>
                <textarea
                placeholder={`Let ${photo.author.first_name} know much you love this photo!`}
                value={comment}
                onChange={(e) => handleComment(e)}
                />
                {hasSubmitted && Object.values(errors).length && Object.values(errors).map(error =>
                    <p className="errors">{error}</p>
                )}
                <div>{comment.length}/200</div>
            </div>
            <button disabled={!comment.length} className={!comment.length ? "disabled-btn" : "create-comment"}>Add Comment</button>
        </form>
    )
}

export default CommentForm
