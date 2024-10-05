const CLIENT_ID = "ee4076029ed6442c846d3c348110115f";  // Your Client ID
const redirectUri = 'http://127.0.0.1:5500/Page2.html';            // Redirect URI (set this in your Spotify app)
const scope = 'user-read-private user-read-email user-top-read';      // Spotify permissions you're requesting

// Generate PKCE code verifier and code challenge
async function generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

document.getElementById('authButton').addEventListener('click', async () => {
    const codeVerifier = generateRandomString(128);
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    // Store the code_verifier for later
    localStorage.setItem('code_verifier', codeVerifier);

    const authUrl = new URL("https://accounts.spotify.com/authorize");

    const params = {
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri
    };

    authUrl.search = new URLSearchParams(params).toString();

    // Redirect to Spotify's authorization page
    window.location.href = authUrl.toString();
});

// Exchange authorization code for access token
async function exchangeToken(code, codeVerifier) {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        client_id: CLIENT_ID,
        code_verifier: codeVerifier
    });

    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body.toString()
        });

        const data = await response.json();
        console.log('Access Token:', data.access_token);
        return data.access_token;

    } catch (error) {
        console.error('Error:', error);
    }
}

// Once redirected back from Spotify with an authorization code
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

if (code) {
    const codeVerifier = localStorage.getItem('code_verifier');
    exchangeToken(code, codeVerifier); // Call function to exchange code for token
}

// This function fetches the user's top artists using the access token
async function getTopArtists(accessToken) {
    const url = 'https://api.spotify.com/v1/me/top/artists';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Top Artists:', data); // This prints the top artists to the console

            // Call the function to display the artists on the page
            displayTopArtists(data.items);  // data.items contains the array of artists

        } else {
            console.error('Failed to retrieve top artists:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// This function displays the artists on the HTML page
function displayTopArtists(artists) {
    const artistsContainer = document.getElementById('top-artists');

    // Clear the container first
    artistsContainer.innerHTML = '';

    // Loop through the artists and display their name and image
    artists.forEach(artist => {
        const artistElement = document.createElement('div');
        artistElement.classList.add('artist');

        // Create an image element for the artist's image
        const artistImage = document.createElement('img');
        artistImage.src = artist.images[0] ? artist.images[0].url : '';
        artistImage.alt = `${artist.name}'s image`;
        artistImage.width = 100;

        // Create a text node for the artist's name
        const artistName = document.createElement('p');
        artistName.textContent = artist.name;

        // Append the image and name to the artist element
        artistElement.appendChild(artistImage);
        artistElement.appendChild(artistName);

        // Append the artist element to the top artists container
        artistsContainer.appendChild(artistElement);
        console.log("breaky?")
    });
}

// If authorization code is present, exchange it for an access token
if (code) {
    const codeVerifier = localStorage.getItem('code_verifier');
    exchangeToken(code, codeVerifier).then(accessToken => {
        if (accessToken) {
            getTopArtists(accessToken);  // Call the function to get and display the user's top artists
        }
    });
}


