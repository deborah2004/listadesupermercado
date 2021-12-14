var btnCadastro = document.getElementById("entrar");
var email = document.getElementById("email");
var senha = document.getElementById("senha");

btnCadastro.addEventListener('click', function () {
    auth.signInWithEmailAndPassword(email.value, senha.value)
        .then(() => {
            // Signed in
            const uid =  auth.currentUser.uid;
            sessionStorage.setItem("uid", uid);
            window.location.href = "./lista.html";
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("erro", errorMessage)
            document.getElementById('alert').hidden = false
            // ..
        });
});

// mostar senha

var show = false;
btnChange = document.getElementById("change");
btnChange.addEventListener('click', function () {
    show = !show;
    var input = document.getElementById('senha');
    if(show){
        input.type = 'text'
        $("#olho").removeClass("fa fa-eye-slash");
        $("#olho").toggleClass("fa fa-eye");
    }else{
        input.type = 'password'
        $("#olho").removeClass("fa fa-eye");
        $("#olho").toggleClass("fa fa-eye-slash");
    }
    input.focus();
});

// enter

email.addEventListener("keyup", function(event) {
    enter(event)
});

senha.addEventListener("keyup", function(event) {
    enter(event)
});

function enter(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        btnCadastro.click();
      }
}