"use strict";

/**
 * Módulo:    tabelasQuestionario.gs
 * Objetivo:  Armazenar a tabela principal do sistema Bolsa Moradia - Questionário
 */



/**
 * Planilha QUESTIONARIO
 */
const PLANILHA_QUESTIONARIO_ID  =  "1Lu69-a1VHgWcCEXRt9RKjmoVfOTmHFXBqpfM2G0pMnE";
const PLANILHA_QUESTIONARIO     =  SpreadsheetApp.openById(PLANILHA_QUESTIONARIO_ID);

const TABELA_QUESTIONARIO  =  PLANILHA_QUESTIONARIO.getSheetByName('QUESTIONARIO');
const BUFFER_QUESTIONARIO  =  TABELA_QUESTIONARIO.getDataRange().getDisplayValues().splice(1);
const NUM_QUESTIONARIO     =  BUFFER_QUESTIONARIO.length;



/**
 * Constantes que armazenam as posições das colunas da tabela QUESTIONARIO
 */
const ID_CASO           = 0;

const ID_TRABALHADOR_RESPONSAVEL_RESPOSTA = 1;
const DATA_ENVIO_EMAIL_QUESTIONARIO = 2;
const DATA_RESPOSTA_QUESTIONARIO = 3;
const RESPOSTAS = 4;
const OBSERVACAO = 5;




/**
 * Função backend que retorna a situação do questionário de um caso
 *    1 - Sem questionário a responder
 *    2 - Questionário enviado mas não respondido
 *    3 - Questionário enviado e respondido
 */       
function getSituacaoQuestionario( idCaso ) {

  let situacaoQuestionario;
  
  if( (BUFFER_QUESTIONARIO[idCaso-1][DATA_ENVIO_EMAIL_QUESTIONARIO] === "") &&
      (BUFFER_QUESTIONARIO[idCaso-1][DATA_RESPOSTA_QUESTIONARIO] === "") ) {

    // Sem questionário a responder
    situacaoQuestionario = "1";  

  } else if( (BUFFER_QUESTIONARIO[idCaso-1][DATA_ENVIO_EMAIL_QUESTIONARIO] !== "") &&
             (BUFFER_QUESTIONARIO[idCaso-1][DATA_RESPOSTA_QUESTIONARIO] === "") ) {

    // Questionário enviado mas não respondido
    situacaoQuestionario = "2";                  

  } else if( (BUFFER_QUESTIONARIO[idCaso-1][DATA_ENVIO_EMAIL_QUESTIONARIO] !== "") &&
             (BUFFER_QUESTIONARIO[idCaso-1][DATA_RESPOSTA_QUESTIONARIO] !== "") ) {

    // Questionário enviado e respondido
    situacaoQuestionario = "3";                  
    
  }

  return situacaoQuestionario;

} // Fim da função getSituacaoQuestionario



/**
 * Função backend para salvar o questionário
 */       
function salvarEnvioDeQuestionario( idCaso ) {

  try {

      // Gera, formata e grava a data de envio do questionário
      let dataEnvio = new Date().toLocaleString("pt-BR", {dateStyle: "short"});    
      const campo_data = TABELA_QUESTIONARIO.getRange( idCaso+1, DATA_ENVIO_EMAIL_QUESTIONARIO+1 );
      campo_data.setValue( dataEnvio );

  } catch( error ) {

    console.log( "salvarQuestionarioBE - " + error.message );
    throw( "salvarQuestionarioBE - " + error.message );

  }      

} // Fim da função salvarEnvioDeQuestionario



/**
 * Função backend que monitora os casos e, para os casos elegíveis, 
 * envia email para as instituições com o link do questionário .
 */
function enviarNovosQuestionarios() {

  console.log( "enviarNovosQuestionarios - Início" );      
  
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

    console.log( "enviarNovosQuestionarios - " + error.message );    
    throw( "enviarNovosQuestionarios - " + error.message );
  }
  
  console.log( "enviarNovosQuestionarios - Fim" );      

} // Fim da função enviarNovosQuestionarios



/**
 * Função backend que monitora os casos e , para os casos elegíveis, 
 * envia email para as instituições com o link do questionário .
 */
function enviarLembretesQuestionarios() {

  console.log( "enviarLembretesQuestionarios - Início" );      
  
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
      proposicao1 = situacaoCaso == "3" && situacaoVistoria == "" && situacaoQuestionario == "2";
  
      // Casos ainda não convocados para acesso e sem questionário respondido
      proposicao2 = (situacaoCaso == "2" || situacaoCaso == "7") && (situacaoQuestionario == "2");    
  
      if( proposicao1 || proposicao2 ) {
        enviarEmailBE( idCaso );
      }
  
    } // Fim for    

  } catch( error ) {

    console.log( "enviarLembretesQuestionarios - " + error.message );    
    throw( "enviarLembretesQuestionarios - " + error.message );
  }
  
  console.log( "enviarLembretesQuestionarios - Fim" );      

} // Fim da função enviarLembretesQuestionarios




