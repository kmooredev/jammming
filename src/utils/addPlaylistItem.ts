const addPlaylistItem = async (playlistId: string, trackUris: string[]) => {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          uris: [...trackUris],
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok. Failed to add track.');
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export default addPlaylistItem;
