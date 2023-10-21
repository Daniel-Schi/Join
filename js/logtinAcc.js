let loggedInUser;

async function loadLoggedInUser() {
  let loggedInUserAsString = localStorage.getItem('user');
  loggedInUser = JSON.parse(loggedInUserAsString);
}

function renderUserProfileHead() {
  let profileDiv = document.getElementById('headProfile');
  let letters = loggedInUser['firstLetter'];
  profileDiv.innerHTML = letters;
  profileDiv.style.backgroundColor = loggedInUser['color'];
}

async function renderUserProfile() {
  await loadLoggedInUser(); // Warten, bis loggedInUser geladen ist
  let profileDiv = document.getElementById('greeting-user');
  let name = loggedInUser['name'];
  profileDiv.innerHTML = name;
}


async function renderOverlayProfile() {
  await loadLoggedInUser(); // Warten, bis loggedInUser geladen ist
  let profileDiv = document.getElementById('overlayUser');
  let name = loggedInUser['name'];
  profileDiv.innerHTML = name;
}