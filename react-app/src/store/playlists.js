// Constants
const GET_PLAYLISTS = "playlists/GET_PLAYLISTS"
const CREATE_PLAYLIST = "playlists/CREATE_PLAYLIST"
const UPDATE_PLAYLIST = "playlists/UPDATE_PLAYLIST"
const REMOVE_PLAYLIST = "playlists/REMOVE_PLAYLIST"
const REMOVE_SONG_FROM_PLAYLIST = "playlists/REMOVE_SONG_FROM_PLAYLIST"

// Action creator
const getPlaylists = (playlists) => ({
    type: GET_PLAYLISTS,
    playlists
})
const createPlaylist = (playlist) => ({
    type: CREATE_PLAYLIST,
    playlist
})
const updatePlaylist = (playlist) => ({
    type: UPDATE_PLAYLIST,
    playlist
})
const removePlaylist = (playlist) => ({
    type: REMOVE_PLAYLIST,
    playlist
})

const removeSongFromPL = (song) => ({
    type: REMOVE_SONG_FROM_PLAYLIST,
    song
})

//Thunk Action Creators
export const fetchPlaylists = () => async (dispatch) => {
    const res = await fetch("/api/playlists/")

    if (res.ok) {
        const {playlists} = await res.json();
        dispatch(getPlaylists(playlists));
    }
}
export const addPlaylist = (playlist) => async (dispatch) => {
    const res = await fetch('/api/playlists/new', {
        method:'POST',
        headers:{ "Content-Type" : 'application/json' },
        body: JSON.stringify(playlist)
    })
    if (res.ok) {
        const playlist = await res.json();
        dispatch(createPlaylist(playlist.playlist))
    }
}
export const editPlaylist = (playlist) => async (dispatch) => {
    const res = await fetch(`/api/playlists/${playlist.id}`, {
        method:'PUT',
        headers:{ "Content-Type" : 'application/json' },
        body: JSON.stringify(playlist)
    })
    if (res.ok) {
        const playlist = await res.json();
        dispatch(updatePlaylist(playlist.playlist))
    }
}
export const deletePlaylist = (playlistId) => async (dispatch) => {
    const res = await fetch(`/api/playlists/${playlistId}`, {
        method:'DELETE'
    })
    if(res.ok) {
        const playlist = await res.json();
        dispatch(removePlaylist(playlist.playlist))
    }
}


export const deleteSongFromPL = (song) => async (dispatch) => {
    const res = await fetch(`/api/playlists/${song.playlistId}/songs/${song.songId}/${song.playlist_songs_id}`, {
        method:'DELETE'
    })
    if(res.ok) {
        const song = await res.json();
        dispatch(removeSongFromPL(song.playlist_song))
    }
}
//Reducer
const initialState = {}

const playlistsReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_PLAYLISTS: {
            action.playlists.forEach(playlist => {
                newState[playlist.id] = playlist
            })
            return newState;
        }
        case CREATE_PLAYLIST: {
            newState = {...state, [action.playlist.id]: action.playlist}
            return newState;
        }
        case UPDATE_PLAYLIST: {
            newState = { ...state}
            newState[action.playlist.id] = action.playlist
            return newState
        }
        case REMOVE_PLAYLIST: {
            newState = { ...state}
            delete newState[action.playlist.id]
            return newState;
        }
        case REMOVE_SONG_FROM_PLAYLIST: {
            newState = { ...state}
            let index = newState[action.song.playlistId].songs.findIndex(ele=>ele.playlist_songs_id === action.song.playlist_songs_id)
console.log("index", index)

            newState[action.song.playlistId]["songs"].splice(index, 1)
console.log("newState", newState)
            return newState
        }
        default:
            return state;
    }
}

export default playlistsReducer;