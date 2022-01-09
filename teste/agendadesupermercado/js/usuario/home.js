var displayData = document.getElementById("display-data");

// ============= Dados do usuário ================

const dbRef = database.ref();
var bv = document.getElementById("bv")
dbRef.child("users").child(sessionStorage.uid).get().then((snapshot) => {
    if (snapshot.exists()) {
        const data = snapshot.val();
        bv.innerHTML = "Olá, " + data.nome
    }
})

// ============= Pegando os dados do meu carrinho ================

var carrinhoRef = database.ref('users/' + sessionStorage.uid + '/carrinho');
var carrinhoKeys = []
carrinhoRef.on('child_added', (snapshot) => {
    var carrinho = snapshot.val();
    carrinhoKeys.push(carrinho.key);
});

// ============= Pegando os dados das empresas ================
var empresasRef = database.ref('empresas');
empresasRef.on('child_added', (snapshot) => {
    var empresa = snapshot.val();
    empresa = { ...empresa, key: snapshot.key }
    var produtos = [];
    if (empresa.produtos) {
        Object.keys(empresa.produtos).forEach((key) => {
            produtos.push({ ...empresa.produtos[key], key: key });
        });
        tamplate(empresa, produtos);
    }
});



// ============= Criando a interface  ================

function tamplate(empresa, produtos) {
    var query = `
    <div class="card  mt-2 mb-2 px-0 mx-auto">
    <div class="card-body">
        <h5 class="card-title">${empresa.nome}</h5>
        <p><i class="fas fa-map-marker-alt"></i> ${empresa.rua}, ${empresa.numero} - ${empresa.bairro} - ${empresa.cep}</p>
        <table class="table table-hover table-bordered" id="${empresa.key}">
            <thead>
                <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Preço</th>
                    <th scope="col">Ação</th>
                  </tr>
            </thead>
            <tbody class="myTable">
            </tbody>
          </table>
        </div>
    </div>
    `

    $('#display-data').append(query);

    produtos.map((data) => {

        var itemAdicionado = carrinhoKeys.includes(data.key);

        var content = '';
        content += '<tr>';
        content += '<th scope="row">' + "#" + data.codigo + '</th>';
        content += '<td class="w-25">' + data.nome + '</td>';
        content += '<td>' + data.quantidade + '</td>';
        content += '<td><span class="badge bg-warning fs-6 w-50">R$ ' + data.preco + '</span></td>';
        itemAdicionado ?
            content += '<td class="w-25">' + '<button class="btn btn-success btn-sm w-50" disabled id="' + data.key + '"><i class="fas fa-check fa-sm"></i> Adicionado</button>' + '</td>'
            :
            content += '<td class="w-25">' + '<button class="btn btn-outline-primary btn-sm w-50" id="' + data.key + '">+ Adicionar na lista</button>' + '</td>'
        content += '</tr>';

        $('#' + empresa.key).append(content);

        var acao = document.getElementById(data.key);

        acao.addEventListener('click', function () {
            adicionarNoCarrinho(data);
        });
    });
}

// ============= Adicionar no carrinho ================


function adicionarNoCarrinho(produto) {
    var carrinhoRef = database.ref('users/' + sessionStorage.uid + '/carrinho');
    var novoItemRef = carrinhoRef.push();
    var btn = document.getElementById(produto.key);
    novoItemRef.set({...produto, quantidade: 1})
        .then(() => {
            btn.innerHTML = "<i class='fas fa-check fa-sm'></i> Adicionado";
            btn.className = "btn btn-success btn-sm w-50"
            btn.disabled = true;
        })
}


var btnSair = document.getElementById("sair");

btnSair.addEventListener('click', function () {
    sessionStorage.removeItem("uid")
    window.location.href = "../index.html";
})


// Pesquisar 

$(document).ready(function () {
    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".myTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            if ($(this).text().toLowerCase().indexOf(value)) {
                $(this).css('background-color', 'rgba(7, 186, 3, 0.1)');
            } else {
                $(this).css('background-color', 'white');
            }

        });
    });

});