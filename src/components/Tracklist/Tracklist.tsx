import Track, { TrackProps, TrackType } from '../Track/Track';
import styles from './Tracklist.module.css';

export interface TracklistProps {
  tracks: TrackProps[];
  listType?: string;
  handleAddTrack?: (track: TrackType) => void;
  handleRemoveTrack?: (track: TrackType) => void;
}

const Tracklist = ({
  tracks,
  listType,
  handleAddTrack,
  handleRemoveTrack,
}: TracklistProps) => {
  return (
    <div
      className={
        listType === 'playlist' ? styles.playlistTracklist : styles.tracklist
      }
    >
      {tracks.map((track) => {
        return (
          <Track
            name={track.name}
            artist={track.artist}
            album={track.album}
            key={track.id}
            id={track.id}
            uri={track.uri}
            listType={listType}
            handleAddTrack={handleAddTrack}
            handleRemoveTrack={handleRemoveTrack}
          />
        );
      })}
    </div>
  );
};

export default Tracklist;
