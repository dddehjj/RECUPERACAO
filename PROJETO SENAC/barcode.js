function gerarCodigoDeBarras() {
    var valorCodigoDeBarras = document.getElementById('valorCodigoDeBarras').value;
    var url = 'https://barcodeapi.org/api/Code128/' + valorCodigoDeBarras + '.png?text=' + valorCodigoDeBarras;

    var requisicao = new XMLHttpRequest();
    requisicao.open('GET', url, true);
    requisicao.responseType = 'blob'; 
    requisicao.onload = function() {
        if (requisicao.status === 200) {
            var blob = requisicao.response;
            var urlImagem = URL.createObjectURL(blob);
            var imagem = document.createElement('img');
            imagem.src = urlImagem;
            document.getElementById('codigoDeBarras').innerHTML = ''; 
            document.getElementById('codigoDeBarras').appendChild(imagem);
            document.getElementById('botaoDownload').style.display = 'block';
            document.getElementById('botaoDownload').onclick = function() {
                var link = document.createElement('a');
                link.href = urlImagem;
                link.download = 'codigo_de_barras.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };
        } else {
            console.error('Erro:', requisicao.statusText);
            alert('Falha ao gerar código de barras. Por favor, tente novamente mais tarde.');
        }
    };
    requisicao.onerror = function() {
        console.error('Erro:', requisicao.statusText);
        alert('Falha ao gerar código de barras. Por favor, tente novamente mais tarde.');
    };
    requisicao.send();
}
