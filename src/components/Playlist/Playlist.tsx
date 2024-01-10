import SaveButton from "../buttons/SaveButton";
import { TrackProps } from "../Track/Track";
import Tracklist from "../Tracklist/Tracklist";
import styles from './Playlist.module.css';

interface PlaylistProps {
  name: string;
  tracks: Array<TrackProps>;
}

const Playlist = ({ name, tracks}:PlaylistProps)  => {

    return (
      <div className={styles.playlist}>
        <Tracklist listType='playlist' tracks={tracks}/>
        <input className={styles.input} type="text" value={name} placeholder="playlist name..."/>
        <SaveButton />
      </div>
  );
}

export default Playlist;