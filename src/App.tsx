import './App.css'
import { useState } from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'
import Playlist from './components/Playlist/Playlist'

function App() {

  const [results, ] = useState([{
    id: '1',
    name: 'Track 1',
    artist: 'Artist 1',
    album: 'Album 1'
  },
  {
    id: '2',
    name: 'Track 2',
    artist: 'Artist 2',
    album: 'Album 2'
  },
  {
    id: '3',
    name: 'Track 3',
    artist: 'Artist 3',
    album: 'Album 3'
  }]);
  const [playlistTracks, ] = useState([
    {
      id: '4',
      name: 'Track 4',
      artist: 'Artist 4',
      album: 'Album 4'
    },
    {
      id: '5',
      name: 'Track 5',
      artist: 'Artist 5',
      album: 'Album 5'
    },
    {
      id: '6',
      name: 'Track 6',
      artist: 'Artist 6',
      album: 'Album 6'
    }
  ])

  const [playlistName, ] = useState('');

  return (
    <div className='container'>
      <SearchBar />
      <div className='main'>
        <SearchResults searchResults={results}/>
        <Playlist name={playlistName} tracks={playlistTracks}/>
      </div>
    </div>
  )
}

export default App
