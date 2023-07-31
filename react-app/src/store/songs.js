// Constants
const GET_SONGS = "songs/GET_SONGS"
const CREATE_SONG = "songs/CREATE_SONG"
const UPDATE_SONG = "songs/UPDATE_SONG"
const REMOVE_SONG = "songs/REMOVE_SONG"
const UPDATE_ALBUM_SONG = "songs/UPDATE_ALBUM_SONG"
const UPDATE_ALBUM_SONG_ADD = "songs/UPDATE_ALBUM_SONG_ADD"

// Action creator
const getSongs = (songs) => ({
    type: GET_SONGS,
    songs
})
const createSong = (song) => ({
    type: CREATE_SONG,
    song
})
const updateSong = (song) => ({
    type: UPDATE_SONG,
    song
})
const removeSong = (song) => ({
    type: REMOVE_SONG,
    song
})
export const updateAlbumSong = (songId) => ({
    type: UPDATE_ALBUM_SONG,
    songId
})
export const updateAlbumSongAdd = (songId, albumId) => ({
    type: UPDATE_ALBUM_SONG_ADD,
    songId,
    albumId
})

//Thunk Action Creators
export const fetchSongs = () => async (dispatch) => {
    const res = await fetch("/api/songs/")

    if (res.ok) {
        const {songs} = await res.json();
// console.log("songs in thunk:", songs)
        dispatch(getSongs(songs));
    }
}

export const uploadSong = (formData) => async (dispatch) => {
    const res = await fetch('/api/songs/new', {
        method: "POST",
        body: formData
    })
    if (res.ok) {
        const newSong = await res.json();
        await dispatch(createSong(newSong.new_song))
        return newSong
    }
}

export const editSong = (editedSong) => async (dispatch) => {
    const res = await fetch(`api/songs/${editedSong.id}`, {
        method: 'PUT',
        headers:{ "Content-Type" : 'application/json' },
        body: JSON.stringify(editedSong)
    })
    if (res.ok) {
        const editedSong = await res.json();
        await dispatch(updateSong(editedSong.song))
        return editedSong
    }
}

export const deleteSong = (song) => async (dispatch) => {
    const res = await fetch(`api/songs/${song.id}`, {
        method:'DELETE'
    })
    if(res.ok) {
        const deletedSong = await res.json();
        dispatch(removeSong(deletedSong.song_delete))
    }
}

//Reducer
const initialState = {}

const songsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SONGS: {
            let newState = {}
            action.songs.forEach(song => {
                newState[song.id] = song
            })
            return newState;
        }
        case CREATE_SONG: {
            let newState = {}
            newState = {...state, [action.song.id]: action.song}
            return newState
        }
        case UPDATE_SONG: {
            return {...state, [action.song.id]: action.song}
        }
        case REMOVE_SONG: {
            let newState = {...state}
            delete newState[action.song.id]
            return newState
        }
        case UPDATE_ALBUM_SONG: {
            let newState = {...state}
            newState[action.songId].albumId = []
            return newState
        }
        case UPDATE_ALBUM_SONG_ADD: {
            let newState = {...state}
            newState[action.songId].albumId = [action.albumId]
            return newState
        }
        default:
            return state;
    }

}

export default songsReducer;