const getAuth = async () => {
  const generateRandomString = (length = 128) => {
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], '');
  };

  const codeVerifier = generateRandomString(64);

  const sha256 = async (plain: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  };

  const base64encode = (input: ArrayBuffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri = 'http://localhost:5173';

  const scope = 'user-read-private user-read-email';
  const authUrl = new URL('https://accounts.spotify.com/authorize');

  // generated in the previous step
  window.localStorage.setItem('code_verifier', codeVerifier);

  const params = {
    response_type: 'code',
    client_id: clientId,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();

  const urlParams = new URLSearchParams(window.location.search);
  // eslint-disable-next-line prefer-const
  let code = urlParams.get('code');

  const getToken = async (code: string) => {
    const url = 'https://accounts.spotify.com/api/token';
    // stored in the previous step
    const codeVerifier = localStorage.getItem('code_verifier') || 'undefined';

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };

    const body = await fetch(url, payload);
    const response = await body.json();
    console.log(response.access_token);
    localStorage.setItem('access_token', response.access_token);
  };

  await getToken(code!);
};

export default getAuth;
