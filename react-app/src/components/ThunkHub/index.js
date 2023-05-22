import { useEffect } from "react"
import { getAllAlbumsThunk } from "../../store/albums"
import { getAllPhotosThunk } from "../../store/photos"
import { authenticate } from "../../store/session"
import { getProfileThunk } from "../../store/session"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"



function ThunkHub(){
/*
The thunk hub is visited after every
CRUD operation, including login and signup
NEED CONTEXT TO KNOW WHERE TO HISTORY.REPLACE()
*/
    const dispatch = useDispatch()
    dispatch(getAllAlbumsThunk())
    dispatch(getAllPhotosThunk())
    dispatch(authenticate())

    // if (userId){
    //     dispatch(getProfileThunk(userId))
    // }

    const history = useHistory()
    return (
        <div>
            <h1>Welcome to the THUNKHUB</h1>
            {history.replace(`/DESTINATION/URL`)}
        </div>
    )
}

export default ThunkHub
