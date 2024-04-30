// para criar uma lista de item aleatório e não der erro, a variável deve-se criada na primeira linha.
let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    //querySelector é uma função para retornar o primeiro elemento (classe, exemplo: tag) dentro do documento
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    // h1 e p são párametros do index.html para exibição do texto na pagina web.
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('P', `Escolha um número entre 1 e ${numeroLimite}`);
}

exibirMensagemInicial();

// função vinculada ao index.html / deve ser adicionada ao programa html também.
function verificarChute() {
    //input é um parametro de index.html para habilitar o botão 'chutar'.
    let chute = document.querySelector('input').value;
    console.log('O botão foi clicado');

    if(chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        // variaveis (palavraTentativa, mensagemTentativas) criadas para o html reconhecer as templates strings
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        // linha criada para habilitar botão de reinicio. Função atrelada ao Id = 'reiniciar' de index.HTML
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor!');
        } else {
            exibirTextoNaTela('p', ' O número secreto é maior!');
        }
        tentativas++;
        limparCampo();
        // tentativas++ = tentativas + 1 
} 
}

// função criada para gerar o número aleatória de 1 a 10/ para mais casas ou menos modificar multiplicador.
function gerarNumeroAleatorio () {
        let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
        let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
        
        if (quantidadeDeElementosNaLista == numeroLimite) {
            listaDeNumerosSorteados = [];
        }
        if (listaDeNumerosSorteados.includes(numeroEscolhido)){
            return gerarNumeroAleatorio();
        } else {
            listaDeNumerosSorteados.push(numeroEscolhido);
            console.log(listaDeNumerosSorteados)
            return numeroEscolhido;
        }
}

//função criada para limpar o campo digitado (chute)
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}