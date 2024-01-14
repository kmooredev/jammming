import Tracklist from '../Tracklist/Tracklist';
import { TrackProps, TrackType } from '../Track/Track';
import styles from './SearchResults.module.css';

interface SearchResultsProps {
  searchResults: TrackProps[];
  handleAddTrack: (track: TrackType) => void;
}

const SearchResults = ({
  searchResults,
  handleAddTrack,
}: SearchResultsProps) => {
  return (
    <div className={styles.results}>
      <h3>Search Results</h3>
      {searchResults.length === 0 && (
        <p className={styles.results__message}>No results found</p>
      )}
      <Tracklist
        listType="results"
        tracks={searchResults}
        handleAddTrack={handleAddTrack}
      />
    </div>
  );
};

export default SearchResults;
