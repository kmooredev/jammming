const getPlaylistTracks = async (playlistId: string) => {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok. Failed to get tracks.');
    }
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
  } catch (error) {
    console.error(error);
  }
};

export default getPlaylistTracks;
