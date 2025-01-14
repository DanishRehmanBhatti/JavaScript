const accesskey = "bXckLj_h3giUqxD2k9xoOAK8lWWkE3yXpJaSEp9fJVU";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("input-box");
const searchResults = document.getElementById("search_results");
const showMore = document.getElementById("show_more_button");

let inputData = "";
let page = 1;

async function SearchImage() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    results.forEach((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search_result");

        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    if (page > 1) {
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    SearchImage();
});

showMore.addEventListener("click", () => {
    SearchImage();
});
