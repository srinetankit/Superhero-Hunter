let results = JSON.parse(localStorage.getItem('movieDetail')) || [];
const resultContainer = document.getElementById("superheroInfo");

function displayResults(result) {
    // const resultContainer
    // Clear previous results
    resultContainer.innerHTML = "";
    // Loop through search results

    // Create card element for each superhero
    const card = document.createElement("div");
    card.style.padding = '40px';
    card.style.width = '40rem';
    card.classList.add("card");

    // Add superhero image to card
    const image = document.createElement("img");
    image.src = `${result.thumbnail.path}.${result.thumbnail.extension}`;
    image.alt = result.name;
    card.appendChild(image);

    // Add superhero name to card
    const name = document.createElement("h3");
    name.textContent = result.name;
    name.className = 'card-title'
    name.classList.add("text-success")
    card.appendChild(name);

    //add discription
    const description = document.createElement("p");
    const descriptionText = result.description || "No description available";
    description.innerHTML = '<strong>Description: </strong>' + descriptionText;
    description.classList.add('card-text'); // Use classList.add() to add the class
    card.appendChild(description);

    //add id
    const id = document.createElement('p');
    id.innerHTML = '<strong>Id: </strong>' + result.id;
    card.appendChild(id);
    //add  comics count
    const comicsCount = document.createElement("p");
    const numberOfComics = result.comics?.available || 0;
    comicsCount.innerHTML = `<strong>Number of Comics:</strong> ${numberOfComics}`;
    card.appendChild(comicsCount);
    //add  series availabe
    const seriesCount = document.createElement("p");
    const numberOfSeries = result.series?.available || 0;
    seriesCount.innerHTML = `<strong>Number of Series:</strong> ${numberOfSeries}`;
    card.appendChild(seriesCount);
    //add  last Modified date
    const lastModified = document.createElement("p");
    const lastModifiedDate = result.modified || "Date not available";

    if (lastModifiedDate !== "Date not available") {
        const dateObject = new Date(lastModifiedDate);
        const formattedDate = dateObject.toLocaleString(); // Convert to user-friendly date format
        lastModified.innerHTML = `<strong>Last Modified:</strong> ${formattedDate}`;
    } else {
        lastModified.innerHTML = `<strong>Last Modified:</strong> ${lastModifiedDate}`;
    }

    card.appendChild(lastModified);




    // Add card to result container
    resultContainer.appendChild(card);

}
displayResults(results);