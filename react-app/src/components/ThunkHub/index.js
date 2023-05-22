import { getAllAlbumsThunk } from "../../store/albums"
import { getAllPhotosThunk } from "../../store/photos"
import { authenticate } from "../../store/session"
import { getProfileThunk } from "../../store/session"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { useContext, useEffect } from "react"
import { ThunkHubContext } from "../../context/ThunkHub"


function ThunkHub(){
/*
The thunk hub is visited after every
CRUD operation, including login and signup
*/
    const {destination} = useContext(ThunkHubContext)
    console.log(destination)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllAlbumsThunk())
        dispatch(getAllPhotosThunk())
        dispatch(authenticate())
    }, [])

    // if (userId){
    //     dispatch(getProfileThunk(userId))
    // }

    const history = useHistory()
    return (
        <div>
            {setTimeout(() => history.replace(`${destination}`), 400) }
        </div>
    )
}

export default ThunkHub
