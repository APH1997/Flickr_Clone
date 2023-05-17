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

export const getAllPhotosThunk = () => async (dispatch) => {
    const response = await fetch("/photos/all")
    if (response.ok){
        const data = await response.json();
        await dispatch(getAllPhotosAction(data));
        return data;
    }
}

//GET ONE PHOTO
const getOnePhotoAction = (photo) => {
    return {
        type: GET_ONE_PHOTO,
        payload: photo
    }
}

export const getOnePhotoThunk = (photoId) => async (dispatch) => {
    const response = await fetch(`/photos/${photoId}`)
    if (response.ok){
        const data = await response.json();
        await dispatch(getOnePhotoAction(data));
        return data
    } else {
        const data = response.json()
        return data
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
        case GET_ONE_PHOTO: {
            const newState = {
                ...state,
                allPhotos: {...state.allPhotos},
                singlePhoto: action.payload
            }
            return newState
        }

        default:
            return state
    }
}
