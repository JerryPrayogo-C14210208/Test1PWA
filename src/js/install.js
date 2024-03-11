var installBtn = document.querySelector('#install');

function openCreatePostModal() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
  
      deferredPrompt.userChoice.then(function(choiceResult) {
        console.log(choiceResult.outcome);
  
        if (choiceResult.outcome === 'dismissed') {
          console.log('User cancelled installation');
        } else {
          console.log('User added to home screen');
        }
      });
  
      deferredPrompt = null;
    }
    else{
        alert("Pengguna sudah mengginstal PWA");
    }
}

installBtn.addEventListener('click', openCreatePostModal);