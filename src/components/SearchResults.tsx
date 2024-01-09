import Tracklist from "./Tracklist"
import { TrackProps } from "./Track"

interface SearchResultsProps {
  searchResults: TrackProps[]
}

const SearchResults = ({searchResults}: SearchResultsProps) => {

  return (
    <div style={{ width: '40%'}}>
      <Tracklist tracks={searchResults}/>
    </div>
  )
}

export default SearchResults;