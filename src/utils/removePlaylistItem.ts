const removePlaylistItem = async (playlistId: string, trackUri: string) => {
  try {
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
    if (!response.ok) {
      throw new Error('Network response was not ok. Failed to remove track.');
    }
  } catch (error) {
    console.error(error);
  }
};

export default removePlaylistItem;
