import { Dispatch, SetStateAction } from 'react';

const createPlaylist = async (
  userId: string,
  accessToken: string,
  playlistName: string,
  setPlaylistId: Dispatch<SetStateAction<string>>
) => {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playlistName,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const id = data.id;
    setPlaylistId(id);
  } catch (error) {
    console.log(error);
  }
};

export default createPlaylist;
