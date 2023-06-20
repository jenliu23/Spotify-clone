// Constants
const GET_PLAYLISTS = "playlists/GET_PLAYLISTS"
const CREATE_PLAYLIST = "playlists/CREATE_PLAYLIST"
const UPDATE_PLAYLIST = "playlists/UPDATE_PLAYLIST"
const REMOVE_PLAYLIST = "playlists/REMOVE_PLAYLIST"
const ADD_SONG_TO_PLAYLIST = "playlists/ADD_SONG_TO_PLAYLIST"
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
const createSongToPL = (song) => ({
    type: ADD_SONG_TO_PLAYLIST,
    song
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
        return playlists
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
        return playlist
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
        return playlist
    }
}
export const deletePlaylist = (playlistId) => async (dispatch) => {
    const res = await fetch(`/api/playlists/${playlistId}`, {
        method:'DELETE'
    })
    if(res.ok) {
        const playlist = await res.json();
        dispatch(removePlaylist(playlist.playlist))
        return playlist
    }
}


export const addSongToPL = (song, playlistId) => async (dispatch) => {
    const res = await fetch(`/api/playlists/${playlistId}/songs/new/${song.id}`, {
        method:'PUT',
        headers:{ "Content-Type" : 'application/json' },
        // body: JSON.stringify(song)
    })
    if(res.ok) {
        const song = await res.json()
        dispatch(createSongToPL(song["new_playlist_song"]))
        return song
    }
}
export const deleteSongFromPL = (song) => async (dispatch) => {
    const res = await fetch(`/api/playlists/${song.playlistId}/songs/${song.songId}/${song.playlist_songs_id}`, {
        method:'DELETE'
    })
    if(res.ok) {
        const song = await res.json();
        dispatch(removeSongFromPL(song.playlist_song))
        return song
    }
}

//Reducer
const initialState = {
    // allPlaylist: {},
    // singlePlaylist: {}
}

const playlistsReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_PLAYLISTS: {
            action.playlists.forEach(playlist => {
                let newSongs = {}
                playlist.songs.forEach(song=>{
                    newSongs[song.songId] = song
                })
                playlist.songs = newSongs
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
        case ADD_SONG_TO_PLAYLIST: {
            newState = { ...state}
console.log("newState before", newState)
            newState[action.song.playlistId].songs[action.song.songId] = action.song
console.log("waht is nlsdfj", action.song)
console.log("newState after", newState)
            return newState;
        }
        case REMOVE_SONG_FROM_PLAYLIST: {
// console.log("old newState", newState)
// console.log("State", state)
//             newState = { ...state}
// console.log("newState before", newState)
//             let index = newState[action.song.playlistId].songs.findIndex(ele=>ele.playlist_songs_id === action.song.playlist_songs_id)
// console.log("index", index)
//             newState[action.song.playlistId]["songs"].splice(index, 1)
// console.log("newState after", newState)
//             return newState
console.log("State", state)
            newState = { ...state}
console.log("newState before", newState)
            delete newState[action.song.playlistId].songs[action.song.songId]
console.log("newState after", newState)
            return newState
        }

        default:
            return state;
    }
}

export default playlistsReducer;