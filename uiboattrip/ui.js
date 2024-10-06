// script.js

let popupShown = false; // Variable to track if the popup has already been shown

// Function to show the top destination pop-up 10 seconds after the boat scene starts
function showTopDestinationPopup() {
    // Only show the pop-up if it hasn't been shown yet
    if (!popupShown) {
        const popup = document.getElementById('top-destination-popup');
        popup.style.display = 'block'; // Show the pop-up
        popupShown = true; // Mark popup as shown

        // Add event listener to hide the pop-up when it is clicked
        popup.addEventListener('click', () => {
            popup.style.display = 'none'; // Hide the pop-up on click
            // Show the closeout message after 5 seconds
            setTimeout(showCloseoutMessage, 5000); // 5 seconds delay
        });
    }
}

// Function to show the closeout message
function showCloseoutMessage() {
    const closeoutMessage = document.getElementById('closeout-message');
    closeoutMessage.style.display = 'block'; // Show the closeout message

    // Hide the boat scene and transition to backmove and backstill after a delay (e.g., 3 seconds)
    setTimeout(() => {
        closeoutMessage.style.display = 'none'; // Hide the closeout message
        document.getElementById('boat-scene').style.display = 'none'; // Hide boat scene

        // You can also set background properties to only show backmove and backstill as required
        document.body.style.background = "url('./assets/backbasics/backstill.png')";
        document.body.style.backgroundSize = "cover";
    }, 2500); // 3 seconds delay for closing the boat scene
}

// Modify the showBoatScene function to include the pop-up and play music
function showBoatScene() {
    document.getElementById('ui-sequence').style.display = 'none'; // Hide UI sequence
    document.getElementById('boat-scene').style.display = 'block'; // Show boat scene

    // Set the genre here after transitioning to the boat scene
    changeGenre('pop'); // Manually set the genre to 'pop' or any other genre

    // Play the background music when the boat scene starts
    const music = document.getElementById('boat-scene-music');
    music.play(); // Play the music

    // Show the top destination popup after 10 seconds
    setTimeout(showTopDestinationPopup, 10000); // 10 seconds delay
}



// Function to handle UI sequence transitions
function runUISequence() {
    const pages = document.querySelectorAll('.page'); // Get all the page elements
    let currentPage = 0;

    // Function to display the next page
    function showNextPage() {
        if (currentPage > 0) {
            pages[currentPage - 1].style.opacity = 0; // Hide the previous page
        }

        if (currentPage < pages.length) {
            pages[currentPage].style.opacity = 1; // Show the current page
            currentPage++;

            // Show the next page after 2 seconds
            setTimeout(showNextPage, 800);
        } else {
            // Once all pages are shown, display the boat scene
            showBoatScene();
        }
    }

    // Start the UI sequence
    showNextPage();
}

// Function to change assets based on the genre
function changeGenre(genre) {
    // Construct paths to assets based on the genre folder names
    const boatImage = `./assets/boat/${genre}_boat.png`;
    const backgroundImage = `./assets/background/${genre}_back.png`;
    const floorImage = `./assets/floor/${genre}_floor.png`;
    const billboardImage = `./assets/billboard/${genre}_bill.png`;

    // Select the elements in the DOM and set their backgrounds dynamically
    document.querySelector('.night').style.backgroundImage = `url(${backgroundImage})`;
    document.querySelector('.surface').style.backgroundImage = `url(${floorImage})`;
    document.querySelector('.billboard').style.backgroundImage = `url(${billboardImage})`;
    document.querySelector('.boat').style.backgroundImage = `url(${boatImage})`;
}

// Run the UI sequence when the page loads
window.onload = runUISequence;
