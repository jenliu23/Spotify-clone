import './AudioBar.css'


const AudioBarPlayBtn = ({currentSong, songs}) => {
    console.log("songsssssfffff:", currentSong)


    return (
        <div >
            <div className="Audio-Bar">
                <button><i className="fa-solid fa-backward-step"></i></button>
                <button><i className="fa-solid fa-circle-play fa-lg"></i></button>
                <button><i className="fa-solid fa-forward-step"></i></button>
                <input type="range" />
            </div> 
        </div>


    )
}

export default AudioBarPlayBtn