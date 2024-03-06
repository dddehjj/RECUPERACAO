async function testarAPI() {
    var url = document.getElementById("url").value;
    var qtdRequisicoes = parseInt(document.getElementById("qtd-requisicoes").value);

    var tempos = [];
    var resultados = document.getElementById("resultados");
    resultados.innerHTML = "";

    for (var i = 0; i < qtdRequisicoes; i++) {
        var inicio = performance.now();

        await fetch(url);

        var fim = performance.now();
        var tempo = fim - inicio;
        tempos.push(tempo);

        var progresso = ((i + 1) / qtdRequisicoes) * 100;
        resultados.innerHTML += "Requisição " + (i + 1) + ": " + tempo.toFixed(2) + " ms<br>";
        resultados.innerHTML += "Progresso: " + progresso.toFixed(2) + "%<br><br>";

        resultados.scrollTop = resultados.scrollHeight;
    }

    var tempoTotal = tempos.reduce((a, b) => a + b, 0);
    var tempoMedio = tempoTotal / qtdRequisicoes;

    document.getElementById("tempo-total").textContent = "Tempo Total de Resposta para " + qtdRequisicoes + " requisições: " + tempoTotal.toFixed(2) + " ms";
    document.getElementById("tempo-medio").textContent = "Tempo Médio de Resposta: " + tempoMedio.toFixed(2) + " ms";
}