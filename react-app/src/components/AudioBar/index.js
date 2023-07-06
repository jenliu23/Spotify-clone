import React, {useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { editCurrentPlayer } from '../../store/player';
import './AudioBar.css'

const AudioBar = () => {

    const dispatch = useDispatch();
    const [volume, setVolume] = useState(0.7)
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isEnded, setIsEnded] = useState(false);

    const audioPlayer = useRef()
    const progressBar = useRef()
    const animationRef = useRef()
    const volumeBar = useRef()

    const playlists = Object.values(useSelector((state) => state.playlists));

    const currentPlayer = useSelector((state) => state.player);

    const songlist_type = currentPlayer.songlist_type
    const songs = currentPlayer.current_songlist
    const current_song = currentPlayer.current_song
    const index = currentPlayer.index
    const isPlaying = currentPlayer.isPlaying
    const change = currentPlayer.change

    let playlistImgSrc;
    let playlistTitle;
    let playlistLink = "/";
    if(songlist_type && songlist_type.startsWith("PLAYLIST")){
        let playlistNumber =  parseInt(songlist_type.slice(8))
        playlistImgSrc = playlists[playlistNumber-1]?.coverImage
        playlistTitle = playlists[playlistNumber-1]?.title
        playlistLink = `/playlists/${playlistNumber}`
    }else if(songlist_type && songlist_type.startsWith("ALL")){
        playlistImgSrc = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/My+project-1.jpg";
        playlistTitle = "All songs list";
        playlistLink = "/songs"
    }
    
    const playORpause = () => {
        if(Object.values(current_song).length > 0){
        const prevValue = isPlaying;
        let play = dispatch(editCurrentPlayer(songlist_type, songs, current_song, index, !isPlaying, "none"))
            if (!prevValue) {
                audioPlayer.current.play();
            }else {
                audioPlayer.current.pause();
                cancelAnimationFrame(animationRef.current);
            }    
        }
    }


    const playAhead = () => {
        if(index > 0 && songs.length > 1){
            let play = dispatch(editCurrentPlayer(songlist_type, songs, songs[index-1], index-1, true, "ahead song"))
        }
    }
    const playNext = () => {
        if(index < songs.length - 1){
            let play = dispatch(editCurrentPlayer(songlist_type, songs, songs[index+1], index+1, true, "next song"))
        }
    }
    const changeVolume = (value) => {
        audioPlayer.current.volume = value;
        setVolume(value)
        volumeBar.current.style.setProperty('--volume', `${volumeBar.current.value * 100}%`)
    }
    const onDurationChangeHandler = (e) => {
        setDuration(Math.floor(e.target.duration));
    }
    const convertTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const returnedMin = min;
        const secs = Math.floor(seconds % 60);
        const returnedSecs = secs < 10 ? `0${secs}` : `${secs}`;
        return `${returnedMin}:${returnedSecs}`
    }
    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        progressBar.current.style.setProperty('--seek-before-width', `${(progressBar.current.value / duration) * 100}%`)
        setCurrentTime(progressBar.current.value)
    }
    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        progressBar.current.style.setProperty('--seek-before-width', `${(progressBar.current.value / duration) * 100}%`); 
        setCurrentTime(progressBar.current.value);
        animationRef.current = requestAnimationFrame(whilePlaying);
    }


    let volumeIcon;
    if(volume == 0){
        volumeIcon = <i className="fa-solid fa-volume-xmark"></i>
    }else if (volume < 0.5){
        volumeIcon = <i className="fa-solid fa-volume-low"></i>
    }else {
        volumeIcon = <i className="fa-solid fa-volume-high"></i>
    }


    useEffect(()=>{
        if(change === "start new song"){
            audioPlayer.current.play();
        }
        if(change === "stop"){
            audioPlayer.current.pause();
        }
        if(change === "change song"){
            audioPlayer.current.play();
            cancelAnimationFrame(animationRef.current);
        }
        if(change === "recover current song"){
            audioPlayer.current.play();
        }
        if(change === "next song"){
            audioPlayer.current.play();
        }
        if(change === "ahead song"){
            audioPlayer.current.play();
        }
        if(change === "start new playlist"){
            audioPlayer.current.play();
        }
        if(change === "delete song"){
            audioPlayer.current.pause();
        }
        if(change === "start new playlist on same song"){
            audioPlayer.current.currentTime = 0;
            audioPlayer.current.play();
        }if(change === "delete playlist"){
            audioPlayer.current.pause();
        }
    }, [change, current_song.songUrl])
    
    useEffect(()=>{
        setCurrentTime(audioPlayer?.current?.currentTime)
    }, [audioPlayer?.current?.currentTime])
    
    useEffect(()=>{
        cancelAnimationFrame(animationRef.current);
        if(isPlaying){
            animationRef.current = requestAnimationFrame(whilePlaying);
        }
    }, [isPlaying, duration, change])

    useEffect(()=>{
        if(isEnded && index < songs.length - 1){
            let play = dispatch(editCurrentPlayer(songlist_type, songs, songs[index+1], index+1, true, "next song"))
        }
        if(isEnded && index === songs.length - 1){
            let play = dispatch(editCurrentPlayer(songlist_type, songs, songs[0], 0, true, "next song"))
        }
        setIsEnded(false)
    }, [isEnded])


    return (
        <div >
            <audio ref={audioPlayer} src={current_song.songUrl} preload="metadata" onEnded={()=>setIsEnded(true)} onDurationChange={onDurationChangeHandler}></audio>
            <div className="Audio-Bar">
                <div id="btn1">
                    <div className={songlist_type? "":"hidden"}>
                        {/* <h5>{playlistTitle}</h5> */}
                        <NavLink exact to={playlistLink}><img src={playlistImgSrc} alt="cover" width="65px"/></NavLink>
                    </div>
                    <div>
                        <h3>{currentPlayer.current_song.title}</h3>
                        <h4>{currentPlayer.current_song.artist}</h4>  
                    </div>
                </div>
                <div id="btn2">
                    <div id="btn2-1">
                        <button onClick={playAhead} disabled={(index === 0 || songs.length === 1) ? true:false}>
                            <i className="fa-solid fa-backward-step"></i>
                        </button>

                        <button onClick={playORpause}>
                        {isPlaying === true ? (
                            <i className="fa-regular fa-circle-pause fa-lg"></i>
                            ):(
                            <i className="fa-regular fa-circle-play fa-lg"></i>
                            )}      
                        </button>

                        <button onClick={playNext}  disabled={(index == songs.length - 1 || songs.length === 1) ? true:false}>
                            <i className="fa-solid fa-forward-step"></i>
                        </button>
                    </div>

                    <div className={Object.values(current_song).length > 0 ? "btn2-2":"hidden btn2-2"}>
                        <h5>{convertTime(currentTime)}</h5>
                        <input type="range" min={0} max={duration} ref={progressBar} className="progressBar"
                            onChange={changeRange} />  
                        <h5>{!isNaN(duration) && convertTime(duration)}</h5>
                    </div>
                </div>
                <div id="btn3">
                    {volumeIcon}
                    <input type="range" min={0} max={1} step={0.02} ref={volumeBar} value={volume} className="volumeSlider" 
                        onChange={e => changeVolume(e.target.value)} />  
                </div>
            </div> 
        </div>
    )
}

export default AudioBar