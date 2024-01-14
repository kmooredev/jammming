import styles from './SearchBar.module.css';

interface SearchBarProps {
  handleSearch: () => void;
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
}

const SearchBar = ({
  handleSearch,
  handleQueryChange,
  query,
}: SearchBarProps) => {
  return (
    <div className={styles.div}>
      <p className={styles.p}>Search for a song, artist, or album</p>
      <input
        className={styles.input}
        type="text"
        value={query}
        onChange={handleQueryChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
