import { useEffect, useState } from 'react';
import { Playlist } from '../../utils/getUserPlaylists';
import getUserPlaylists from '../../utils/getUserPlaylists';
import getPlaylistTracks from '../../utils/getPlaylistTracks';
import removePlaylistItem from '../../utils/removePlaylistItem';
import Tracklist from '../Tracklist/Tracklist';
import { TrackType } from '../Track/Track';
import addPlaylistItem from '../../utils/addPlaylistItem';
import style from './EditPlaylist.module.css';

interface EditPlaylistProps {
  tracksToAdd: TrackType[];
  handleRemoveTrack: (track: TrackType) => void;
  resetPlaylistTracks: React.Dispatch<React.SetStateAction<TrackType[]>>;
}

const EditPlaylist = ({
  tracksToAdd,
  handleRemoveTrack,
  resetPlaylistTracks,
}: EditPlaylistProps) => {
  const [currentUserPlaylists, setCurrentUserPlaylists] = useState<Playlist[]>(
    []
  );
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>(
    currentUserPlaylists[0]?.id
  );
  const [selectedPlaylistData, setSelectedPlaylistData] = useState([]);
  const [itemToRemove, setItemToRemove] = useState<string>('');

  useEffect(() => {
    getUserPlaylists().then((playlists) => {
      setCurrentUserPlaylists(playlists);
    });
  }, []);

  useEffect(() => {
    if (!selectedPlaylistId) return;
    getPlaylistTracks(selectedPlaylistId).then((tracks) => {
      setSelectedPlaylistData(tracks);
    });
  }, [selectedPlaylistId]);

  const handleEditClick = (trackUri: string) => {
    setItemToRemove(trackUri);
  };

  useEffect(() => {
    if (!itemToRemove) return;
    removePlaylistItem(selectedPlaylistId, itemToRemove)
      .then(() => {
        setItemToRemove('');
        const tracks = getPlaylistTracks(selectedPlaylistId);
        return tracks;
      })
      .then((tracks) => {
        setSelectedPlaylistData(tracks);
      });
  }, [itemToRemove, selectedPlaylistId]);

  const [additionalTracks, setAdditionalTracks] = useState<string[]>(
    tracksToAdd.map((track) => track.uri) || []
  );

  useEffect(() => {
    setAdditionalTracks(tracksToAdd.map((track) => track.uri));
  }, [tracksToAdd]);
  return (
    <div className={style.container}>
      <div className={style.editSettings}>
        <h3>Edit a Playlist</h3>
        <select
          className={style.select}
          value={selectedPlaylistId}
          onChange={(e) => setSelectedPlaylistId(e.target.value)}
        >
          <option value="0">Select a playlist</option>
          {currentUserPlaylists.map((playlist) => (
            <option value={playlist.id} key={playlist.id}>
              {playlist.name}
            </option>
          ))}
        </select>
      </div>
      <div className={style.double_playlist_container}>
        <div className={style.playlist_container}>
          {selectedPlaylistData && (
            <Tracklist
              handleEditClick={handleEditClick}
              listType="edit"
              tracks={selectedPlaylistData}
            />
          )}
        </div>
        {tracksToAdd.length > 0 && (
          <div className={style.tracksToAdd}>
            <Tracklist
              listType="playlist"
              tracks={tracksToAdd}
              handleRemoveTrack={handleRemoveTrack}
            />
            <button
              onClick={() =>
                addPlaylistItem(selectedPlaylistId, additionalTracks).then(() =>
                  resetPlaylistTracks([])
                )
              }
            >
              Add Tracks to Playlist
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPlaylist;
