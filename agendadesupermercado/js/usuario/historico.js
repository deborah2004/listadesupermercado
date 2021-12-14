var historico = database.ref('users/' + sessionStorage.uid + '/historico');
var valores = [];
var labels = [];

historico.on('child_added', (snapshot) => {
    var historico = snapshot.val();
    var key = snapshot.key;
    var mes = historico.data.split(" ")[3];
    var dia = historico.data.split(" ")[1];
    var hora = historico.data.split(" ")[7];
    var newDate = dia + " " + mes.substr(0,3) + ". " + hora

    var query = `
    <div class="card">
                <div class="card-header" id="headingTwo1${key}">
                    <div class="row">
                        <h5 class="mb-0 col-8">
                            <button class="btn btn-outline-secondary collapsed" data-toggle="collapse" data-target="#collapseTwo1${key}"
                                aria-expanded="false" aria-controls="collapseTwo1${key}">
                                ${historico.data}
                            </button>
                        </h5>
                        <h6 class="col-4 text-end mt-2" id="total${key}">
                                R$ ${parseFloat(historico.total).toFixed(2)}
                        </h6>    
                    </div>
                </div>
                <div id="collapseTwo1${key}"  class="collapse" aria-labelledby="headingTwo1${key}" data-parent="#accordion">
                    <div class="card-body">
                        <table class="table" id="${key}">
                            <tbody>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    `;
    $('#list').append(query);


    historico.historico.forEach(data => {
        var content = '';
        content += '<tr>';
        content += '<td>' + data.nome + '</td>';
        content += '<td>R$ ' + data.preco + '</td>';
        content += '</tr>';
        $('#' + key).append(content);
    });
    valores.push(historico.total)
    labels.push(newDate)

})

var btnSair = document.getElementById("sair");

btnSair.addEventListener('click', function () {
    sessionStorage.removeItem("uid")
    window.location.href = "../index.html";
})


// Grafico
console.log(valores, labels)
const data = {
    labels: labels,
    datasets: [{
        label: 'Gastos em R$',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: valores,
    }]
};
const config = {
    type: 'line',
    data: data,
    options: {}
};

const myChart = new Chart(
    document.getElementById('myChart'),
    config
);