import { fetchSongs } from "./songs"

// Constants
const CURRENT_PLAYER = "player/CURRENT_PLAYER"


// Action creator
const currentPlayer = (songlist_type, songs, song, index, isPlaying, change) => ({
    type: CURRENT_PLAYER,
    songlist_type,
    songs,
    song,
    index,
    isPlaying,
    change
})

// Thunk Action Creators
export const editCurrentPlayer = (songlist_type, songs, song, index, isPlaying, change) => async (dispatch) => {

    return dispatch(currentPlayer(songlist_type, songs, song, index, isPlaying, change))
}

//Reducer
const initialState = {
    songlist_type: "",
    current_songlist : [],
    current_song: {},
    index: NaN,
    isPlaying: false,
    change: "none"
}

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_PLAYER: {
            let newState = {...state}
            newState = {
                songlist_type: action.songlist_type,
                current_songlist: action.songs,
                current_song: action.song,
                index: action.index,
                isPlaying: action.isPlaying,
                change: action.change
            }
            return newState
        }
        default:
            return state
    }

}

export default playerReducer