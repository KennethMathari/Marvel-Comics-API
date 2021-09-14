// Marvel Characters API URL
const api_url = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=edeb36852f8696cb83c487b2279bf494&hash=4f143c76c354fbfeead772ab3f62a179";

//DOM
let message= document.getElementById('message');

async function getapi(url) {
    
    // Storing response
    const response = await fetch(url)
    .then(function (response){
        //checks if fetch request was successful
        if (!response.ok) {
            throw new Error('HTTP error, status = ' + response.status);
            }
        // Returns the response as JSON
            return response.json();
    }).then(function(data){
        // Logs the Marvel Characters API data
            console.log('Marvel Universe Characters:', data);
            //Display on UI
            message.innerHTML='<p>Marvel Universe Characters</p>';
    }).catch(function (error) {
        // Logs any errors
        console.log('Oops! Something went wrong', error);
        //Display on UI
        message.innerHTML='Oops! Thanos snapped!';
      });
    
}

//Async function call
getapi(api_url);



