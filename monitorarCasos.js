
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

  let proposicao1;
  let proposicao2;

  try {

    for( let idCaso=1; idCaso<=TAMANHO_FILA; ++idCaso ) {
  
      caso = BUFFER_FILA[idCaso-1];  
      
      situacaoCaso = getSituacaoCaso( idCaso );  
      vistoriasCaso = pesquisarVistoriasPorCPF( caso[CPF_RF] );
      situacaoVistoria = getSituacaoVistoria( vistoriasCaso );  
      situacaoQuestionario = getSituacaoQuestionario( idCaso );
  
    
      // Casos convocados para acesso, sem movimentação de vistoria e sem questionário respondido
      proposicao1 = situacaoCaso == "3" && situacaoVistoria == "" && (situacaoQuestionario == "1" || situacaoQuestionario == "2");
  
      // Casos ainda não convocados para acesso e sem questionário respondido
      proposicao2 = (situacaoCaso == "2" || situacaoCaso == "7") && (situacaoQuestionario == "1" || situacaoQuestionario == "2");    
  
      if( proposicao1 || proposicao2 ) {
        enviarEmailBE( idCaso );
        salvarEnvioDeQuestionario( idCaso );
      }
  
    } // Fim for    


  } catch( error ) {

    console.log( "monitorarCasos - " + error.message );    
    throw( "monitorarCasos - " + error.message );

  }

  
  console.log( "monitorarCasos - Fim" );      

} // Fim da função monitorarCasos