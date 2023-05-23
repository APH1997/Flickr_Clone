import { useHistory } from "react-router-dom"


function PhotoShow({photo}){
    const history = useHistory()
    return (
        <div onClick={() => history.push(`/photos/${photo.id}`)}>
            <img alt="" src={photo.url}></img>
        </div>
    )
}

export default PhotoShow
