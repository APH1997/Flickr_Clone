import { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getAllPhotosThunk } from "../../store/photos"
import ContentCard from "./FeedContentCard"
import "./index.css"
import { ThunkHubContext } from "../../context/ThunkHub"

function Feed(){
    /*
    Renders a column of content-cards,
    which conditonally render their comments below
    */
    const dispatch = useDispatch()
    const history = useHistory()
    const {setDestination} = useContext(ThunkHubContext)

    const user = useSelector(state => state.session.user)
    const allPhotos = useSelector(state => state.photos.allPhotos)

    let sortedPhotos;
    if (!allPhotos){
        setDestination('/')
        history.push('/thunk/hub')
    } else{
        sortedPhotos = Object.values(allPhotos)
        .sort((a,b) =>  new Date(b.created_at) - new Date(a.created_at))
    }

    if (!sortedPhotos) return null

    return (
            <div className="feed-main-container">The Feed

            {sortedPhotos.map(photo => {
                return <ContentCard key={photo.id} photo={photo}/>
            })}
            </div>
    )
}

export default Feed
