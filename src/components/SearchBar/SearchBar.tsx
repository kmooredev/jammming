import styles from './SearchBar.module.css';


const SearchBar: React.FC = () => {
  return (
    <div className={styles.div}>
      <input className={styles.input} type="text" />
      <button>Search</button>
    </div>
  )
}

export default SearchBar;