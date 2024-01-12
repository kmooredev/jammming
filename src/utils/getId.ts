const getId = async () => {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });

  const data = await response.json();
  return data.id;
};

export default getId;
