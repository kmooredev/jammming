import Track, { TrackProps} from "./Track"

export interface TracklistProps {
  tracks: TrackProps[],
  styles?: React.CSSProperties
}

const Tracklist = ({tracks} :TracklistProps) => {
  return (
    <div>
      {tracks.map(track => {
        return <Track name={track.name} artist={track.artist} album={track.album} id={track.id}/>
      })}
    </div>
  )
}

export default Tracklist