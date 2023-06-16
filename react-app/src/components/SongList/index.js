import React from "react";
import ReactPlayer from 'react-player';
// import { NavLink } from "react-router-dom";
const SongList = ({songs}) => {

    return (
        <div>
            <div>All Songs</div>
            {songs?.map((song) => (
                <div key={song.id}>
                    <h4>{song.title}</h4>
                    <h4>{song.artist}</h4>
                    <audio controls>
                        <source src={song.songUrl} type="audio/mp3"/>
                    </audio>
                </div>
            ))}
        </div>
    )
}

export default SongList
