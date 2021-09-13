// Marvel Characters API URL
const api_url = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=edeb36852f8696cb83c487b2279bf494&hash=4f143c76c354fbfeead772ab3f62a179";

async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    //Store JSON data
    let data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }
    show(data);
}

//Async function call
getapi(api_url);

