const getPlaylistTracks = async (playlistId: string) => {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  const data = await response.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playlistTracks = data.items.map((track: any) => ({
    id: track.track.id,
    name: track.track.name,
    artist: track.track.artists[0].name,
    album: track.track.album.name,
    uri: track.track.uri,
  }));
  return playlistTracks;
};

export default getPlaylistTracks;
