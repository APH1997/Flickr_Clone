

function ContentCard({photo}){

    return (
        <div className="content-card">
            <div className="cc-poster-info">
                <img src="awslink"></img>
                <p>{photo.author.username}</p>
            </div>
            <img id="photo" src={photo.url}></img>
            <p id="photo-caption">{photo.caption}</p>
            <div className="description-and-comments">
                <p>{photo.description}</p>
                <p id="comments-button">{photo.comments.length} comments</p>
            </div>

        </div>
    )
}

export default ContentCard
