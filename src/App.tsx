import './App.css';
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import { TrackType } from './components/Track/Track';
import getId from './utils/getId';
import addTracks from './utils/addTracks';
import createPlaylist from './utils/createPlaylist';
import Header from './components/header/Header';

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
      if (!accessToken) return;
      try {
        const id = await getId();
        setUserId(id);
        if (!id) {
          throw new Error('There was an issue obtaining the user ID');
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserId();
  }, [accessToken]);

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
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          'There was an issue with the search request' +
            `Status: ${response.status}`
        );
      }
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
    } catch (error) {
      console.log(error);
    }
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
      <Header accessToken={accessToken} logout={logout} />
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
