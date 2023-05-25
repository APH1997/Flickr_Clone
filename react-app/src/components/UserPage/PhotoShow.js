import { useHistory } from "react-router-dom"


function PhotoShow({photo}){
    console.log(photo)
    const history = useHistory()
    return (
        <div className="photo-show-card"
            onClick={() => history.push({
                pathname: `/photos/${photo.id}`,
                state: {
                    from: 'PROFILE',
                    userId: photo.authorId
                }
            })}
        >
            <img alt="" src={photo.url}></img>
        </div>
    )
}

export default PhotoShow
