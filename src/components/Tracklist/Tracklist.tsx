import Track, { TrackProps, TrackType } from '../Track/Track';
import styles from './Tracklist.module.css';

export interface TracklistProps {
  tracks: TrackProps[];
  listType?: string;
  handleAddTrack?: (track: TrackType) => void;
  handleRemoveTrack?: (track: TrackType) => void;
  handleEditClick?: (trackUri: string) => void;
}

const Tracklist = ({
  tracks,
  listType,
  handleAddTrack,
  handleRemoveTrack,
  handleEditClick,
}: TracklistProps) => {
  return (
    <div
      className={
        listType === 'playlist' || listType === 'edit'
          ? styles.playlistTracklist
          : styles.tracklist
      }
      style={
        tracks.length > 0 ? { border: '2px solid #cfb9f0' } : { border: 'none' }
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
            handleEditClick={handleEditClick}
          />
        );
      })}
    </div>
  );
};

export default Tracklist;
