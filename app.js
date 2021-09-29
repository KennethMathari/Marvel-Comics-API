// Marvel Characters API URL
const api_url = "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=edeb36852f8696cb83c487b2279bf494&hash=4f143c76c354fbfeead772ab3f62a179";

//Variables
let header= document.getElementById('header');
let characters=document.getElementById('characters');
let footer= document.getElementById('footer');

let string='';

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
            string +='<div class="flex flex-wrap pt-5">';
            //Loop through the API data array
            for(let i=0;i<data.data.results.length;i++){
                let element = data.data.results[i];
                //Display Each Character Attributes
                string+='<div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-4"><a href="'+element.urls[0].url+'" target="_blank"> <div class=" max-w-sm rounded overflow-hidden shadow-lg m-4"><img class="w-full" src="'+element.thumbnail.path+'/standard_small.'+element.thumbnail.extension+'" alt="'+element.name+'"><div class="px-6 py-4"><div class="font-bold text-xl mb-2">'+element.name+'</div></div></a></div></div>';
            }
            string+='</div'

            characters.innerHTML=string;

            //Display footer content on UI
            footer.innerHTML='<div class="bg-red-900 fixed bottom-0 w-full text-white py-4 lg:px-4">Made by <a href="https://github.com/KennethMathari">Kenneth Mathari.</a>'+' '+data.attributionHTML+'</div>';
    }).catch(function (error) {
        // Logs any errors
        console.log('Oops! Something went wrong', error);
        //Display on UI
        header.innerHTML='<div role="alert" class="p-20"><div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">Oops!</div><div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700"><p>Thanos snapped.</p></div></div>';
      });
    
}

//Async function call
getapi(api_url);


const APP={
    SW: null,
  init() {
      //check if Service Worker is Supported
      if('serviceWorker' in navigator){
        //Register Service Worker
        navigator.serviceWorker.register('/sw.js',{
            scope:'/'
        })
        .then(registration =>{
            //Save reference to registered service worker
            APP.SW = registration.installing || registration.waiting || registration.active;
            console.log('Service Worker Registered');
        })
        //Catch any error
        .catch(err =>console.log('Service Worker Error:'+err));
        //Check if current page has service worker
        if(navigator.serviceWorker.controller){
            console.log('Service Worker Present')
        }
        //Check if a new service worker is installed & activated
        navigator.serviceWorker.oncontrollerchange=(ev)=>{
            console.log('New service worker is installed & activated');
        }
      }else{
      console.log('Service Worker not Supported');
      }
  }
}


document.addEventListener('DOMContentLoaded', APP.init);