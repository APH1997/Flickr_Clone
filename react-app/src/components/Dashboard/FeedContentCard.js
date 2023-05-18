import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

function ContentCard({photo}){
    const user = useSelector(state => state.session.user)

    return (
        <div className="content-card">
            <div className="cc-poster-info">
                <div>
                    <img src="awslink"></img>
                    <p>{photo.author.username}</p>
                </div>
                {user.id === photo.author.id &&
                        <NavLink to={`/photos/${photo.id}/edit`}>Edit</NavLink>
                }
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
