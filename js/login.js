let checked = false;

/**
 * Retrieves the 'Remember Me' setting from the Local Storage and applies it.
 */
function RememberMeGetLocalStorage(){
    let RemeberMeAsString = localStorage.getItem('checkbox');
    if(RemeberMeAsString){
        let RemeberMeAsJson = JSON.parse(RemeberMeAsString);
        checked = RemeberMeAsJson;
        RememberMeSetLocalStorage();
        loadFromLocalStorage();
    }
}

/**
 * Sets the "Remember Me" checkbox state in Local Storage.
 */
function RememberMeSetLocalStorage(){
    let inputcheck = document.getElementById('check');
    if(checked == true){
        localStorage.setItem('checkbox', checked);
        inputcheck.checked = checked;
        checked = false;
    }else{
        inputcheck.checked = checked;
        localStorage.setItem('checkbox', checked);
        checked = true;
    }
}

/**
 * Loads user data from Local Storage and populates input fields with the data if available.
 */
function loadFromLocalStorage(){
    let userAsString = localStorage.getItem('user');
    if(userAsString){
        let userAsJson = JSON.parse(userAsString);
        pushInInput(userAsJson);
    }
}

/**
 * Populates the email and password input fields with user data from a JSON object.
 * Clears the fields if 'checked' is true.
 *
 * @param {Object} userAsJson - The user data in JSON format.
 */
function pushInInput(userAsJson){
    if(checked == false){
        let email = document.getElementById('email');
        let password = document.getElementById('password');
        email.value = userAsJson['email'];
        password.value = userAsJson['password'];
        seePassword();
    }else{
        email.value = '';
        password.value = '';
    }
}

/**
 * Handles user login form submission and redirects or displays an error message.
 *
 * @param {Event} event - The form submission event.
 */
function login(event){
    event.preventDefault();
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find(u => u.email == email.value && u.password == password.value);
    handleUserLogin(email,password,user);
}

/**
 * Logs in a guest user, storing their information and redirecting to the summary page.
 */
function guestLogin(){
    let guestUser = {name: 'Guest', email: 'Guest@Guest.de', password: '1234', contact: Array(0), tel: 0, firstLetter: 'Guest'}
    let userAsString = JSON.stringify(guestUser);
    localStorage.setItem('user', userAsString);
    location.href = "summary.html";
}

/**
 * Handles user login and redirects or displays an error message accordingly.
 *
 * @param {HTMLInputElement} email - The email input field.
 * @param {HTMLInputElement} password - The password input field.
 * @param {Object} user - The user object to be logged in.
 */
function handleUserLogin(email,password,user){
    if(user){
        if(user.email != 'Guest@Guest.de'){
            let userAsString = JSON.stringify(user);
            localStorage.setItem('user', userAsString);
        }
        location.href = "summary.html";
    }else{
        email.value = ''
        password.value = ''
        document.getElementById('wrong').classList.remove('d-none');
    }
}

/**
 * Displays the "Send" button and clears the email input field for the forgot password process.
 */
function forgotPassword(){
    document.getElementById('send').classList.remove('d-none');
    document.getElementById('email').value = '';
}
