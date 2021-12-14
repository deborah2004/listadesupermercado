var btnCadastro = document.getElementById("btnCadastro");

btnCadastro.addEventListener('click', function () {

    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var nome = document.getElementById("nome").value;
    var cpf = document.getElementById("cpf").value;
    var sexo = document.getElementById("sexo").value;
    var dataNasc = document.getElementById("dataNasc").value;
    var cep = document.getElementById("cep").value;
    var bairro = document.getElementById("bairro").value;
    var rua = document.getElementById("rua").value;
    var numero = document.getElementById("numero").value;


    auth.createUserWithEmailAndPassword(email, senha)
        .then(() => {
            // Signed in
            var id = auth.currentUser.uid;
            var databaseRef = database.ref();

            var data = {
                email: email,
                nome: nome,
                cpf: cpf,
                sexo: sexo,
                dataNasc: dataNasc,
                cep: cep,
                bairro: bairro,
                rua: rua,
                numero: numero
            }
            databaseRef.child('users/' + id).set(data)
                .then(() => {
                    window.location.href = "../../index.html";
                })

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("erro", errorMessage, email, senha)
            // ..
        });
});

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