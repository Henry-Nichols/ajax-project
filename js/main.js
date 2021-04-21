var title = document.getElementById('title');
var wishlist = document.getElementById('wishlist');
var startButton = document.getElementById('start-btn');
var main = document.querySelector('main');
var header = document.querySelector('header');
var background = document.querySelector('body');
var splashScreen = document.querySelector('.splash-screen');
var unListed = document.getElementById('list');
var searchBar = document.getElementById('search-coin');

function getCryptoCoins() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    console.log(xhr.response);
    xhr.response.forEach(item => {

      var coin = {
        id: item.id,
        name: item.name,
        image: item.image,
        symbol: item.symbol,
        currentPrice: item.current_price,
        percent: item.price_change_percentage_24h
      };
      coins.push(coin);

    });
    displayResults(coins);

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

searchBar.addEventListener('keyup', function (e) {
  var searchResult = [];
  var userInput = e.target.value;
  coins.forEach(item => {
    if (item.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1) {
      searchResult.push(item);
    }
  });
  unListed.querySelectorAll('*').forEach(n => n.remove());
  displayResults(searchResult);
});

function displayResults(results) {

  results.forEach(coin => {
    var cryptoLi = document.createElement('li');
    cryptoLi.classList.add('coin-list');

    var infoDiv = document.createElement('div');
    infoDiv.classList.add('info-div');
    cryptoLi.appendChild(infoDiv);

    var starIcon = document.createElement('div');
    starIcon.classList.add('star-container');
    starIcon.innerHTML = '<i class="far star-icon fa-star"></i>';
    infoDiv.appendChild(starIcon);

    var coinImage = document.createElement('img');
    coinImage.classList.add('coin-img');
    coinImage.src = coin.image;
    infoDiv.appendChild(coinImage);

    var coinName = document.createElement('h1');
    coinName.classList.add('coin-name');
    coinName.textContent = coin.name;
    infoDiv.appendChild(coinName);

    var coinSymbol = document.createElement('h3');
    coinSymbol.textContent = coin.symbol;
    infoDiv.appendChild(coinSymbol);

    var priceDiv = document.createElement('div');
    cryptoLi.appendChild(priceDiv);

    var coinPrice = document.createElement('p');
    coinPrice.textContent = '$' + coin.currentPrice;
    priceDiv.appendChild(coinPrice);

    var coinPercent = document.createElement('p');
    coinPercent.textContent = coin.percent + '%';
    priceDiv.appendChild(coinPercent);

    unListed.appendChild(cryptoLi);

    return cryptoLi;
  });

}

getCryptoCoins();
