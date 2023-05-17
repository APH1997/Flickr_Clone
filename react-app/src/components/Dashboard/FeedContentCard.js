function ContentCard({photo}){

    return (
        <div>

            <p>{photo.author.username}</p>
            <img src={photo.url}></img>
            <p>{photo.caption}</p>
            <p>{photo.description}</p>
            
        </div>
    )
}

export default ContentCard
