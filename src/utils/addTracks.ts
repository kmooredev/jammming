const addTracks = async (
  playlistId: string,
  accessToken: string,
  playlistUriArray: string[]
) => {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: playlistUriArray,
      }),
    }
  );
  const data = await response.json();
  console.log(data);
};

export default addTracks;
