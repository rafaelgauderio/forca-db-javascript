class Forca {
  //variavéis  
  vidas = 6; // 1. inicia com 6 vidas
  // 2. inicia com aguardando chute
  estado=  "aguardando chute";
  vetorEstados= ["ganhou","perdeu","aguardando chute"];
  vetorLetrasChutadas = [];
  vetorLetrasAcertadas = [];
  vetorPalavraParcial = [];
  vetorPalavraFinal = [];    
  
  adicionaAoVetor(caracter) {
    this.vetorPalavraFinal.push(caracter);
    this.vetorPalavraParcial.push(caracter);
    this.vetorLetrasAcertadas.push("_");
  }

  constructor(vetorLetrasAcertadas) {
    for (let i = 0; i < vetorLetrasAcertadas.length; i++) {
      this.adicionaAoVetor(vetorLetrasAcertadas[i]);
    }
  }

  chutar(letraChutada) {
    //Só vai diminuir uma vida se a letra chutada não for encontrada no vetor da letras chutadas (chutando ele pela primeira vez)
    // e a palavra correta não contiver a letra chutada
    if ((this.vetorLetrasChutadas.includes(letraChutada) == false) && (this.vetorPalavraFinal.includes(letraChutada) == false)) {
      this.vidas = this.vidas - 1;
    }
    //não entrando na condição acima, incrementa no vetor 
    this.vetorLetrasChutadas.push(letraChutada);

    //só adiciona a letra se encontrar no vetor parcial
    if (this.vetorPalavraParcial.includes(letraChutada)==true) {
      do {
        this.vetorLetrasAcertadas.splice(this.vetorPalavraParcial.indexOf(letraChutada), 1, letraChutada); //adiciona a letra na posição correta
        this.vetorPalavraParcial.splice(this.vetorPalavraParcial.indexOf(letraChutada), 1, null); //remove de vetor parcial
      } while (this.vetorPalavraParcial.includes(letraChutada));
    }

    this.buscarEstado();
    //console.log(this.buscarEstado());
    //console.log(this.vetorLetrasAcertada);
    //console.log(this.vetorPalavraFinal);
    //console.log(this.vetorPalavraParcial);
  }

  buscarEstado() {
    var final = this.vetorPalavraFinal.join();
    var palavraCorreta = this.vetorLetrasAcertadas.join();
    // 2. inicia com aguardando chute    
    if (final == palavraCorreta) {
      this.estado = this.vetorEstados[0];
    } else if (this.vidas <= 0) {
      this.estado = this.vetorEstados[1];
    } else {
      this.estado = this.vetorEstados[2];
    }
    return this.estado;
    // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"
  }
  buscarDadosDoJogo() {
    //retorna um object com as letras chutadas, vidas restantes e letras acertadas
    return {
      letrasChutadas: this.vetorLetrasChutadas, // Deve conter todas as letras chutadas
      vidas: this.vidas, // Quantidade de vidas restantes
      palavra: this.vetorLetrasAcertadas, // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas

    };
  }
}

module.exports = Forca;
