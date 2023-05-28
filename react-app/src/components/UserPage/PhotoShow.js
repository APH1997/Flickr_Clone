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
            <div className="hover-mask-div">
                <img alt="" src={photo.url}></img>
            </div>
        </div>
    )
}

export default PhotoShow
