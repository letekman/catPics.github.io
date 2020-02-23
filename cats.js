const catURL = "https://api.thecatapi.com/v1/images/search?breed_id=";

const catContainer = document.querySelector(".cats");
const button = document.querySelector(".add-new-cat");
const input = document.querySelector(".num-of-cats");
const select = document.querySelector(".breeds");



button.addEventListener("click", addCat);
populateBreeds();

function populateBreeds() {
    const breedsPromise = fetch("https://api.thecatapi.com/v1/breeds");
    breedsPromise
        .then(function (response) {
        return response.json();
    })
        .then(function (processedResponse) {
            for(let i = 0; i < processedResponse.length; i++){
                const option = document.createElement("option");
                option.text = processedResponse[i].id;
                select.appendChild(option)
            }
    })
}

function addCat() {
    let inputVal = parseInt(input.value);
    for (let i = 0; i < inputVal; i++) {
        const img = document.createElement("img");
        img.setAttribute("class", "cat");
        img.src = "./giphy.gif";
        img.width = 300;
        img.height = 300;
        catContainer.appendChild(img);
        const promise = fetch(catURL + select[select.selectedIndex].value);
        promise
            .then(function (response) {
                return response.json();
            })
            .then(function (processedResponse) {
                img.src = processedResponse[0].url;
            });
    }
}




