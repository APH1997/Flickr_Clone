import { useEffect } from "react"
import { getAllAlbumsThunk } from "../../store/albums"
import { getAllPhotosThunk } from "../../store/photos"
import { authenticate } from "../../store/session"
import { getProfileThunk } from "../../store/session"
import { useDispatch } from "react-redux"



function ThunkHub({userId}){
/*
The thunk hub is visited after every
CRUD operation, including login and signup
*/
    const dispatch = useDispatch()
    dispatch(getAllAlbumsThunk())
    dispatch(getAllPhotosThunk())
    dispatch(authenticate())

    if (userId){
        dispatch(getProfileThunk(userId))
    }

    return (
        <h1>Welcome to the THUNKHUB</h1>
    )
}

export default ThunkHub
