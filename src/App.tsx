import './App.css';
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import { TrackType } from './components/Track/Track';
import getId from './utils/getId';
import addTracks from './utils/addTracks';
import createPlaylist from './utils/createPlaylist';

interface Item {
  artists: {
    name: string;
  }[];
  name: string;
  album: {
    name: string;
  };
  id: string;
  uri: string;
}

function App() {
  // auth logic
  const authEndpoint = 'https://accounts.spotify.com/authorize';
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = 'http://localhost:5173';
  const RESPONSE_TYPE = 'token';
  const scopes = [
    'user-read-private',
    'user-read-email',
    'playlist-modify-public',
    'playlist-modify-private',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-top-read',
  ];
  const [accessToken, setAccessToken] = useState<string>('');
  const [userId, setUserId] = useState('');
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');

    if (!token && hash) {
      token = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        ?.split('=')[1] as string;

      window.location.hash = '';
      window.localStorage.setItem('token', token);
      setAccessToken(token);
    }

    const fetchUserId = async () => {
      const id = await getId();
      setUserId(id);
    };
    fetchUserId();
  }, []);

  const logout = () => {
    window.localStorage.removeItem('token');
    setAccessToken('');
  };

  // Search Results Logic
  const [results, setResults] = useState([]);

  // Search Bar Logic
  const [query, setQuery] = useState('');
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  const handleSearch = async () => {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    const items = data.tracks.items;
    const results = items.map((item: Item) => {
      return {
        name: item.name,
        artist: item.artists[0].name,
        album: item.album.name,
        id: item.id,
        uri: item.uri,
      };
    });
    setResults(results);
    return results;
  };

  // Playlist Logic
  const [playlistName, setPlaylistName] = useState('');
  const [playlistTracks, setPlaylistTracks] = useState<TrackType[]>([]);
  const [playlistId, setPlaylistId] = useState('');
  const [playlistUriArray, setPlaylistUriArray] = useState<string[]>([]);

  const handleAddTrack = (track: TrackType) => {
    const newTrack = track;
    setPlaylistTracks([...playlistTracks, newTrack]);
  };

  const handleRemoveTrack = (track: TrackType) => {
    const newPlaylistTracks = playlistTracks.filter(
      (playlistTrack) => playlistTrack.id !== track.id
    );
    setPlaylistTracks(newPlaylistTracks);
  };

  const handleSavePlaylist = () => {
    const playlistUris = playlistTracks.map((track) => track.uri);
    setPlaylistUriArray(playlistUris);
    createPlaylist(userId, accessToken, playlistName, setPlaylistId).then(() =>
      addTracks(playlistId, accessToken, playlistUriArray)
    );
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(event.target.value);
  };

  return (
    <div className="container">
      {!accessToken ? (
        <a
          href={`${authEndpoint}?client_id=${CLIENT_ID}&scope=${scopes.join(
            ' '
          )}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
      <SearchBar
        query={query}
        handleQueryChange={handleQueryChange}
        handleSearch={handleSearch}
      />
      <div className="main">
        <SearchResults
          searchResults={results}
          handleAddTrack={handleAddTrack}
        />
        <Playlist
          name={playlistName}
          tracks={playlistTracks}
          handleNameChange={handleNameChange}
          handleRemoveTrack={handleRemoveTrack}
          handleSavePlaylist={handleSavePlaylist}
        />
      </div>
    </div>
  );
}

export default App;
