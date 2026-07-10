
/**
 * Função backend que monitora os casos e , para os casos elegíveis, 
 * envia email para as instituições com o link do questionário .
 */
function monitorarCasos() {

  console.log( "monitorarCasos - Início" );      

  let idCaso = 514;
  let caso = BUFFER_FILA[idCaso-1];  
  
  let situacaoCaso = getSituacaoCaso( idCaso );

  let vistoriasCaso = pesquisarVistoriasPorCPF( caso[CPF_RF] );
  let situacaoVistoria = getSituacaoVistoria( vistoriasCaso );

  let situacaoQuestionario = getSituacaoQuestionario( idCaso );

  console.log( "Situacao Caso: " + situacaoCaso );
  console.log( "Situacao Vistoria: " + situacaoVistoria );
  console.log( "Situacao Questionario: " + situacaoQuestionario );


  if(situacaoCaso == "3" && situacaoVistoria == "" && (situacaoQuestionario == "1" || situacaoQuestionario == "2") ) {
    console.log( "ENVIAR EMAIL" );  
    salvarEnvioDeQuestionario( idCaso );
  }

  
  console.log( "monitorarCasos - Fim" );      

} // Fim da função monitorarCasos