import Track, { TrackProps} from "../Track/Track"
import styles from './Tracklist.module.css';

export interface TracklistProps {
  tracks: TrackProps[],
  listType?: string,
}

const Tracklist = ({tracks, listType} :TracklistProps) => {
  return (
    <div className={listType === 'playlist' ? styles.playlistTracklist : styles.tracklist}>
      {tracks.map(track => {
        return <Track name={track.name} artist={track.artist} album={track.album} id={track.id} listType={listType}/>
      })}
    </div>
  )
}

export default Tracklist