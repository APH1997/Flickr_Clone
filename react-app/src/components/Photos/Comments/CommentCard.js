function CommentCard({comment}){
    console.log(comment)
    return(
        <div className="comment-card-container">
            <div>
                <img id="comment-card-pro-pic" src={comment.author.profile_picture_url}></img>
            </div>
            <div>
                <div>{comment.author.first_name} {comment.author.last_name}</div>
                <div>{comment.content}</div>
            </div>
        </div>
    )
}

export default CommentCard
