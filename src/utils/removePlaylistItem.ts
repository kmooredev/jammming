const removePlaylistItem = async (playlistId: string, trackUri: string) => {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        tracks: [{ uri: trackUri }],
      }),
    }
  );
  const data = await response.json();
  console.log(data);
};

export default removePlaylistItem;
