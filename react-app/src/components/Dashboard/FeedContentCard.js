import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import AuthorControls from "./AuthorControls"


function ContentCard({photo}){
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    function handleUserPageRedirect(e){
        e.stopPropagation()
        history.push(`/users/${photo.author.id}`)
    }
    return (
        <div className="content-card"
            onClick={() => history.push({
                pathname: `/photos/${photo.id}`,
                state: {from: 'FEED'}
            })}>

            <div className="cc-poster-info">
                <div className="username-and-pro-pic">
                    <img
                        alt="" src={photo.author.profile_picture_url}
                        onClick={(e) => handleUserPageRedirect(e)}
                    />
                    <p onClick={(e) => handleUserPageRedirect(e)}>
                        {photo.author.username}
                    </p>
                </div>

                {user.id === photo.author.id &&
                    <AuthorControls photo={photo}/>
                }

            </div>
            <img alt="" className="photo" src={photo.url}></img>
            <p id="photo-caption">{photo.caption}</p>

            <div className="description-and-comments">
                <p>{photo.description}</p>
            </div>
            <div id="comments-button">

                <i className="far fa-comment"></i>
                    <span>{photo.comments.length}</span>
                <i className="far fa-comments"></i>
                    <span>{photo.num_replies}</span>
            </div>

        </div>
    )
}

export default ContentCard
