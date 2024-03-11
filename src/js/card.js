var cardArea = document.getElementById('workout_card');

function createCard(data){
    let newContent = `
    <div class="col mb-5">
    <a href="/detail/?id=${data.id}">
        <div class="card mx-auto" >
            
                <img src="${data.image}" class="card-img darken-image" alt="pushup">
                <div class="card-img-overlay d-flex align-items-center justify-content-center">
                <h5 class="card-title text-center fw-bolder text-white">${data.name}</h5>
                </div>
           
        </div>
        </a>
    </div>`;
cardArea.innerHTML+= newContent;
}

function clearCards() {
   cardArea.innerHTML = '';
  }

function updateUI(data) {
    clearCards();
    for (var i = 0; i < data.length; i++) {
      createCard(data[i]);
    }
  }

var url = 'https://test1pwa-78a8d-default-rtdb.firebaseio.com/cards.json';
var networkDataReceived = false;

fetch(url)
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    networkDataReceived = true;
    console.log('From web', data);
    var dataArray = [];
    for (var key in data) {
      dataArray.push(data[key]);
    }
    clearAllData('cards')
          .then(function () {
            return data;
          })
          .then(function (data) {
            for (var key in data) {
              writeData('cards', data[key])
            console.log("DEBUG: Masuk");

            }
          });
    updateUI(dataArray);
  });

if ('indexedDB' in window) {
  readAllData('cards')
    .then(function(data) {
      if (!networkDataReceived) {
        console.log('From cache', data);
        updateUI(data);
      }
    });
}