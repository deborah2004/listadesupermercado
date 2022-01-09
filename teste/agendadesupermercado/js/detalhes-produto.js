const queryString = window.location;
var url = new URL(queryString);
var idPorduto = url.searchParams.get("id");

var starCountRef = database.ref('empresas/' + sessionStorage.uid + '/produtos/' + idPorduto);
starCountRef.get().then((snapshot) => {
    if (snapshot.exists()) {
        const data = snapshot.val();
        document.getElementById("codigo").value = parseInt(data.codigo);
        document.getElementById("nome").value = data.nome;
        document.getElementById("preco").value = data.preco;
        document.getElementById("quantidade").value = data.quantidade;
        document.getElementById("descricao").value = data.descricao
    }
})



// =============== Atualizar produto ===============

var btnSalvar = document.getElementById("salvar");

btnSalvar.addEventListener('click', function () {

    var codigo = document.getElementById("codigo").value;
    var nome = document.getElementById("nome").value;
    var preco = document.getElementById("preco").value;
    var quantidade = document.getElementById("quantidade").value;
    var descricao = document.getElementById("descricao").value;

    var data = {
        codigo: codigo,
        nome: nome,
        preco: preco,
        quantidade: quantidade,
        descricao: descricao,
    }
    var updates = {};
    updates['empresas/' + sessionStorage.uid + '/produtos/' + idPorduto] = data;
    database.ref().update(updates).then(() => {
        window.location.href = "./lista.html";
    })
});


// =============== Deletar Produto ===============

var btnDeletar = document.getElementById("deletar-produto");

btnDeletar.addEventListener('click', function () {

    var refProduct = database.ref('empresas/' + sessionStorage.uid + '/produtos/' + idPorduto);
    refProduct.remove().then(() => {
        window.location.href = "./lista.html";
    })
});


var btnSair = document.getElementById("sair");

btnSair.addEventListener('click', function () {
    sessionStorage.removeItem("uid")
    window.location.href = "./login.html";
})