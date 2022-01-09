const queryString = window.location;
var url = new URL(queryString);
var idUsers = url.searchParams.get("id");

dbRef.child("users").child(sessionStorage.uid).get().then((snapshot) => {
    if (snapshot.exists()) {
        const data = snapshot.val();
       console.log(data);
    }
})

var starCountRef = database.ref(sessionStorage.uid+'users/'+idUsers);
starCountRef.get().then((snapshot) => {
    if (snapshot.exists()) {
        const data = snapshot.val();
        document.getElementById("nome").value = data.nome;
        document.getElementById("cpf").value = data.cpf;
        document.getElementById("email").value = data.email;
        document.getElementById("sexo").value = data.sexo;
        document.getElementById("dataNasc").value = data.datNasc;
        document.getElementById("cep").value= data.cep;
        document.getElementById("bairro").value= data.bairro;
        document.getElementById("rua").value= data.rua;
        document.getElementById("numero").value= data.numero;
    }
})



// =============== Atualizar produto ===============

var btnSalvar = document.getElementById("salvar");

btnSalvar.addEventListener('click', function () {

        var nome= document.getElementById("nome").value;
        var cpf= document.getElementById("cpf").value;
        var email= document.getElementById("email").value;
        var sexo= document.getElementById("sexo").value;
        var dataNasc= document.getElementById("dataNasc").value;
        var cep= document.getElementById("cep").value;
        var bairro= document.getElementById("bairro").value;
        var rua= document.getElementById("rua").value;
        var numero= document.getElementById("numero").value;

    var data = {
        nome: nome,
        cpf: cpf,
        email: email,
        sexo: sexo,
        dataNasc: dataNasc,
        cep: cep,
        bairro: bairro,
        rua: rua,
        numero: numero
    }
    var updates = {};
    updates["users/"+sessionStorage.uid] = data;
    database.ref().update(updates).then(() => {
        window.location.href = "../dados.html";
    })
});

var btnSair = document.getElementById("sair");

btnSair.addEventListener('click', function () {
    sessionStorage.removeItem("uid")
    window.location.href = "./login.html";
})