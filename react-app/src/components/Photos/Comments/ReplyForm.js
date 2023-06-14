import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { createReplyThunk } from "../../../store/photos";
import Loader from "../../Loader";

function ReplyForm({setReplying, parentId, setShowReplies}) {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [reply, setReply] = useState("")
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        const errObj = {}
        if (!reply || !reply.trim()) errObj.reply = "Cannot submit an empty reply"
        if (reply && reply.length > 100) errObj.reply = "Replies cannot exceed 100 characters"
        if (Object.values(errObj).length){
            setErrors(errObj)
        } else {
            setErrors({})
        }

    }, [reply])

    function handleReply(e){
        if (e.target.value.length > 100) return
        setReply(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        setHasSubmitted(true)
        if (Object.values(errors).length) return;
        setHasSubmitted(false)

        const replyData = {
            content: reply
        }
        setShowReplies(true)
        dispatch(createReplyThunk(parentId, replyData))
        setReplying(false)
    }

    if (!user) return <Loader />;
    return (
        <div className="comment-card-container reply-container">
            <div className="comment-card-content-container reply-form-container">
                <div>
                    <img id="comment-card-pro-pic" src={user.profile_picture_url}></img>
                </div>
                <div className="comment-card-content reply-form-container">
                    <div>{user.first_name} {user.last_name}</div>
                    <form onSubmit={(e) => handleSubmit(e)} className="reply-form">
                        <textarea
                        placeholder="Give em' a piece of your mind!"
                        value={reply}
                        onChange={(e) => handleReply(e)}/>
                        <div>
                            <button>Submit</button>
                            <span>
                                {hasSubmitted && Object.values(errors).length > 0 &&
                                <p className="errors">{errors.reply}</p>}
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>





    )
}

export default ReplyForm
