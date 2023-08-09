// Get elements by id
const favoriteList = document.getElementById('fevList');
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const resultContainer = document.getElementById("results");

// Fetch the updated list
function fetching(list) {
    console.log("list", list);
    displayResults(list)

}

// Display hero data
function heroslist(hero) {
    const herosdata = document.createElement('div');
    herosdata.innerHTML = `
    <div id="outerbox">
      <div id="innerbox">
        <img src="${hero.image.url}" id="favlistimg">
      </div>
      <h5>${hero.name}</h5>
      <button class="btn btn-primary" id="remove" type="submit" onclick="remove(this.value)" value=${hero.id}>Remove</button>
    </div>
  `;
    favoriteList.appendChild(herosdata);
}

function displayResults(results) {
    // const resultContainer
    // Clear previous results
    resultContainer.innerHTML = "";
    // Loop through search results
    results.forEach((result) => {
        // Create card element for each superhero
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
        image.className = "card-img-top col-md-8";
        image.style.width = '18rem';
        card.appendChild(image);

        // Add superhero name to card
        const name = document.createElement("a");
        name.href = "superheroInfo.html"
        name.textContent = result.name;
        name.className = 'card-title fs-2'
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
        const favoriteButton = document.createElement("button");
        favoriteButton.classList.add("favorite-button");
        favoriteButton.textContent = "remove to favorites";
        favoriteButton.addEventListener("click", (event) => {
            event.preventDefault();
            remove(result);
        });
        card.appendChild(favoriteButton);

        // Add card to result container
        resultContainer.appendChild(card);
    });
}

// Remove item from the list
function remove(value) {
    console.log("calue", value);

    favorites = favorites.filter((heroid) => heroid !== value);
    localStorage.removeItem('favorites')
    localStorage.setItem('favorites', JSON.stringify(favorites));
    favoriteList.innerHTML = '';
    fetching(favorites);
}

fetching(favorites); 