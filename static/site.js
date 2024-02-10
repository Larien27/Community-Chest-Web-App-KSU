function fetchFile() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(event) {
    if(xhr.readyState === 4 && xhr.status === 200) {
      addCards(xhr.responseText);
    }
  }
  xhr.open("GET", './box-locations.json');
  xhr.send();
}

function JSONtoObjects(jsonFile) {
  return JSON.parse(jsonFile);
}

function createCard(name, lat, lng) {
  var card = document.createElement('div');

  var img = document.createElement('img');
  img.setAttribute('alt', name + " Location");
  img.setAttribute('src', `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=300x300&markers=color:red%7C${lat},${lng}&style=feature:road%7Ccolor:0xffffff%7Cvisibility:simplified&key=AIzaSyAqQhirQyUFzYzGTdVQVoJCNxqOyKjhdhw`);
  card.appendChild(img);

  var div = document.createElement('div');
  div.classList.add('content');
  var h2 = document.createElement('h2');
  h2.textContent = name;
  div.appendChild(h2);
  card.appendChild(div);

  var cardContainer = document.querySelector('.card-container');
  cardContainer.appendChild(card);
}

function addCards(jsonFile) {
  cardObjects = JSONtoObjects(jsonFile);
  cardObjects.forEach(function(item) {
    createCard(item.name, item.lat, item.lng);
  });
}

fetchFile();