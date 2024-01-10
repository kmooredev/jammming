import { useState } from "react";
import SaveButton from "../buttons/SaveButton";
import Tracklist from "../Tracklist/Tracklist";
import styles from './Playlist.module.css';

const Playlist: React.FC = () => {
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [playlistTracks, ] = useState([
    {
      id: '1',
      name: 'Track 1',
      artist: 'Artist 1',
      album: 'Album 1'
    },
    {
      id: '2',
      name: 'Track 2',
      artist: 'Artist 2',
      album: 'Album 2'
    },
    {
      id: '3',
      name: 'Track 3',
      artist: 'Artist 3',
      album: 'Album 3'
    }
  ])

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(event.target.value);
  }
  
    return (
    <div className={styles.playlist}>
      <input type="text" value={playlistName} onChange={handleNameChange}/>
      <Tracklist kind='playlist' tracks={playlistTracks}/>
      <SaveButton />
    </div>
  );
}

export default Playlist;