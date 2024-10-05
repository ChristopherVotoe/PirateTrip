const CLIENT_ID = "ee4076029ed6442c846d3c348110115f"; // Replace with your actual client ID
        const SPOTIFY_AUTHORIZATION = "https://accounts.spotify.com/authorize";

        function generateRandomString(length) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let randomString = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                randomString += characters[randomIndex];
            }
            return randomString;
        }

        function generateSpotifyAuthURL(clientId, redirectUri, scope) {
            const state = generateRandomString(16);
            localStorage.setItem('stateKey', state);

            let url = SPOTIFY_AUTHORIZATION;
            url += '?response_type=token';
            url += '&client_id=' + encodeURIComponent(clientId);
            url += '&scope=' + encodeURIComponent(scope);
            url += '&redirect_uri=' + encodeURIComponent(redirectUri);
            url += '&state=' + encodeURIComponent(state);

            return url;
        }

        document.getElementById('spotifyAuthButton').onclick = function() {
            const redirectUri = 'http://127.0.0.1:5500/testSpotifyData.html';
            const scope = 'user-read-private user-read-email';

            const authURL = generateSpotifyAuthURL(CLIENT_ID, redirectUri, scope);
            window.location.href = authURL; // Redirect to the generated URL
        }