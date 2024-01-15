import SaveButton from '../buttons/SaveButton';
import { TrackProps } from '../Track/Track';
import Tracklist from '../Tracklist/Tracklist';
import styles from './CreatePlaylist.module.css';

interface PlaylistProps {
  name: string;
  tracks: Array<TrackProps>;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveTrack: (track: TrackProps) => void;
  handleSavePlaylist: () => void;
  handleSaveTracksToPlaylist: () => void;
}

const CreatePlaylist = ({
  name,
  tracks,
  handleNameChange,
  handleRemoveTrack,
  handleSavePlaylist,
  handleSaveTracksToPlaylist,
}: PlaylistProps) => {
  return (
    <div className={styles.playlist}>
      <h3>Create A Playlist</h3>
      <div className={styles.playlist__name}>
        <input
          className={styles.input}
          type="text"
          value={name}
          placeholder="Name your playlist here"
          onChange={handleNameChange}
        />
        <button
          className={styles.playlist__saveButton}
          onClick={handleSavePlaylist}
        >
          Create Playlist
        </button>
      </div>
      {tracks.length > 0 ? (
        <Tracklist
          listType="playlist"
          tracks={tracks}
          handleRemoveTrack={handleRemoveTrack}
        />
      ) : (
        <p className={styles.playlist__message}>
          Add tracks from the search results to create a playlist
        </p>
      )}
      <SaveButton handleSaveTracksToPlaylist={handleSaveTracksToPlaylist} />
    </div>
  );
};

export default CreatePlaylist;
