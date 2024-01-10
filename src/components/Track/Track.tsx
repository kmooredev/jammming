import styles from './Track.module.css';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';

export type TrackType = {
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
  handleAddTrack?: (track: TrackType) => void;
}

const Track = ({name, artist, album, id, listType, handleAddTrack}: TrackProps) => {
  const track = {name: name, artist: artist, album: album, id: id, key: id};
  return (
    <div className={styles.container} key={id}>
      <p className={styles.trackName}>{name}</p>
      <div className={styles.detailsContainer}>
        <p className={styles.trackDetails}>{album}</p>
        <p className={styles.trackDetails}>{artist}</p>
        {listType === 'results' ? <IoAddCircle onClick={() => handleAddTrack && handleAddTrack(track)} className={styles.addButton}/> : <IoRemoveCircle className={styles.removeButton}/>}
      </div>
    </div>
  )
}

export default Track;