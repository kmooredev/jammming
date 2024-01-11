const getAccessToken = async () => {
  const tokenEndpoint = "https://accounts.spotify.com/api/token";
  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${import.meta.env.VITE_SPOTIFY_CLIENT_ID}&client_secret=${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`,
  });
  const data = await response.json();
  return data.access_token;
};

export default getAccessToken;
