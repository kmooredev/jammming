import './App.css'
import { useState } from 'react'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import Playlist from './components/Playlist'

function App() {

  const [tracks, ] = useState([{
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <SearchBar />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', width: '80vw', maxHeight: '100vh', padding: '1%'}}>
        <SearchResults searchResults={tracks}/>
        <Playlist />
      </div>
    </div>
  )
}

export default App
