import styles from './Greeting.module.css';

interface GreetingProps {
  userId: {
    display_name: string;
  };
  createPlaylist: () => void;
  editPlaylist: () => void;
}

const Greeting = ({ userId, createPlaylist, editPlaylist }: GreetingProps) => {
  return userId.display_name ? (
    <div className={styles.div}>
      <h1 className={styles.h1}>Welcome, {userId.display_name}!</h1>
      <button onClick={createPlaylist}>Create New Playlist</button>
      <button onClick={editPlaylist}>Edit Existing Playlist</button>
    </div>
  ) : (
    <div className={styles.div}>
      <h1 className={styles.h1}>Welcome to Jammming!</h1>
      <p className={styles.p}>
        If you're new around here, please allow me to introduce Jammming. This
        site allows you to connect with your Spotify account in order to create
        and save playlists to your account. To get started, click the login
        button above.
      </p>
    </div>
  );
};

export default Greeting;
