//constants
const GET_ALL_ALBUMS = "albums/GET_ALL"
const EDIT_ALBUM = "albums/EDIT"
const DELETE_ALBUM = "albums/DELETE"

//GET ALL ALBUMS
const getAllAlbumsAction = (albums) => {
    return {
        type: GET_ALL_ALBUMS,
        payload: albums
    }
}

export const getAllAlbumsThunk = () => async (dispatch) => {
    const response = await fetch("/api/photos/albums/all")
    if (response.ok){
        const data = await response.json()
        await dispatch(getAllAlbumsAction(data))
        return data
    } else {
        const data = await response.json()
        return data
    }
}

//EDIT AN ALBUM BY ID
const updateAlbumAction = (album) => {
    return{
        type: EDIT_ALBUM,
        payload: album
    }
}

export const updateAlbumThunk = (albumId, albumData) => async (dispatch) => {
    const response = await fetch(`/api/photos/albums/${albumId}/edit`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(albumData),
    });
    if (response.ok){
        const data = await response.json();
        await dispatch(updateAlbumAction(data))
        return data
    } else {
        const data = await response.json()
        return {"Failure": data}
    }
}

//DELETE ALBUM
const deleteAlbumAction = (albumId) => {
    return {
        type: DELETE_ALBUM,
        payload: albumId
    }
}

export const deleteAlbumThunk = (albumId) => async (dispatch) => {
    const response = await fetch(`/api/photos/albums/${albumId}/delete`, {
        method: 'DELETE',
    })
    if (response.ok){
        await dispatch(deleteAlbumAction(albumId))
        return null
    } else {
        const data = await response.json()
        return data;
    }
}


const initialState = {allAlbums: null, singleAlbum: null}

export default function reducer(state = initialState, action) {
    switch (action.type){
        case GET_ALL_ALBUMS: {
            const newState = {
                ...state,
                allAlbums: {},
            }
            action.payload.forEach(album => {
                newState.allAlbums[album.id] = album
            })
            return newState;
        }
        case EDIT_ALBUM: {
            const newState = {
                ...state,
                allAlbums: {...state.allAlbums},
            }
            newState.allAlbums[action.payload.id] = action.payload;

            return newState;
        }
        case DELETE_ALBUM: {
            const newState = {
                ...state,
                allAlbums: {...state.allAlbums},
            }

            delete newState.allAlbums[action.payload]
            return newState;
        }


        default:
            return state
    }
}
