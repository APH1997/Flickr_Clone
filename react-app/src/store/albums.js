//constants
const GET_ALL_ALBUMS = "albums/GET_ALL"
const EDIT_ALBUM = "albums/EDIT"

//GET ALL ALBUMS
const getAllAlbumsAction = (albums) => {
    return {
        type: GET_ALL_ALBUMS,
        payload: albums
    }
}

export const getAllAlbumsThunk = () => async (dispatch) => {
    const response = await fetch("/photos/albums/all")
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
const editAlbumAction = (albumId) => {
    return{
        type: EDIT_ALBUM,
        payload: albumId
    }
}

export const updateAlbumThunk = (albumId, albumData) => async (dispatch) => {
    const response = await fetch(`/photos/albums/${albumId}/edit`, {
        method: 'PUT',
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

const initialState = {allAlbums: null, singleAlbum: null}

export default function reducer(state = initialState, action) {
    switch (action.type){
        case GET_ALL_ALBUMS: {
            const newState = {
                ...state,
                allAlbums: {...state.allAlbums},
                singleAlbum: {...state.singleAlbum}
            }
            action.payload.forEach(album => {
                newState.allAlbums[album.id] = album
            })
            return newState;
        }


        default:
            return state
    }
}
