var carrinhoRef = database.ref('users/' + sessionStorage.uid + '/carrinho');
var total = 0;
var itensDoCarrinho = [];
carrinhoRef.on('child_added', (snapshot) => {
    var carrinho = snapshot.val();
    var key = snapshot.key;
    var content = '';
    itensDoCarrinho.push(carrinho);

    content += '<tr id="' + key + '">';
    content += `<td>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" >
                    <label class="form-check-label">
                        ${carrinho.nome}
                    </label>
                </div>
            </td>`
    content += '<td>' + carrinho.preco + '</td>';
    content += '<td class="col-2">' + `
                    <div class="col-8">
                        <div class="input-group ">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary btn-sm" id="menos${carrinho.key}" type="button"><i class="fas fa-minus"></i></button>
                            </div>
                            <input type="number" class="form-control form-control-sm text-center" id="qtd${carrinho.key}" disabled value="${carrinho.quantidade}" placeholder="Qtd" aria-label="Recipient's username" aria-describedby="basic-addon2">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary btn-sm" id="mais${carrinho.key}"  type="button"><i class="fas fa-plus"></i></button>
                            </div>
                        </div>
                    </div>
            ` + '</td>';
    content += `<td class="w-25"><button class="btn btn-outline-danger btn-sm" id="${carrinho.key}">- Remover da lista</button></td>`;
    content += '</tr>';
    $('#carrinho').append(content);

    var mais = document.getElementById('mais' + carrinho.key)
    mais.addEventListener('click', function () {
        updateQtd(true)
    })

    var menos = document.getElementById('menos' + carrinho.key)
    menos.addEventListener('click', function () {
        input = document.getElementById('qtd' + carrinho.key)
        if (input.value != 1) {
            updateQtd(false)
        }
    })

    function updateQtd(is) {
        input = document.getElementById('qtd' + carrinho.key)
        is ? input.value = parseInt(input.value) + 1 : input.value = parseInt(input.value) - 1

        var updates = {};
        carrinho.quantidade = input.value;
        updates['users/' + sessionStorage.uid + '/carrinho/' + key] = carrinho;
        database.ref().update(updates).then(() => {
            console.log("atualizou")
            
            is ? total += parseFloat(carrinho.preco) : total -= parseFloat(carrinho.preco)
            document.getElementById('total').innerText = "R$ " + total.toFixed(2);
        })

    }

    var acao = document.getElementById(carrinho.key);
    acao.addEventListener('click', function () {
        removerDoCarrinho(carrinho, key);
    });

    total += (parseFloat(carrinho.preco) * parseInt(carrinho.quantidade));
    document.getElementById('total').innerText = "R$ " + total.toFixed(2);
})


function removerDoCarrinho(carrinho, key) {
    var itemCarrinhoRef = database.ref('users/' + sessionStorage.uid + '/carrinho/' + key);
    var changeTotal = document.getElementById('total');
    itemCarrinhoRef.remove().then(() => {
        document.getElementById(key).remove();
        console.log("qtd: ", carrinho.quantidade)
        total -= (parseFloat(carrinho.preco) * parseInt(carrinho.quantidade));
        changeTotal.innerText = "R$ " + total.toFixed(2);
    })

}


var finalizar = document.getElementById("finalizar");
finalizar.addEventListener('click', function () {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var optionsHoras = { hour: '2-digit', minute: '2-digit' };

    const date = new Date().toLocaleDateString("pt-BR", options)
    const horas = new Date().toLocaleDateString("pt-BR", optionsHoras)
    const data = date + " às " + horas.split(" ")[1];

    const historico = {
        data: data,
        total: total,
        historico: itensDoCarrinho
    }
    var historicoRef = database.ref('users/' + sessionStorage.uid + '/historico');
    var novoHistoricoRef = historicoRef.push();

    novoHistoricoRef.set(historico)
        .then(() => {
            var apagarCarrinhoRef = database.ref('users/' + sessionStorage.uid + '/carrinho');
            apagarCarrinhoRef.remove().then(() => {
                window.location.href = "./index.html";
            })
        })
});

var btnSair = document.getElementById("sair");

btnSair.addEventListener('click', function () {
    sessionStorage.removeItem("uid")
    window.location.href = "../index.html";
})