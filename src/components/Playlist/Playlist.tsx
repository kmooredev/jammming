import SaveButton from '../buttons/SaveButton';
import { TrackProps } from '../Track/Track';
import Tracklist from '../Tracklist/Tracklist';
import styles from './Playlist.module.css';

interface PlaylistProps {
  name: string;
  tracks: Array<TrackProps>;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveTrack: (track: TrackProps) => void;
  handleSavePlaylist: () => void;
}

const Playlist = ({
  name,
  tracks,
  handleNameChange,
  handleRemoveTrack,
  handleSavePlaylist,
}: PlaylistProps) => {
  return (
    <div className={styles.playlist}>
      <input
        className={styles.input}
        type="text"
        value={name}
        placeholder="Name your playlist here"
        onChange={handleNameChange}
      />
      {tracks.length > 0 && (
        <Tracklist
          listType="playlist"
          tracks={tracks}
          handleRemoveTrack={handleRemoveTrack}
        />
      )}
      <SaveButton handleSavePlaylist={handleSavePlaylist} />
    </div>
  );
};

export default Playlist;
