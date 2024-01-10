import Track, { TrackProps} from "../Track/Track"
import styles from './Tracklist.module.css';

export interface TracklistProps {
  tracks: TrackProps[],
  listType?: string,
  handleAddTrack?: (track: TrackProps) => void
}

const Tracklist = ({tracks, listType, handleAddTrack} :TracklistProps) => {
  return (
    <div className={listType === 'playlist' ? styles.playlistTracklist : styles.tracklist}>
      {tracks.map(track => {
        return <Track name={track.name} artist={track.artist} album={track.album} key={track.id} id={track.id} listType={listType} handleAddTrack={handleAddTrack}/>
      })}
    </div>
  )
}

export default Tracklist