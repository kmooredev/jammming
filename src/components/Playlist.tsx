import { useState } from "react";

import SaveButton from "./buttons/SaveButton";
import Tracklist from "./Tracklist";

const Playlist: React.FC = () => {
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

  const playlistTracklistStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '50%'
  }
  
  
    return (
    <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', width: '40%', gap: 5}}>
      <Tracklist styles={playlistTracklistStyle} tracks={playlistTracks}/>
      <div>
        <SaveButton />
      </div>
    </div>
  );
}

export default Playlist;