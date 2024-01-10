import Track, { TrackProps} from "../Track"
import styles from './Tracklist.module.css';

export interface TracklistProps {
  tracks: TrackProps[],
  kind?: string
}

const Tracklist = ({tracks, kind} :TracklistProps) => {
  return (
    <div className={kind === 'playlist' ? styles.playlistTracklist : styles.tracklist}>
      {tracks.map(track => {
        return <Track name={track.name} artist={track.artist} album={track.album} id={track.id}/>
      })}
    </div>
  )
}

export default Tracklist