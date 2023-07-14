import React, {useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { editCurrentPlayer } from '../../store/player';
import './AudioBar.css'
import { fetchPlaylists } from "../../store/playlists";

const AudioBar = () => {

    const dispatch = useDispatch();
    const [volume, setVolume] = useState(0.5)
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isEnded, setIsEnded] = useState(false);
    const [looping, setLooping] = useState(false);
    const [shuffled, setShuffled] = useState(false);

    const audioPlayer = useRef()
    const progressBar = useRef()
    const animationRef = useRef()
    const volumeBar = useRef()

    const playlists = useSelector((state) => state.playlists);

    const currentPlayer = useSelector((state) => state.player);

    const songlist_type = currentPlayer.songlist_type
    const songs = currentPlayer.current_songlist
    const current_song = currentPlayer.current_song
    const index = currentPlayer.index
    const isPlaying = currentPlayer.isPlaying
    const change = currentPlayer.change

    let playlistNumber;
    let playlistImgSrc;
    let playlistTitle;
    let playlistLink = "/";
    if(songlist_type && songlist_type.startsWith("PLAYLIST")){
        playlistNumber = parseInt(songlist_type.slice(8))
        playlistImgSrc = playlists[playlistNumber]?.coverImage
        playlistTitle = playlists[playlistNumber]?.title
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

    const shuffle = () => {
        if(!shuffled){
            setShuffled(true);
        }else{
            setShuffled(false);
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
    const loop = () => {
        if(looping === "loop"){
            setLooping(false)
            audioPlayer.current.loop = false
        }else{
            setLooping("loop")
            audioPlayer.current.loop = "loop"
        }
    }

    const changeVolume = (value) => {
        audioPlayer.current.volume = value;
        setVolume(value)
        volumeBar.current.style.setProperty('--volume', `${volumeBar.current.value * 100}%`)
    }
    const muteVolume = () => {
        if(volume !== 0){
            changeVolume(0)
        }else{
            changeVolume(0.5)
        }
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
        volumeIcon = "fa-solid fa-volume-xmark"
    }else if (volume < 0.5){
        volumeIcon = "fa-solid fa-volume-low"
    }else {
        volumeIcon = "fa-solid fa-volume-high"
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
        if(change === "shuffle song"){
            audioPlayer.current.play();
        }
        if(change === "next song"){
            audioPlayer.current.play();
        }
        if(change === "ahead song"){
            audioPlayer.current.play();
        }
        if(change === "start new playlist"){
            setShuffled(false);
            setLooping(false);
            audioPlayer.current.play();
        }
        if(change === "delete song"){
            audioPlayer.current.pause();
        }
        if(change === "delete last song"){
            setShuffled(false);
            setLooping(false);
            audioPlayer.current.pause();
            audioPlayer.current.currentTime = 0;
            progressBar.current.style.setProperty('--seek-before-width', "0"); 
        }
        if(change === "start new playlist on same song"){
            setShuffled(false);
            setLooping(false);
            audioPlayer.current.currentTime = 0;
            audioPlayer.current.play();
        }if(change === "delete playlist"){
            setShuffled(false);
            setLooping(false);
            audioPlayer.current.pause();
            audioPlayer.current.currentTime = 0;
            progressBar.current.style.setProperty('--seek-before-width', "0"); 
        }
    }, [change, current_song.songUrl, songlist_type])

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
        if(!shuffled){
            if(isEnded && index < songs.length - 1){
                let play = dispatch(editCurrentPlayer(songlist_type, songs, songs[index+1], index+1, true, "next song"))
            }
            if(isEnded && index === songs.length - 1){
                let play = dispatch(editCurrentPlayer("", [], {}, NaN, false, "none"))
                setDuration(0)
            }
            setIsEnded(false)
        }else{
            if(isEnded){
                let randomIndex = Math.floor(Math.random() * (songs.length));
                let play = dispatch(editCurrentPlayer(songlist_type, songs, songs[randomIndex], randomIndex, true, "shuffle song"))
            }
            setIsEnded(false)
        }
    }, [isEnded])

    useEffect(()=>{
        volumeBar.current.style.setProperty('--volume', `${volumeBar.current.value * 100}%`)
    }, [volume])


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
                        <button onClick={shuffle} id={shuffled ? "shuffle-icon":""} disabled={songs.length <= 1}>
                            <i className="fa-solid fa-shuffle fa-2xs"></i>
                        </button>

                        <button onClick={playAhead} disabled={(index === 0 || songs.length === 1) || Object.values(current_song).length === 0}>
                            <i className="fa-solid fa-backward-step fa-sm"></i>
                        </button>

                        <button onClick={playORpause} disabled={Object.values(current_song).length === 0}>
                        {isPlaying === true ? (
                            <i className="fa-regular fa-circle-pause fa-lg"></i>
                            ):(
                            <i className="fa-regular fa-circle-play fa-lg"></i>
                            )}      
                        </button>

                        <button onClick={playNext}  disabled={(index == songs.length - 1 || songs.length === 1) || Object.values(current_song).length === 0}>
                            <i className="fa-solid fa-forward-step fa-sm"></i>
                        </button>

                        <button onClick={loop} id={looping === "loop" ? "loop-icon":""} disabled={songs.length === 0}>
                            <i className="fa-solid fa-repeat fa-2xs"></i>
                        </button>
                    </div>

                    <div className="btn2-2">
                        <h5>{Object.values(current_song).length > 0 ? convertTime(currentTime):"--.--"}</h5>
                        <input type="range" min={0} max={duration} ref={progressBar} className="progressBar"
                            onChange={changeRange} disabled={change === "delete last song" || change === "delete playlist" ? true:false}/>  
                        <h5>{Object.values(current_song).length > 0 ? (!isNaN(duration) && convertTime(duration)):"--.--"}</h5>
                    </div>
                </div>
                <div id="btn3">
                    <i className={volumeIcon} onClick={muteVolume}></i>
                    <input type="range" min={0} max={1} step={0.02} ref={volumeBar} value={volume} className="volumeSlider" 
                        onChange={e => changeVolume(e.target.value)} />  
                </div>
            </div> 
        </div>
    )
}

export default AudioBar