//constants
const GET_ALL_PHOTOS = "photos/GET_ALL"
const GET_ONE_PHOTO = "photos/GET_ONE"
const GET_USER_PHOTOS = "userPhotos/GET_ALL"

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

//GET ALL OF A USER'S PHOTOS
const getUserPhotosAction = (photos) => {
    return {
        type: GET_USER_PHOTOS,
        payload: photos
    }
}

export const getUserPhotosThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/photos/user/${userId}`)
    if (response.ok){
        const data = await response.json()
        await dispatch(getUserPhotosAction(data))
        return data
    } else {
        const data = await response.json()
        return data
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

const initialState = {allPhotos: null, userPhotos: null, singlePhoto: null}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PHOTOS: {
            const newState = {
                ...state,
                allPhotos: {...state.allPhotos},
                userPhotos: {...state.userPhotos},
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
                userPhotos: {...state.userPhotos},
                singlePhoto: action.payload
            }
            return newState
        }
        case GET_USER_PHOTOS: {
            const newState = {
                allPhotos: {...state.allPhotos},
                userPhotos: null,
                singlePhoto: {...state.singlePhoto}
            }
            action.payload.forEach(photo => {
                newState.userPhotos[photo.id] = photo
            })
            return newState
        }

        default:
            return state
    }
}
