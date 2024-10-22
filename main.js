// Técnica:

const mainContent = document.querySelector(".main__content");
const data = await getData();

function GeraHtml() {
  return `
    
      <div class='quadroQuestao'>
          <div class='questao'>
            <h2 class='texto_questao'>
              1)Observe o trecho de código abaixo:<br> 
              int INDICE = 13, SOMA = 0, K = 0<br>
              Enquanto K <h2 INDICE faça { K = K + 1; SOMA = SOMA + K; }<br>
              Imprimir(SOMA)<br>
              Ao final do processamento, qual será o valor da variável SOMA?<br>
            </h2>
        </div>
      <div class='resposta'>
        <h3 class='texto_resposta'>
          ${ResultadoDaSoma()}
        </h3>
      </div>
      
      
      
      <div class='questao'>
        <h2 class='texto_questao'>
          2) Dado a sequência de Fibonacci, onde se inicia por 0 e 1 e o próximo valor sempre será a soma dos 2 valores anteriores<br>
          (exemplo: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...), escreva um programa na linguagem que desejar onde, informado um número,
          ele calcule a sequência de Fibonacci e retorne uma mensagem avisando se o número informado pertence ou não a sequência.<br>
        </h2>
        </div>
      <div class='resposta'>
        <h3>
          ${sequenciaFibonace(12)}
        </h3>
      </div>
      <div class='questao'>
        <h2 class='texto_questao'>
          3) Dado um vetor que guarda o valor de faturamento diário de uma distribuidora, faça um programa, na linguagem que desejar, que calcule e retorne:
          <ul>
            <li>O menor valor de faturamento ocorrido em um dia do mês</li>
            <li>O maior valor de faturamento ocorrido em um dia do mês</li>
            <li>Número de dias no mês em que o valor de faturamento diário foi superior à média mensal</li>
          </ul>


          IMPORTANTE:<br>
          a) Usar o json ou xml disponível como fonte dos dados do faturamento mensal<br>
          b) Podem existir dias sem faturamento, como nos finais de semana e feriados. Estes dias devem ser ignorados no cálculo da média;
       
        </h2>
        </div>
      <div class='resposta' id='resposta3'>
        
        <h3>
          ${data}
        </h3>
      </div>
      <div class='questao'>
        <h2 class='texto_questao'>
          4) Dado o valor de faturamento mensal de uma distribuidora, detalhado por estado:
            <ul>
              <li>SP  R$67.836,43</li>
              <li>RJ  R$36.678,66</li>
              <li>MG  R$29.229,88</li>
              <li>ES  R$27.165,48</li>
              <li>Outros  R$19.849,53</li>
            </ul>

          Escreva um programa na linguagem que desejar onde calcule o percentual de representação que cada estado teve dentro do valor total mensal da distribuidora.
       
        </h2>
        </div>
      <div class='resposta'>
        <h3 class='texto_resposta'>
          ${getPorcentagemFaturamentoMensal()}
        </h3>
      </div>
      <div class='questao'>
        <h2 class='texto_questao'>
          5) Escreva um programa que inverta os caracteres de um string.

              IMPORTANTE:
              a) Essa string pode ser informada através de qualquer entrada de sua preferência ou pode ser previamente definida no código;
              b) Evite usar funções prontas, como, por exemplo, reverse;
                      </h2>
        </div>
      <div class='resposta'>
         ${inverteString(texto)}
        </h3>
      </div>
    
    </diV>
  `;
}

//Funcão resposnsavel por exibir o Html
function exibeConteudo() {
  let conteudo = GeraHtml();

  mainContent.innerHTML = conteudo;
}

//Funções de respostas

function ResultadoDaSoma() {
  var indice = 13;
  var K = 0;
  let soma = 0;
  while (K < indice) {
    K += 1;
    soma += K;
  }
  return `A soma é ${soma}`;
}

function sequenciaFibonace(numero) {
  var sequencia = [0, 1];

  let num = numero;
  var resposta = `O numero ${num} não pertence a sequencia Fibonacci`;

  for (let i = 1; i <= num; i++) {
    let ant = i - 1;
    let pos = i + 1;

    let proximo = sequencia[ant] + sequencia[i];
    sequencia[pos] = proximo;
  }
  sequencia.map((item) => {
    if (num === item) {
      resposta = `O numero ${num} pertence a sequencia Fibonacci`;
    }
  });

  return resposta;
}

async function getData() {
  const arquivo = "./dados.json";
  try {
    const response = await fetch(arquivo);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    let valores = [];
    let soma = 0;

    data.map((item) => {
      if (item.valor != 0) {
        valores.push(item.valor);
        soma += Number(item.valor);
      }
    });
    let media = (soma / valores.length).toFixed(2);
    let maiorValor = Math.max(...valores);
    let menorValor = Math.min(...valores);
    let diasRuins = [];

    data.map((item) => {
      if (item.valor < media) {
        diasRuins.push(item.dia);
      }
    });
    let numDiasRuins = diasRuins.length;

    return `
        <ul>
        <li>Menor valor: ${menorValor}</li>
        <li>Menor valor: ${maiorValor}</li>
        <li>Dias com faturamento menor que a media mensal: ${numDiasRuins}</li>
        </ul>
     
     `;
  } catch (error) {
    console.error(error.message);
  }
}

function getPorcentagemFaturamentoMensal() {
  const faturamentoEstados = {
    SP: 67836.43,
    RJ: 36678.66,
    MG: 29229.88,
    ES: 27165.48,
    Outros: 19849.53,
  };
  let soma = 0;
  for (const [key, value] of Object.entries(faturamentoEstados)) {
    soma += value;
  }
  let texto = [];
  for (const [key, value] of Object.entries(faturamentoEstados)) {
    var percEstado = ((value / soma) * 100).toFixed(2);
    texto.push(`<li>${key} corresponde a ${percEstado}% do faturamento</li>`);
  }
  return texto.join("");
}

var texto = "Aqui tem um texto para exemplo";

function inverteString(text) {
  let textoInvertido = "";

  for (let i = text.length - 1; i >= 0; i--) {
    textoInvertido += text[i];
  }
  console.log(texto);
  console.log(textoInvertido);

  let res = `${texto}<br>
             <mark>abaixo está ele invertido</mark><br>
             ${textoInvertido}  
            `;
  return res;
}

exibeConteudo();
