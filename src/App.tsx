import './App.css'
import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'
import Playlist from './components/Playlist/Playlist'
import { TrackType } from './components/Track/Track'
import getAccessToken from './utils/getAccessToken'

function App() {
  const [results, ] = useState([{
    id: '1',
    name: 'Track 1',
    artist: 'Artist 1',
    album: 'Album 1',
    uri: 'spotify:track:6rqhFgbbKwnb9MLmUQDhG6'
  },
  {
    id: '2',
    name: 'Track 2',
    artist: 'Artist 2',
    album: 'Album 2',
    uri: 'spotify:track:7rqhFgbbKwnb9MLmUQDhG6'
  },
  {
    id: '3',
    name: 'Track 3',
    artist: 'Artist 3',
    album: 'Album 3',
    uri: 'spotify:track:8rqhFgbbKwnb9MLmUQDhG6'
  }]);
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      id: '4',
      name: 'Track 4',
      artist: 'Artist 4',
      album: 'Album 4',
      uri: 'spotify:track:9rqhFgbbKwnb9MLmUQDhG6'
    },
    {
      id: '5',
      name: 'Track 5',
      artist: 'Artist 5',
      album: 'Album 5',
      uri: 'spotify:track:10rqhFgbbKwnb9MLmUQDhG6'
    },
    {
      id: '6',
      name: 'Track 6',
      artist: 'Artist 6',
      album: 'Album 6',
      uri: 'spotify:track:11rqhFgbbKwnb9MLmUQDhG6'
    }
  ]);

  const [playlistUriArray, setPlaylistUriArray] = useState<string[]>([]);

  const [playlistName, setPlaylistName] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(event.target.value);
    console.log(accessToken)
  }

  const handleAddTrack = (track: TrackType) => {
    const newTrack = track;
    setPlaylistTracks([...playlistTracks, newTrack]);
  }

  const handleRemoveTrack = (track: TrackType) => {
    const newPlaylistTracks = playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id);
    setPlaylistTracks(newPlaylistTracks);
  }

  const handleSavePlaylist = () => {
    const playlistUriArray = playlistTracks.map(track => track.uri);
    setPlaylistUriArray(playlistUriArray);
  }

  const [accessToken, setAccessToken] = useState<string>('');
  useEffect(() => {
    async function getAccessTokenAsync() {
      const accessToken = await getAccessToken();
      setAccessToken(accessToken);
    }
    getAccessTokenAsync();
  }, [])

  console.log(playlistUriArray)

  return (
    <div className='container'>
      <SearchBar />
      <div className='main'>
        <SearchResults searchResults={results} handleAddTrack={handleAddTrack}/>
        <Playlist name={playlistName} tracks={playlistTracks} handleNameChange={handleNameChange} handleRemoveTrack={handleRemoveTrack} handleSavePlaylist={handleSavePlaylist} />
      </div>
    </div>
  )
}

export default App
