import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getAllPhotosThunk } from "../../store/photos"
import ContentCard from "./FeedContentCard"

function Feed(){
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
        <>
            <h1>The feed</h1>
            {Object.values(allPhotos).map(photo => {
                return <ContentCard photo={photo}/>
            })}
        </>

    )
}

export default Feed
