import { fetchSongs } from "./songs"

// Constants
const CURRENT_PLAYER = "player/CURRENT_PLAYER"


// Action creator
const currentPlayer = (songs, song, isPlaying, change) => ({
    type: CURRENT_PLAYER,
    songs,
    song,
    isPlaying,
    change
})

// Thunk Action Creators
export const editCurrentPlayer = (songs, song, isPlaying, change) => async (dispatch) => {

    return dispatch(currentPlayer(songs, song, isPlaying, change))
}

//Reducer
const initialState = {
    current_song: {},
    current_songlist : [],
    queue: [],
    change: false,
    isPlaying: false
}

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_PLAYER: {
            let newState = {...state}
            newState = {
                current_songlist: action.songs,
                current_song: action.song,
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