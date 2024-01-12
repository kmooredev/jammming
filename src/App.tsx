import './App.css';
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import { TrackType } from './components/Track/Track';

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
  const [accessToken, setAccessToken] = useState<string>('');
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
  }, []);

  const logout = () => {
    window.localStorage.removeItem('token');
    setAccessToken('');
  };

  // Search Results Logic
  const [results, setResults] = useState([
    {
      id: '1',
      name: 'Track 1',
      artist: 'Artist 1',
      album: 'Album 1',
      uri: 'spotify:track:6rqhFgbbKwnb9MLmUQDhG6',
    },
  ]);

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
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      id: '4',
      name: 'Track 4',
      artist: 'Artist 4',
      album: 'Album 4',
      uri: 'spotify:track:9rqhFgbbKwnb9MLmUQDhG6',
    },
  ]);
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

  const [playlistUriArray, setPlaylistUriArray] = useState<string[]>([]);

  const handleSavePlaylist = () => {
    const playlistUriArray = playlistTracks.map((track) => track.uri);
    setPlaylistUriArray(playlistUriArray);
  };

  if (playlistUriArray.length > 0) {
    console.log(playlistUriArray);
  }

  const [playlistName, setPlaylistName] = useState('');
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(event.target.value);
  };

  return (
    <div className="container">
      {!accessToken ? (
        <a
          href={`${authEndpoint}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
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
