function login(){
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find(u => u.email == email.value && u.password == password.value);
    if(user){
        location.href = "summary.html";
    }else{
        email.value = ''
        password.value = ''
        document.getElementById('wrong').classList.remove('d-none');
        return false;
    }
}