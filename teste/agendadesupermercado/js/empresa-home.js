const dbRef = database.ref();
var bemVindo = document.getElementById("bemVindo")

dbRef.child("empresas").child(sessionStorage.uid).get().then((snapshot) => {
    if (snapshot.exists()) {
        const data = snapshot.val();
        bemVindo.innerHTML = "Olá, " + data.nome;
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});

// =============== Cadastrar produto ===============

var btnCadastro = document.getElementById("cadProduto");

btnCadastro.addEventListener('click', function () {

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

    var listaProdutoRef = database.ref('empresas/' + sessionStorage.uid + '/produtos');
    var novoProdutoRef = listaProdutoRef.push();
    novoProdutoRef.set(data)
        .then(() => {
            $('#myModal').modal('hide')
            document.getElementById("codigo").value = ""
            document.getElementById("nome").value = ""
            document.getElementById("preco").value = ""
            document.getElementById("quantidade").value = ""
            document.getElementById("descricao").value = ""

        })


});

//=============== listar os produtos ===============

var starCountRef = database.ref('empresas/' + sessionStorage.uid + '/produtos');
const lista = document.getElementById("list")
starCountRef.on('child_added', (snapshot) => {
    const data = snapshot.val();
    const idProduto = snapshot.key;
    var content = '';
    content += '<tr>';
    content += '<th scope="row">' + "#" + data.codigo + '</th>';
    content += '<td>' + data.nome + '</td>';
    content += '<td>' + data.preco + '</td>';
    content += '<td>' + data.quantidade + '</td>';
    content += '<td>' + "<a href='./produto.html?id="+ idProduto +"'>Ver mais</a>" + '</td>';

    content += '</tr>';
    $('#list').append(content);
});


var btnSair = document.getElementById("sair");

btnSair.addEventListener('click', function () {
    sessionStorage.removeItem("uid")
    window.location.href = "./login.html";
})