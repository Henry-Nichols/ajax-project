var title = document.getElementById('title');
var wishlist = document.getElementById('wishlist');
var homeButton = document.getElementById('home-button');
var startButton = document.getElementById('start-btn');
var main = document.querySelector('main');
var header = document.querySelector('header');
var background = document.querySelector('body');
var splashScreen = document.querySelector('.splash-screen');
var unListed = document.getElementById('list');
var searchBar = document.getElementById('search-coin');
var favoriteOn = false;

function getCryptoCoins() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    xhr.response.forEach(item => {
      var coin = {
        id: item.id,
        name: item.name,
        image: item.image,
        symbol: item.symbol,
        currentPrice: item.current_price,
        percent: item.price_change_percentage_24h,
        isFavorite: false
      };
      coins.push(coin);
    });

    var favCoinsStr = localStorage.getItem('Crypto-Coins');
    var favCoins = JSON.parse(favCoinsStr);
    var favCoinsMap = new Map(favCoins.map(key => [key.symbol, key.isFavorite]));

    coins.forEach(coin => {
      var fav = favCoinsMap.get(coin.symbol);
      coin.isFavorite = fav;
    });
    displayResults(coins);
  });
  xhr.send();
}

window.addEventListener('beforeunload', function () {
  localStorage.setItem('Crypto-Coins', JSON.stringify(coins));
});

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

homeButton.addEventListener('click', function () {
  main.classList.remove('hidden');
  displayResults(coins);
});

wishlist.addEventListener('click', function () {
  favoriteOn = !favoriteOn;

  if (favoriteOn) {
    var favoriteCoins = [];
    coins.forEach(item => {
      if (item.isFavorite) {
        favoriteCoins.push(item);
      }
    });
    displayResults(favoriteCoins);
  } else {
    displayResults(coins);
  }

});

searchBar.addEventListener('keyup', function (e) {
  var searchResult = [];
  var userInput = e.target.value;
  coins.forEach(item => {
    if (item.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1) {
      searchResult.push(item);
    }
  });
  displayResults(searchResult);
});

function displayResults(results) {
  unListed.querySelectorAll('*').forEach(n => n.remove());

  results.forEach(coin => {
    var cryptoLi = document.createElement('li');
    cryptoLi.classList.add('coin-list');

    var infoDiv = document.createElement('div');
    infoDiv.classList.add('info-div');
    cryptoLi.appendChild(infoDiv);

    var starIcon = document.createElement('div');
    starIcon.classList.add('star-container');
    starIcon.innerHTML = coin.isFavorite ? '<i class="fas star-icon-clicked fa-star"></i>' : '<i class="far star-icon fa-star"></i>';
    infoDiv.appendChild(starIcon);
    starIcon.addEventListener('click', event => {
      if (event.target.outerHTML === '<i class="far star-icon fa-star"></i>') {
        starIcon.innerHTML = '<i class="fas star-icon-clicked fa-star"></i>';
        coin.isFavorite = true;
      } else {
        starIcon.innerHTML = '<i class="far star-icon fa-star"></i>';
        coin.isFavorite = false;
      }
    });

    var coinImage = document.createElement('img');
    coinImage.classList.add('coin-img');
    coinImage.src = coin.image;
    infoDiv.appendChild(coinImage);
    coinImage.addEventListener('click', event => {
      main.classList.add('hidden');
    });

    var coinName = document.createElement('h1');
    coinName.classList.add('coin-name');
    coinName.textContent = coin.name;
    infoDiv.appendChild(coinName);

    var coinSymbol = document.createElement('h3');
    coinSymbol.classList.add('coin-symbol');
    coinSymbol.textContent = coin.symbol;
    infoDiv.appendChild(coinSymbol);

    var priceDiv = document.createElement('div');
    priceDiv.classList.add('price-div');
    cryptoLi.appendChild(priceDiv);

    var coinPrice = document.createElement('p');
    coinPrice.classList.add('coin-price');
    coinPrice.textContent = '$' + coin.currentPrice;
    priceDiv.appendChild(coinPrice);

    var coinPercent = document.createElement('p');
    if (coin.percent > 0) {
      coinPercent.classList.add('coin-percent-up');
    } else {
      coinPercent.classList.add('coin-percent-down');
    }
    coinPercent.textContent = coin.percent + '%';
    priceDiv.appendChild(coinPercent);

    unListed.appendChild(cryptoLi);

    return cryptoLi;
  });

}

getCryptoCoins();
