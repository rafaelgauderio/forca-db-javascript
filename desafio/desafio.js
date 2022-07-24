const readline = require('readline-sync');
const Forca = require('./forca');

const jogo = new Forca('abacaxi');

while (!["perdeu", "ganhou"].includes(jogo.buscarEstado())) {
    const chute = readline.question("Aguardando chute: \n");
    jogo.chutar(chute);
    console.log(jogo.buscarDadosDoJogo());
}
if(jogo.buscarEstado().toString() == "perdeu") {
	console.log("Meus pêsames. Você perdeu")
	
}	else if(jogo.buscarEstado().toString() == "ganhou") {
	console.log("PARABÉNS. Você ganhou.");
}

//console.log("você " + jogo.buscarEstado());

