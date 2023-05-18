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

    return (
            <div className="feed-main-container">The Feed

            {Object.values(allPhotos).map(photo => {
                console.log(photo)
                return <ContentCard photo={photo}/>
            })}
            </div>
    )
}

export default Feed
