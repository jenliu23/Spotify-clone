// // import { fetchSongs } from "./songs"

// // Constants
// const CURRENT_SONG_TRACK = "track/CURRENT_SONG_TRACK"


// // Action creator
// const currentSongTrack = (song) => ({
//     type: CURRENT_SONG_TRACK,
//     song
// })

// // Thunk Action Creators
// export const getCurrentSongTrack = (song) => async (dispatch) => {
// //     const res = await fetch("/api/songs/")

// //     if (res.ok) {
// //         const {songs} = await res.json();
// // // console.log("songs in thunk:", songs)
// //         dispatch(getSongs(songs));
// //     }
//     dispatch(currentSongTrack(song))
// }

// //Reducer
// const initialState = {}

// const trackReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case CURRENT_SONG_TRACK: {
//             let newState = {...state}
//             newState[action.song.id] = action.song
//             return newState
//         }
//     }

// }

// export default trackReducer