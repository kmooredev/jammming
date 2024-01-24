export interface Playlist {
  id: string;
  name: string;
  images: [{ url: string }];
  snapshot_id: string;
  uri: string;
}

const getUserPlaylists = async (): Promise<Playlist[]> => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok. Failed to get playlists.');
    }
    const data = await response.json();
    const currentUserPlaylists = data.items.map((playlist: Playlist) => ({
      id: playlist.id,
      name: playlist.name,
      snapshot_id: playlist.snapshot_id,
      uri: playlist.uri,
    }));
    return currentUserPlaylists;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getUserPlaylists;
