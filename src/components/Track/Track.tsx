import styles from './Track.module.css';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';

export type Track = {
  name: string;
  artist: string;
  album: string;
  id: string;
}

export interface TrackProps {
  name: string;
  artist: string;
  album: string;
  id: string;
  listType?: string;
  key?: string;
  handleAddTrack?: (track: Track) => void;
}

const Track = ({name, artist, album, id, listType, handleAddTrack}: TrackProps) => {
  return (
    <div className={styles.container} key={id}>
      <p className={styles.trackName}>{name}</p>
      <div className={styles.detailsContainer}>
        <p className={styles.trackDetails}>{album}</p>
        <p className={styles.trackDetails}>{artist}</p>
        {listType === 'results' ? <IoAddCircle onClick={handleAddTrack} className={styles.addButton}/> : <IoRemoveCircle className={styles.removeButton}/>}
      </div>
    </div>
  )
}

export default Track;