const validarEtapa = require("../validacao/validar-etapa");

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
    //4. Só vai diminuir uma vida se a letra chutada não for encontrada no vetor da letras chutadas (chutando ele pela primeira vez)
    // e a palavra correta não contiver a letra chutada
    if ((this.vetorLetrasChutadas.includes(letraChutada) == false) && (this.vetorPalavraFinal.includes(letraChutada) == false)) {
      //6. subtrair uma vida
     this.vidas = this.vidas - 1;
    }
    //3. não entrando na condição acima, incrementa no vetor 
    this.vetorLetrasChutadas.push(letraChutada);

    //só adiciona a letra no vetor letras acertadas, se a letra estiver no vetor parcial,
    // a medida que vai incrementando no letras acertadas vai removendo do vetor parcial
    // até o vetor final bater palavra correta instanciada com a classe Forca
    if (this.vetorPalavraParcial.includes(letraChutada)==true) {
      do {
        //adiciona a letra na posição correta
        this.vetorLetrasAcertadas.splice(this.vetorPalavraParcial.indexOf(letraChutada), 1, letraChutada); 
        //remove de vetor parcial
        this.vetorPalavraParcial.splice(this.vetorPalavraParcial.indexOf(letraChutada), 1, null); 
        
        
      } while (this.vetorPalavraParcial.includes(letraChutada));
    }

    this.buscarEstado();
    //console.log(this.buscarEstado());
    //console.log(this.vetorLetrasAcertadas);
    //console.log(this.vetorPalavraFinal);
    //console.log(this.vetorPalavraParcial);
  }

  buscarEstado() {
    var final = this.vetorPalavraFinal.join();
    var palavraCorreta = this.vetorLetrasAcertadas.join();
    // 2. inicia com aguardando chute
    if (this.vidas>0 && final == palavraCorreta)  {
      //9. "ganhou" se acertar a palavra  
      this.estado = this.vetorEstados[0];        
      } 
    else if (this.vidas <= 0) {
      //8. "perdeu" se terminar as vidas
      this.estado = this.vetorEstados[1];
    } else {
      //senão ganhou e não perdeu. Está "aguardando chute"
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
