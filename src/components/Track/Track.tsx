import styles from './Track.module.css';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';

export interface TrackProps {
  name: string;
  artist: string;
  album: string;
  id: string;
  listType?: string;
}

const Track = ({name, artist, album, id, listType}: TrackProps) => {
  return (
    <div className={styles.container} key={id}>
      <p className={styles.trackName}>{name}</p>
      <div className={styles.detailsContainer}>
        <p className={styles.trackDetails}>{album}</p>
        <p className={styles.trackDetails}>{artist}</p>
        {listType === 'results' ? <IoAddCircle className={styles.button}/> : <IoRemoveCircle className={styles.button}/>}
      </div>
    </div>
  )
}

export default Track;