import { useEffect, useState } from 'react';
import { Playlist } from '../../utils/getUserPlaylists';
import getUserPlaylists from '../../utils/getUserPlaylists';
import getPlaylistTracks from '../../utils/getPlaylistTracks';
import removePlaylistItem from '../../utils/removePlaylistItem';
import Tracklist from '../Tracklist/Tracklist';

const EditPlaylist = () => {
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

  return (
    <>
      <select
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
      {selectedPlaylistData && (
        <Tracklist
          handleEditClick={handleEditClick}
          listType="edit"
          tracks={selectedPlaylistData}
        />
      )}
    </>
  );
};

export default EditPlaylist;
