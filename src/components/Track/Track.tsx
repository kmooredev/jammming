import styles from './Track.module.css';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';

export type TrackType = {
  name: string;
  artist: string;
  album: string;
  id: string;
  uri: string;
};

export interface TrackProps {
  name: string;
  artist: string;
  album: string;
  id: string;
  uri: string;
  listType?: string;
  key?: string;
  handleAddTrack?: (track: TrackType) => void;
  handleRemoveTrack?: (track: TrackType) => void;
  handleEditClick?: (trackUri: string) => void;
}

const Track = ({
  name,
  artist,
  album,
  id,
  uri,
  listType,
  handleAddTrack,
  handleRemoveTrack,
  handleEditClick,
}: TrackProps) => {
  const track = {
    name: name,
    artist: artist,
    album: album,
    id: id,
    key: id,
    uri: uri,
  };
  return (
    <div className={styles.container} key={id}>
      <p className={styles.trackName}>"{name}"</p>
      <div className={styles.detailsContainer}>
        <p className={styles.trackDetails}>
          <span className={styles.trackDetails__span}>Album: </span>
          {album}
        </p>
        <p className={styles.trackDetails}>
          <span className={styles.trackDetails__span}>Artist: </span>
          {artist}
        </p>
        {listType === 'results' ? (
          <IoAddCircle
            onClick={() => handleAddTrack && handleAddTrack(track)}
            className={styles.addButton}
          />
        ) : listType === 'edit' ? (
          <IoRemoveCircle
            onClick={() => handleEditClick && handleEditClick(track.uri)}
            className={styles.removeButton}
          />
        ) : (
          <IoRemoveCircle
            onClick={() => handleRemoveTrack && handleRemoveTrack(track)}
            className={styles.removeButton}
          />
        )}
      </div>
    </div>
  );
};

export default Track;
