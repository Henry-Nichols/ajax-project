var title = document.getElementById('title');
var wishlist = document.getElementById('wishlist');
var startButton = document.getElementById('start-btn');
var main = document.querySelector('main');
var header = document.querySelector('header');
var background = document.querySelector('body');
var splashScreen = document.querySelector('.splash-screen');

function getCryptoCoin(name) {
  var xhr = new XMLHttpRequest();
  // xhr.open('GET', 'https://api.coingecko.com/api/v3/coins/list');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.response);
  });
  xhr.send();
}

title.addEventListener('click', function () {
  main.classList.add('hidden');
  header.classList.add('hidden');
  background.classList.add('background');
  splashScreen.classList.remove('hidden');
});

startButton.addEventListener('click', function () {
  main.classList.remove('hidden');
  header.classList.remove('hidden');
  background.classList.remove('background');
  splashScreen.classList.add('hidden');
});

wishlist.addEventListener('click', function () {
  main.classList.add('hidden');
});

var cryptoLi = document.createElement('li');

var priceDiv = document.createElement('div');
cryptoLi.appendChild(priceDiv);
