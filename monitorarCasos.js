
/**
 * Função backend que monitora os casos e , para os casos elegíveis, 
 * envia email para as instituições com o link do questionário .
 */
function monitorarCasos() {

  console.log( "monitorarCasos - Início" );      

  
  let caso;
  let situacaoCaso;
  let vistoriasCaso;
  let situacaoVistoria;
  let situacaoQuestionario;


  for( let idCaso=1; idCaso<=TAMANHO_FILA; ++idCaso ) {

    caso = BUFFER_FILA[idCaso-1];  
    
    situacaoCaso = getSituacaoCaso( idCaso );  
    vistoriasCaso = pesquisarVistoriasPorCPF( caso[CPF_RF] );
    situacaoVistoria = getSituacaoVistoria( vistoriasCaso );  
    situacaoQuestionario = getSituacaoQuestionario( idCaso );
  
    console.log( "idCaso: " + idCaso );
    console.log( "Situacao Caso: " + situacaoCaso );
    console.log( "Situacao Vistoria: " + situacaoVistoria );
    console.log( "Situacao Questionario: " + situacaoQuestionario );  
  
    if(situacaoCaso == "3" && situacaoVistoria == "" && (situacaoQuestionario == "1" || situacaoQuestionario == "2") ) {
      enviarEmailBE( idCaso );
      salvarEnvioDeQuestionario( idCaso );
    }

  } // Fim for

  
  console.log( "monitorarCasos - Fim" );      

} // Fim da função monitorarCasos