import SaveButton from "../buttons/SaveButton";
import { TrackProps } from "../Track/Track";
import Tracklist from "../Tracklist/Tracklist";
import styles from './Playlist.module.css';

interface PlaylistProps {
  name: string;
  tracks: Array<TrackProps>;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveTrack: (track: TrackProps) => void;
}

const Playlist = ({ name, tracks, handleNameChange, handleRemoveTrack }:PlaylistProps)  => {
    return (
      <div className={styles.playlist}>
        <Tracklist listType='playlist' tracks={tracks} handleRemoveTrack={handleRemoveTrack} />
        <input className={styles.input} type="text" value={name} placeholder="playlist name..." onChange={handleNameChange}/>
        <SaveButton />
      </div>
  );
}

export default Playlist;