import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getAllPhotosThunk } from "../../store/photos"
import ContentCard from "./FeedContentCard"
import "./index.css"

function Feed(){
    /*
    Renders a column of content-cards,
    which conditonally render their comments below
    */
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const allPhotos = useSelector(state => state.photos.allPhotos)
    if (!user) history.push('/login')


    useEffect(() => {
        dispatch(getAllPhotosThunk())
    }, [dispatch])

    if (!allPhotos) return null

    const sortedPhotos = Object.values(allPhotos)
    .sort((a,b) =>  new Date(b.created_at) - new Date(a.created_at))
    
    return (
            <div className="feed-main-container">The Feed

            {sortedPhotos.map(photo => {
                console.log(photo)
                return <ContentCard photo={photo}/>
            })}
            </div>
    )
}

export default Feed
