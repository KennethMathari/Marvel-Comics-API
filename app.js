// Marvel Characters API URL
const api_url = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=edeb36852f8696cb83c487b2279bf494&hash=4f143c76c354fbfeead772ab3f62a179";

//DOM
let header= document.getElementById('header');
let characters=document.getElementById('characters');
let footer= document.getElementById('footer');

let string='';
string +='<div class="flex flex-wrap">';

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
            //Loop through the API data array
            for(let i=0;i<data.data.results.length;i++){
                let element = data.data.results[i];
                string+='<div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-4">'+element.name+'</div>';

            }
            string+='</div'

            characters.innerHTML=string;

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


