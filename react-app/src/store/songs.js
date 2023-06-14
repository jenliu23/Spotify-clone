// Constants
const GET_SONGS = "songs/GET_SONGS"


// Action creator
const getSongs = (songs) => ({
    type: GET_SONGS,
    songs
})


//Thunk Action Creators
export const fetchSongs = () => async (dispatch) => {
    const res = await fetch("/api/songs/all")

    if (res.ok) {
        const {songs} = await res.json();
console.log("songs in thunk:", songs)
        dispatch(getSongs(songs));
    }
}





//Reducer
const initialState = {}

const songsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SONGS: {
            let newAllSongs = {}
            action.songs.forEach(song => {
                newAllSongs[song.id] = song
            })
            return newAllSongs;
        }
        default:
            return state;
    }

}

export default songsReducer;