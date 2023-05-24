import { useHistory } from "react-router-dom"

function NoPhotos(){
    const history = useHistory()
    return(
        <div className="no-photos-comp-container">
            <h2>You don't have any photos!</h2>
            <p>That's ok, we all get lost in the clouds sometimes.</p>
            <button onClick={() => history.push('/photos/new')}>Upload Photos</button>
        </div>
    )
}

export default NoPhotos
