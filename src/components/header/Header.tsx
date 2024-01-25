import styles from './Header.module.css';

interface HeaderProps {
  accessToken: string;
  logout: () => void;
}

const Header = ({ accessToken, logout }: HeaderProps) => {
  const authEndpoint = 'https://accounts.spotify.com/authorize';
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = 'https://jammming-sepia.vercel.app';
  const RESPONSE_TYPE = 'token';
  const scopes = [
    'user-read-private',
    'user-read-email',
    'playlist-modify-public',
    'playlist-modify-private',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-top-read',
  ];

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <h1 className={styles.header__title}>Jammming 🎶</h1>
        {!accessToken ? (
          <button>
            <a
              className={styles.header__login}
              href={`${authEndpoint}?client_id=${CLIENT_ID}&scope=${scopes.join(
                ' '
              )}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
            >
              Login
            </a>
          </button>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </div>
    </header>
  );
};

export default Header;
