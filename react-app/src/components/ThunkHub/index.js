import { getAllAlbumsThunk } from "../../store/albums"
import { getAllPhotosThunk } from "../../store/photos"
import { authenticate } from "../../store/session"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { useThunkHub } from "../../context/ThunkHub"
import { useParams } from "react-router-dom"



function ThunkHub(){
/*
The thunk hub is visited after every
CRUD operation, including login and signup
URL has :method and :resource params
*/


    const {resource, method, destination} = useParams()




    const dispatch = useDispatch()

    dispatch(getAllAlbumsThunk())
    dispatch(getAllPhotosThunk())
    dispatch(authenticate())

    switch(resource){
        case "ALBUMS": {
            switch(method){
                case "GET":{

                }
                case "POST":{

                }
                case "PUT":{

                }
                case "DELETE":{

                }
                //DEFAULT?
            }
        }
        case "PHOTOS": {
            switch(method){
                case "GET":{

                }
                case "POST":{

                }
                case "PUT":{

                }
                case "DELETE":{

                }
                //DEFAULT?
            }
        }
        case "SESSION": {
            switch(method){
                case "GET":{

                }
                case "POST":{

                }
                case "PUT":{

                }
                case "DELETE":{

                }
                //DEFAULT?
            }
        }
        //DEFAULT?
    }

    const history = useHistory()
    return (
        <div>
            {setTimeout(() => history.replace(`${destination}`), 400) }
        </div>
    )
}

export default ThunkHub
