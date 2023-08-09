// API credentials and timestamp
const API_TS = Date.now();
const API_PUBLIC_KEY = "7501eb801ce12325c30c3dad07931756";
const API_PRIVATE_KEY = "304d4a48775eeb6019fa811f37b164b310f2ef4c";

// Define the data to hash
const dataToHash = API_TS + API_PRIVATE_KEY + API_PUBLIC_KEY;

// Generate the MD5 hash
const hash = CryptoJS.MD5(dataToHash);

// Convert the hash to a string
const hashString = hash.toString();

// API URL for superhero data
const API_URL = "https://gateway.marvel.com/v1/public/characters";

// Search form and input elements
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

// Results container element
const resultContainer = document.getElementById("results");

// Check if on the favorite hero page
const isFavoritePage = location.pathname.endsWith("favHero.html");

// Hide the "Add to Favorites" button if on the favorite page
if (isFavoritePage) {
    const favoriteButton = document.getElementById("favorite-list");
    favoriteButton.style.display = "none";
}

// Array to store favorite superheros
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];


// Handle form submit element
searchForm.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent default form submission
    const searchTerm = searchInput.value.trim();
    await searchSuperhero(searchTerm);
});

// Handle input keyup event for live search
searchInput.addEventListener("keyup", fetchSuperHero);


// fetching superhero
async function fetchSuperHero() {
    let name = searchInput.value;
    const apiUrl = `${API_URL}?nameStartsWith=${name}&ts=${API_TS}&apikey=${API_PUBLIC_KEY}&hash=${hashString}`;

    // Fetch superhero data from API
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const results = data.data.results;
            if (results.length > 0) {
                displayResults(results);
            } else {
                console.log("Superhero not found");
            }
        })
        .catch((error) => console.log(error));
}

//fetching all the superhero
async function fetchAllSuperHero() {
    const apiUrl = `${API_URL}?ts=${API_TS}&apikey=${API_PUBLIC_KEY}&hash=${hashString}`;
    // Fetch superhero data from API
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const results = data.data.results;
            if (results.length > 0) {
                displayResults(results);
            } else {
                console.log("Superhero not found");
            }
        })
        .catch((error) => console.log(error));
}
// Call fetchAllSuperHero() to fetch all superheroes initially
fetchAllSuperHero();

// Search for superhero by name
async function searchSuperhero(name) {
    const apiUrl = `${API_URL}?nameStartsWith=${name}&ts=${API_TS}&apikey=${API_PUBLIC_KEY}&hash=${hashString}`;
    // Fetch data from API
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const results = data.data.results;
            if (results.length > 0) {
                displayResults(results);
            } else {
                console.log("Superhero not found");
            }
        })
        .catch((error) => console.log(error));
}

// Show search results
function displayResults(results) {
    // Clear previous results
    resultContainer.innerHTML = "";
    // Loop through search results
    results.forEach((result) => {
        //card element for each superhero
        const card = document.createElement("div");
        card.style.display = 'flex';
        card.style.alignItems = 'center';
        card.style.justifyContent = 'center';
        card.style.width = '40rem';
        card.classList.add("card");

        // Add superhero image to card
        const image = document.createElement("img");
        image.src = `${result.thumbnail.path}.${result.thumbnail.extension}`;
        image.alt = result.name;
        card.appendChild(image);

        // Add superhero name to card
        const name = document.createElement("a");
        name.href = "superheroInfo.html"
        name.textContent = result.name;
        name.className = 'fs-2'
        name.addEventListener('click', function () {
            localStorage.setItem('movieDetail', JSON.stringify(result));
        })
        card.appendChild(name);

        ///add discription
        const description = document.createElement("p");
        const descriptionText = result.description || "No description available";
        description.innerHTML = '<strong>Description: </strong>' + descriptionText;
        description.classList.add('card-text'); // Use classList.add() to add the class
        card.appendChild(description);

        // If not on the favorite hero page, add "Add to favorites" button to card
        if (!isFavoritePage) {
            const favoriteButton = document.createElement("button");
            favoriteButton.classList.add("favorite-button");
            favoriteButton.textContent = "Add to favorites";
            favoriteButton.addEventListener("click", (event) => {
                event.preventDefault();
                addToFavorites(result);
            });
            card.appendChild(favoriteButton);
        }

        // Add card to result container
        resultContainer.appendChild(card);
    });
}

// Add superhero to favorites
function addToFavorites(superhero) {
    console.log("ksfndlsd", superhero)
    if (!favorites.some((favorite) => favorite.id === superhero.id)) {
        favorites.push(superhero);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        // displayFavorites();
    }
}

// Display favorite superheroes
function displayFavorites() {
    // Clear previous favorite superheroes
    favoriteList.innerHTML = "";

    // Loop through favorite superhero
    favorites.forEach((favorite) => {
        // Create list item element for each favorite superhero
        const listItem = document.createElement("li");
        listItem.classList.add("favorite-item");

        // Add favorite superhero name to list item
        const name = document.createElement("span");
        name.textContent = favorite.name;
        listItem.appendChild(name);

        // Add "Remove from favorite" button to list item
        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", (event) => {
            event.preventDefault();
            removeFromFavorite(favorite);
        });
        listItem.appendChild(removeButton);

        // Add list item to favorites list
        favoriteList.appendChild(listItem);
    });
}

// Initially display favorite superheroes on the favorite page
if (isFavoritePage) {
    displayFavorites();
}