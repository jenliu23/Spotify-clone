import { updateAlbumSong, updateAlbumSongAdd } from "./songs"

// Constants
const GET_ALBUMS = "albums/GET_ALBUMS"
const CREATE_ALBUM = "albums/CREATE_ALBUM"
const UPDATE_ALBUM = "albums/UPDATE_ALBUM"
const REMOVE_ALBUM = "albums/REMOVE_ALBUM"
const ADD_SONG_TO_ALBUM = "albums/ADD_SONG_TO_ALBUM"
const REMOVE_SONG_FROM_ALBUM = "albums/REMOVE_SONG_FROM_ALBUM"

// Action creator
const getAlbums = (albums) => ({
    type: GET_ALBUMS,
    albums
})
const createAlbum = (album) => ({
    type: CREATE_ALBUM,
    album
})
const updateAlbum = (album) => ({
    type: UPDATE_ALBUM,
    album
})
const removeAlbum = (album) => ({
    type: REMOVE_ALBUM,
    album
})
const createSongToAlbum = (song) => ({
    type: ADD_SONG_TO_ALBUM,
    song
})
const removeSongFromAlbum = (song) => ({
    type: REMOVE_SONG_FROM_ALBUM,
    song
})

//Thunk Action Creators
export const fetchAlbums = () => async (dispatch) => {
    const res = await fetch("/api/albums/")

    if (res.ok) {
        const {albums} = await res.json();
        dispatch(getAlbums(albums));
        return albums
    }
}
export const uploadAlbum = (formData) => async (dispatch) => {
    const res = await fetch('/api/albums/new', {
        method: "POST",
        body: formData
    })

    if (res.ok) {
        const newAlbum = await res.json();
        console.log("albummmmm,", newAlbum)
        await dispatch(createAlbum(newAlbum.new_album))
        return newAlbum
    }
}
export const editAlbum = (album) => async (dispatch) => {
    const res = await fetch(`/api/albums/${album.id}`, {
        method: 'PUT',
        headers:{ "Content-Type" : 'application/json' },
        body: JSON.stringify(album)
    })
    if (res.ok) {
        const editedAlbum = await res.json();
        await dispatch(updateAlbum(editedAlbum.album))
        return editedAlbum
    }
}
export const deleteAlbum = (albumId) => async (dispatch) => {
    const res = await fetch(`/api/albums/${albumId}`, {
        method:'DELETE'
    })
    if(res.ok) {
        const album = await res.json();
        await dispatch(removeAlbum(album.album))
        return album
    }
}

export const addSongToAlbum = (songId, albumId) => async (dispatch) => {
    const res = await fetch(`/api/albums/${albumId}/songs/${songId}`, {
        method:'PUT',
        headers:{ "Content-Type" : 'application/json' },
    })
    if(res.ok) {
        const song = await res.json()
        await dispatch(createSongToAlbum(song["new_album_song"]))
        await dispatch(updateAlbumSongAdd(song["new_album_song"].songId, albumId))
        return song
    }
}
export const deleteSongFromAlbum = (song, albumId) => async (dispatch) => {
    const res = await fetch(`/api/albums/${albumId}/songs/${song.songId}/${song.album_songs_id}`, {
        method:'DELETE'
    })
    if(res.ok) {
        const song = await res.json();
        await dispatch(removeSongFromAlbum(song.album_song))
        await dispatch(updateAlbumSong(song.album_song.songId))
        return song
    }
}


//Reducer
const initialState = {}

const albumsReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_ALBUMS: {
            action.albums.forEach(album => {
                let newSongs = {}
                album.songs.forEach(song=>{
                    newSongs[song.songId] = song
                })
                album.songs = newSongs
                newState[album.id] = album
            })
            return newState;
        }
        case CREATE_ALBUM: {
            newState = {...state, [action.album.id]: action.album}
            return newState
        }
        case UPDATE_ALBUM: {
            return {...state, [action.album.id]: action.album}
        }
        case REMOVE_ALBUM: {
            newState = { ...state}
            delete newState[action.album.id]
            return newState;
        }
        case ADD_SONG_TO_ALBUM: {
            for(let albumId in state){
                newState[albumId] = { ...state[albumId], songs: { ...state[albumId].songs}}
            }
            newState[action.song.albumId].songs[action.song.songId] = action.song
            return newState;
        }
        case REMOVE_SONG_FROM_ALBUM: {
            for(let albumId in state){
                newState[albumId] = { ...state[albumId], songs: { ...state[albumId].songs}}
            }
            delete newState[action.song.albumId].songs[action.song.songId]
            return newState;
        }
        default:
            return state;
    }
}

export default albumsReducer;