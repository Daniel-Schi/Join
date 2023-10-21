let users = [];
let allContacts = [];
let initials = '';

async function userInit() {
  await loadUsers();
}

/**
 * Toggle the visibility of logout, help, and legal buttons for mobile view.
 */
function showLogOutMobile() {
  let logOutButton = document.getElementById('logout');
  let helpButton = document.getElementById('openhelp');
  let legalButton = document.getElementById('openlegal');

  if (logOutButton.classList.contains('d-none')) {
    logOutButton.classList.remove('d-none');
    helpButton.classList.remove('d-none');
    legalButton.classList.remove('d-none');
  } else {
    logOutButton.classList.add('d-none');
    helpButton.classList.add('d-none');
    legalButton.classList.add('d-none');
  }
}

/**
 * Toggles the visibility and styling of the logout button for desktop view.
 */
function showLogOutDesktop() {
  let logOutButton = document.getElementById('logout');

  if (logOutButton.classList.contains('d-none')) {
    document.getElementById('logout').classList.remove('logoutdiv');
    document.getElementById('logout').classList.add('logoutdivOne');
    logOutButton.classList.remove('d-none');
  } else {
    document.getElementById('logout').classList.add('logoutdiv');
    document.getElementById('logout').classList.remove('logoutdivOne');
    logOutButton.classList.add('d-none');
  }
}

/**
 * Handles the display of a logout button based on the window width.
 * Calls either showLogOutMobile() or showLogOutDesktop() based on the window width.
 */
function showLogOut() {
  if (window.innerWidth <= 768) {
    showLogOutMobile();
  } else {
    showLogOutDesktop();
  }
}

/**
 * Toggles the visibility of specified HTML elements by adding or removing the 'd-none' class.
 */
function initialClassList() {
  if (logOutButton.classList.contains('d-none')) {
    logOutButton.classList.remove('d-none');
    helpButton.classList.remove('d-none');
    legalButton.classList.remove('d-none');
  } else {
    logOutButton.classList.add('d-none');
    helpButton.classList.add('d-none');
    legalButton.classList.add('d-none');
  };
}

function openhelp() {
  location.href = "help.html";
}

function openlegal() {
  location.href = "legal.html";
}

function logout() {
  location.href = "index.html";
}

async function loadUsers() {
  const storedUsers = await getItem('users');
  users = storedUsers ? JSON.parse(storedUsers) : [];
  updateAllContacts();
}

function updateAllContacts() {
  allContacts = users.map(user => user.name).sort();
}

/**
 * Asynchronously generates a random color from a predefined list of colors.
 *
 * @async
 * @function
 * @returns {Promise<string>} A Promise that resolves to a random color string.
 */
async function getRandomColor() {
  let colors = ["orange", "hsl(193.32deg 88.4% 45.3%)", "hsl(330.81deg 88.4% 45.3%)", "hsl(0deg 97.03% 50.22%)", "rgb(221, 23, 221)", "rgb(31, 196, 31)"];
  let randomIndex = Math.floor(Math.random() * colors.length);
  let randomColor = colors[randomIndex];

  if (typeof randomColor === 'string') {
    return randomColor;
  } else {
    return getRandomColor();
  }
}

/**
 * Registers a new user with the provided information and stores it in the users array.
 *
 * @async
 * @function
 * @returns {Promise<void>}
 */
async function register() {
  Btn.disabled = true;
  let name = inputName.value;
  let email = inputEmail.value
  renderfirstNames(name);
  let rendomColor = await getRandomColor();
  if (Array.isArray(users)) {
    users.push({
      'name': name,
      'email': email,
      'password': password.value,
      'contact': [],
      'tel': '',
      'firstLetter': initials,
      'color': rendomColor,
    });
    await setItem('users', JSON.stringify(users))
    clearInput();
    render();
    back();
    setinLocalstorage(email)
  }
}

/**
 * Sets user data in the Local Storage based on the provided email and redirects to the summary page.
 *
 * @param {string} email - The email address of the user to store in Local Storage.
 */
function setinLocalstorage(email) {
  let user = users.find(u => u.email == email);
  let userAsString = JSON.stringify(user);
  localStorage.setItem('user', userAsString);
  location.href = "summary.html";
}

function clearInput() {
  inputName.value = '';
  inputEmail.value = '';
  password.value = '';
  Btn.disabled = false;
}

/**
 * Render the initials based on the input name and update all contacts.
 *
 * @param {string} inputname - The name input to generate initials from.
 */
function renderfirstNames(inputname) {
  let names = inputname.split(' ');
  initials = '';
  for (let i = 0; i < names.length; i++) {
    let name = names[i];
    let initial = name.charAt(0).toUpperCase();
    initials += initial;
  }
  updateAllContacts();
}