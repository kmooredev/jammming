import { useEffect, useState } from 'react';
import { Playlist } from '../../utils/getUserPlaylists';
import getUserPlaylists from '../../utils/getUserPlaylists';
import getPlaylistTracks from '../../utils/getPlaylistTracks';
import Tracklist from '../Tracklist/Tracklist';
// interface EditPlaylistProps {
//   currentUserPlaylists: {
//     name: string;
//     id: string;
//   }[];
// }

const EditPlaylist = () => {
  const [currentUserPlaylists, setCurrentUserPlaylists] = useState<Playlist[]>(
    []
  );
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>(
    currentUserPlaylists[0]?.id
  );
  const [selectedPlaylistData, setSelectedPlaylistData] = useState([]);

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

  return (
    <>
      <select
        value={selectedPlaylistId}
        onChange={(e) => setSelectedPlaylistId(e.target.value)}
      >
        {currentUserPlaylists.map((playlist) => (
          <option value={playlist.id} key={playlist.id}>
            {playlist.name}
          </option>
        ))}
      </select>
      {selectedPlaylistData && <Tracklist tracks={selectedPlaylistData} />}
    </>
  );
};

export default EditPlaylist;
