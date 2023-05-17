//constants
const GET_ALL_PHOTOS = "photos/GET_ALL"
const GET_ONE_PHOTO = "photos/GET_ONE"

//GET ALL PHOTOS
const getAllPhotosAction = (photos) => {
    return {
        type: GET_ALL_PHOTOS,
        payload: photos
    }
}

const getAllPhotosThunk = () => async (dispatch) => {
    const response = await fetch("/photos/all")
    if (response.ok){
        const data = await response.json();
        await dispatch(getAllPhotosAction(data));
        return data;
    }
}

const initialState = {allPhotos: null, singlePhoto: null}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PHOTOS: {
            const newState = {
                ...state,
                allPhotos: {...state.allPhotos},
                singlePhoto: {...state.singlePhoto}
            }
            action.payload.forEach(photo => {
                newState.allPhotos[photo.id] = photo
            })
            return newState
        }
        default:
            return state
    }
}
