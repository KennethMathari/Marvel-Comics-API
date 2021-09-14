// Marvel Characters API URL
const api_url = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=edeb36852f8696cb83c487b2279bf494&hash=4f143c76c354fbfeead772ab3f62a179";

//DOM
let header= document.getElementById('header');
let footer= document.getElementById('footer');

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
            //Display header content on UI
            header.innerHTML='<div class="bg-red-900 text-center py-4 lg:px-4"><span class="font-semibold mr-2 text-left flex-auto text-white">Marvel Universe Characters</span></div>';
            //Display footer content on UI
            footer.innerHTML='<div class="bg-red-900 fixed bottom-0 w-full text-white py-4 lg:px-4">'+data.attributionHTML+'</div>';
    }).catch(function (error) {
        // Logs any errors
        console.log('Oops! Something went wrong', error);
        //Display on UI
        header.innerHTML='<div role="alert" class="p-20"><div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">Oops!</div><div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700"><p>Thanos snapped.</p></div></div>';
      });
    
}

//Async function call
getapi(api_url);

