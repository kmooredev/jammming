import './App.css';
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import CreatePlaylist from './components/CreatePlaylist/CreatePlaylist';
import { TrackType } from './components/Track/Track';
import getId from './utils/getId';
import addTracks from './utils/addTracks';
import createPlaylist from './utils/createPlaylist';
import Header from './components/header/Header';
import Greeting from './components/greeting/Greeting';
import EditPlaylist from './components/EditPlaylist/EditPlaylist';

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

interface UserId {
  display_name: string;
  email: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
}

function App() {
  // auth logic

  const [accessToken, setAccessToken] = useState<string>('');
  const [userId, setUserId] = useState<UserId>({
    display_name: '',
    email: '',
    id: '',
    images: [
      {
        height: 0,
        url: '',
        width: 0,
      },
    ],
  });
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
    setUserId({
      display_name: '',
      email: '',
      id: '',
      images: [
        {
          height: 0,
          url: '',
          width: 0,
        },
      ],
    });
    setResults([]);
    setPlaylistTracks([]);
    setPlaylistUriArray([]);
    setQuery('');
    setPlaylistName('');
    setPlaylistId('');
    window.open('https://jammming-sepia.vercel.app/', '_self');
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
  const [userWantsToCreatePlaylist, setUserWantsToCreatePlaylist] =
    useState<boolean>(false);
  const [userWantsToEditPlaylist, setUserWantsToEditPlaylist] =
    useState<boolean>(false);

  const handleAddTrack = (track: TrackType) => {
    const newTrack = track;
    setPlaylistTracks((prevTracks) => {
      if (prevTracks.find((t) => t.id === track.id)) {
        return prevTracks;
      }
      return [...playlistTracks, newTrack];
    });
    const playlistUris = playlistTracks.map((track) => track.uri);
    setPlaylistUriArray(playlistUris);
  };

  const handleRemoveTrack = (track: TrackType) => {
    const newPlaylistTracks = playlistTracks.filter(
      (playlistTrack) => playlistTrack.id !== track.id
    );
    setPlaylistTracks(newPlaylistTracks);
  };

  const handleSavePlaylist = () => {
    createPlaylist(userId.id, accessToken, playlistName, setPlaylistId);
  };

  const handleSaveTracksToPlaylist = () => {
    addTracks(playlistId, accessToken, playlistUriArray).then(() => {
      setPlaylistTracks([]);
      setPlaylistUriArray([]);
      setPlaylistName('');
      setPlaylistId('');
    });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(event.target.value);
  };

  const toggleCreatePlaylist = () => {
    setUserWantsToEditPlaylist(false);
    setUserWantsToCreatePlaylist(!userWantsToCreatePlaylist);
  };

  const toggleEditPlaylist = () => {
    setUserWantsToCreatePlaylist(false);
    setUserWantsToEditPlaylist(!userWantsToEditPlaylist);
  };

  return (
    <div className="container">
      <Header accessToken={accessToken} logout={logout} />
      <Greeting
        userId={userId}
        createPlaylist={toggleCreatePlaylist}
        editPlaylist={toggleEditPlaylist}
      />
      {accessToken && (
        <>
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
            {userWantsToCreatePlaylist && (
              <CreatePlaylist
                name={playlistName}
                tracks={playlistTracks}
                handleNameChange={handleNameChange}
                handleRemoveTrack={handleRemoveTrack}
                handleSavePlaylist={handleSavePlaylist}
                handleSaveTracksToPlaylist={handleSaveTracksToPlaylist}
              />
            )}
            {userWantsToEditPlaylist && (
              <EditPlaylist
                tracksToAdd={playlistTracks}
                handleRemoveTrack={handleRemoveTrack}
                resetPlaylistTracks={setPlaylistTracks}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
