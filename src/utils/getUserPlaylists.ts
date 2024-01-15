interface Playlist {
  id: string;
  name: string;
  images: [{ url: string }];
  snapshot_id: string;
  uri: string;
}

const getUserPlaylists = async () => {
  const response = await fetch('https://api.spotify.com/v1/me/playlists', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await response.json();
  const currentUserPlaylists = data.items.map((playlist: Playlist) => ({
    id: playlist.id,
    name: playlist.name,
    image: playlist.images[0].url,
    snapshot_id: playlist.snapshot_id,
    uri: playlist.uri,
  }));
  return currentUserPlaylists;
};

export default getUserPlaylists;
