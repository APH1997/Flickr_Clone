//photo constants
const GET_ALL_PHOTOS = "photos/GET_ALL"
const GET_USER_PHOTOS = "userPhotos/GET_ALL"
const GET_ONE_PHOTO = "photos/GET_ONE"
const CREATE_PHOTO = "photos/CREATE"
const UPDATE_PHOTO = "photos/UPDATE"
const DELETE_PHOTO = "photos/DELETE"
//comment constants
const CREATE_COMMENT = "photos/comments/CREATE"
const DELETE_COMMENT = "photos/comments/DELETE"
const UPDATE_COMMENT = "photos/comments/UPDATE"


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

//CREATE PHOTO
const createPhotoAction = (photo) => {
    return {
        type: CREATE_PHOTO,
        payload: photo
    }
}

export const createPhotoThunk = (photoData) => async (dispatch) => {
    const response = await fetch('/photos/new', {
        method: 'POST',
        body: photoData,
    });
    if (response.ok) {
        const newPhoto = await response.json();
        await dispatch(createPhotoAction(newPhoto))
        return newPhoto
    } else {
        return response
    }
}

//EDIT PHOTO
const updatePhotoAction = (photo) => {
    return {
        type: UPDATE_PHOTO,
        payload: photo
    }
}

export const updatePhotoThunk = (photoId, photoData) => async (dispatch) => {
    const response = await fetch(`/photos/${photoId}/edit`, {
        method: 'PUT',
        body: photoData,
    });
    if (response.ok) {
        const data = await response.json();
        await dispatch(updatePhotoAction(data))
        return data
    } else {
        return response
    }
}

//DELETE PHOTO
const deletePhotoAction = (photoId) => {
    return {
        type: DELETE_PHOTO,
        payload: photoId
    }
}

export const deletePhotoThunk = (photoId) => async (dispatch) => {
    const response = await fetch(`/photos/${photoId}/delete`, {
        method: 'DELETE',
    })
    if (response.ok){
        const data = await response.json();
        await dispatch(deletePhotoAction(photoId))
        return data
    } else {
        const data = await response.json()
        return data
    }
}

//CREATE ALBUM - NO ACTION/REDUCER NEEDED
export const createAlbumThunk = (albumData) => async (dispatch) => {
    const response = await fetch('/photos/album/new', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(albumData),
    });
    if (response.ok){
        const data = await response.json();
        return data
    } else {
        const data = await response.json()
        return {"Failure": data}
    }
}

//CREATE COMMENT
const createCommentAction = (photo) => {
    return {
        type: CREATE_COMMENT,
        payload: photo
    }
}

export const createCommentThunk = (commentData, photoId) => async (dispatch) => {
    const response = await fetch(`/photos/${photoId}/comments/new`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(commentData)
    });
    if (response.ok) {
        const commentPhoto = await response.json()
        await dispatch(createCommentAction(commentPhoto))
        return commentPhoto
    } else {
        return response
    }
}


//DELETE COMMENT
const deleteCommentAction = (photo) => {
    return {
        type: DELETE_COMMENT,
        payload: photo
    }
}

export const deleteCommentThunk = (photoId, commentId) => async (dispatch) => {
    const response = await fetch(`/photos/${photoId}/comments/${commentId}/delete`, {
        method: "DELETE"
    });
    if (response.ok){
        const commentPhoto = await response.json()
        await dispatch(deleteCommentAction(commentPhoto))
        return commentPhoto
    } else {
        return response
    }
}

//UPDATE COMMENT
const updateCommentAction = (photo) => {
    return {
        type: UPDATE_COMMENT,
        payload: photo
    }
}

export const updateCommentThunk = (commentId, content) => async (dispatch) => {
    const response = await fetch(`/photos/comments/${commentId}/edit`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(content)
    })
    const data = await response.json()
    if (response.ok){
        await dispatch(updateCommentAction(data))
        return data
    } else {
        return data
    }
}

const initialState = {allPhotos: null, userPhotos: null, singlePhoto: null}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PHOTOS: {
            const newState = {
                ...state,
                allPhotos: {},
                userPhotos: {...state.userPhotos},
                singlePhoto: {...state.singlePhoto}
            }
            action.payload.forEach(photo => {
                newState.allPhotos[photo.id] = photo
            })

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

        case GET_ONE_PHOTO: {
            const newState = {
                ...state,
                allPhotos: {...state.allPhotos},
                userPhotos: {...state.userPhotos},
                singlePhoto: action.payload
            }
            return newState
        }

        case CREATE_PHOTO: {
            const newState = {
                ...state,
                allPhotos: {...state.allPhotos},
                userPhotos: {...state.userPhotos},
                singlePhoto: {...state.singlePhoto}
            }
            newState.allPhotos[action.payload.id] = action.payload
            return newState
        }

        case UPDATE_PHOTO: {
            const newState = {
                ...state,
                allPhotos: {...state.allPhotos},
                userPhotos: {...state.userPhotos},
                singlePhoto: {...state.singlePhoto}
            }
            if (newState.allPhotos[action.payload.id]){
                newState.allPhotos[action.payload.id] = action.payload
            }
            if (newState.userPhotos[action.payload.id]){
                newState.userPhotos[action.payload.id] = action.payload
            }
            return newState
        }
        case DELETE_PHOTO: {
            const newState = {
                ...state,
                allPhotos: {...state.allPhotos},
                userPhotos: {...state.userPhotos},
                singlePhoto: {...state.singlePhoto}
            }
            delete newState.allPhotos[action.payload]
            delete newState.userPhotos[action.payload]
            newState.singlePhoto = null

            return newState
        }

        case CREATE_COMMENT: {
            const newState = {
                allPhotos: {...state.allPhotos},
                userPhotos: {...state.userPhotos},
                singlePhoto: {...state.singlePhoto}
            }
            newState.allPhotos[action.payload.id] = action.payload

            return newState
        }

        case UPDATE_COMMENT:{
            const newState = {
                allPhotos: {...state.allPhotos},
                userPhotos: {...state.userPhotos},
                singlePhoto: {...state.singlePhoto}
            }
            newState.allPhotos[action.payload.id] = action.payload

            return newState
        }

        case DELETE_COMMENT: {
            const newState = {
                allPhotos: {...state.allPhotos},
                userPhotos: {...state.userPhotos},
                singlePhoto: {...state.singlePhoto}
            }
            newState.allPhotos[action.payload.id] = action.payload

            return newState
        }


        default:
            return state
    }
}
