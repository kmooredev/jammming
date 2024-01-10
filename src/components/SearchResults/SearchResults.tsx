import Tracklist from "../Tracklist/Tracklist"
import { TrackProps } from "../Track/Track"
import styles from './SearchResults.module.css'

interface SearchResultsProps {
  searchResults: TrackProps[]
}

const SearchResults = ({searchResults}: SearchResultsProps) => {

  return (
    <div className={styles.results}>
      <Tracklist listType='results' tracks={searchResults}/>
    </div>
  )
}

export default SearchResults;