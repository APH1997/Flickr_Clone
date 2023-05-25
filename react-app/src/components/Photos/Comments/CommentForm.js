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

    async function handleSubmit(e){
        e.preventDefault()
        if (Object.values(errors).length) return;

        const commentData = {
            content: comment,
        }
        await dispatch(createCommentThunk(commentData, photo.id))
        setComment('')
    }

    function handleComment(e){
        if (e.target.value.length > 200 ) return;
        setComment(e.target.value)
    }

    useEffect(() => {
        const errObj = {}
        if (!comment){
            errObj.noComment = true
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
                <div>{comment.length}/200</div>
            </div>
            <button>Add Comment</button>
        </form>
    )
}

export default CommentForm
