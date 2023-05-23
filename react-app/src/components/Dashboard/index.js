import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ContentCard from "./FeedContentCard"
import "./index.css"
import { getAllPhotosThunk } from "../../store/photos"

function Feed(){
    /*
    Renders a column of content-cards,
    which conditonally render their comments below
    */
    const dispatch = useDispatch()
    const allPhotos = useSelector(state => state.photos.allPhotos)

    useEffect(() => {
        dispatch(getAllPhotosThunk())
    }, [dispatch])

    let sortedPhotos;
    if (!allPhotos){
        return null
    } else{
        sortedPhotos = Object.values(allPhotos)
        .sort((a,b) =>  new Date(b.created_at) - new Date(a.created_at))
    }

    if (!sortedPhotos) return null

    return (
            <div className="feed-main-container">

            {sortedPhotos.map(photo => {
                return <ContentCard key={photo.id} photo={photo}/>
            })}
            </div>
    )
}

export default Feed
