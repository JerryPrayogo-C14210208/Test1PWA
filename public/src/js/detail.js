var detailcard = document.querySelector("#detail_card");

var idCard = new URLSearchParams(window.location.search).get('id');
function createdetail(data){
    let newContent = `
    <div class="col d-flex framevideo">
        <iframe class="mx-auto" src="${data.video}" width="1000px" height="600px" id="videocard" title="${data.name}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>

    <div class="col d-flex">
      <div class="row row-cols-1">
        <div class="col mx-auto fs-1 fw-6">
              ${data.name}
          </div>
          <div class="col mx-auto fs-2 ">
            ${data.detail}
          </div>
      </div>
        
    </div>
    `;
    detailcard.innerHTML+= newContent;
}

function clearCards() {
    detailcard.innerHTML = '';
  }

function updateUI(data) {
    clearCards();
    createdetail(data[idCard]);
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
    updateUI(dataArray);
  });

if ('indexedDB' in window) {
  readAllData('cards')
    .then(function(data) {
      if (!networkDataReceived) {
        console.log('From cache', data[idCard]);
        createdetail(data[idCard]);
      }
    });
}