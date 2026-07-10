
/**
 * Função backend que monitora os casos e , para os casos elegíveis, 
 * envia email para as instituições com o link do questionário .
 */
function monitorarCasos() {

  console.log( "monitorarCasos - Início" );      

  let idCaso = 1;

  let caso = BUFFER_FILA[idCaso-1];  
  console.log(caso);

  getSituacaoCasoNaFila( idCaso );

  getSituacaoQuestionario( idCaso );

  console.log( "monitorarCasos - Fim" );      

} // Fim da função monitorarCasos