import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAlbums } from "../../store/albums";
import { NavLink } from "react-router-dom";
import "./AlbumsPage.css"

const AlbumsPage = () => {
    document.getElementsByClassName('bodyContainer')[0].style.background="linear-gradient(to top, rgb(33, 33, 33)75%, rgb(4, 37, 6)100%)"
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const albums = Object.values(useSelector((state) => state.albums));

    useEffect(() => {
      dispatch(fetchAlbums());
    }, [dispatch]);
  
    return (
        <div className="home-page">
            <div className="home-page-title">
                <h3>All Albums</h3>
            </div>
           
            <div className="playlists albums">
                {albums?.map((album) => (
                <div key={album.id} className="single-playlist single-album">
                    <NavLink exact to={`/albums/${album.id}`}>
                    {/* <div style={{backgroundImage: `url(${album.coverImage})`}}>Album</div> */}
                    <img src={album.coverImage} alt="coverImage"/>
                    <h4>{album.title}</h4>
                    <h5>{album.releasedYear} · {album.artist}</h5>
                    </NavLink>
                </div>
                ))}
            </div>
        </div>
    )
  }
  
  export default AlbumsPage