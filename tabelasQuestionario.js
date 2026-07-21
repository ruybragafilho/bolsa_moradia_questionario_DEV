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

const TABELA_QUESTIONARIO   =  PLANILHA_QUESTIONARIO.getSheetByName('QUESTIONARIO');
const BUFFER_QUESTIONARIO   =  TABELA_QUESTIONARIO.getDataRange().getDisplayValues().splice(1);
const TAMANHO_QUESTIONARIO  =  BUFFER_QUESTIONARIO.length;

const NUM_COLUNAS_TABELA_QUESTIONARIO = 6


/**
 * Planilha HISTORICO
 */
const PLANILHA_HISTORICO_ID  =  "1Cr2DHFagtHqQIc9fXFECPXXnZ7YsD5kTfYv7fbUWDYQ";
const PLANILHA_HISTORICO     =  SpreadsheetApp.openById(PLANILHA_HISTORICO_ID);

const TABELA_HISTORICO   =  PLANILHA_HISTORICO.getSheetByName('HISTORICO');
const BUFFER_HISTORICO   =  TABELA_HISTORICO.getDataRange().getDisplayValues().splice(1);
const TAMANHO_HISTORICO  =  BUFFER_HISTORICO.length;



/**
 * Constantes que armazenam as posições das colunas da tabela QUESTIONARIO
 */
const ID_CASO  =  0;

const ID_TRABALHADOR_RESPONSAVEL_RESPOSTA  =  1;
const DATA_ENVIO_EMAIL_QUESTIONARIO        =  2;
const DATA_RESPOSTA_QUESTIONARIO           =  3;
const RESPOSTAS                            =  4;
const OBSERVACAO                           =  5;




// ####  FUNÇÕES AUXILIARES, QUE OPERAM SOBRE UM CASO ESPECÍFICO  ####


/**
 * Função backend que retorna a situação do questionário de um caso
 *    1 - Sem questionário a responder
 *    2 - Questionário enviado mas não respondido
 *    3 - Questionário enviado e respondido
 */       
function getSituacaoQuestionarioCaso( idCaso ) {

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

} // Fim da função getSituacaoQuestionarioCaso



/**
 * Função backend para habilitar o questionário de um caso
 */       
function habilitarQuestionarioCaso( idCaso ) {

  try {

      // Gera, formata e grava a data de envio do questionário
      // Questionários com esse campo diferente de "", estarão habilitados
      let dataEnvio = new Date().toLocaleString("pt-BR", {dateStyle: "short"});    
      const campo_data = TABELA_QUESTIONARIO.getRange( idCaso+1, DATA_ENVIO_EMAIL_QUESTIONARIO+1 );
      campo_data.setValue( dataEnvio );

  } catch( error ) {

    console.log( "habilitarQuestionarioCaso - " + error.message );
    throw( "habilitarQuestionarioCaso - " + error.message );

  }      

} // Fim da função habilitarQuestionarioCaso



// ####  FUNÇÕES QUE OPERAM SOBRE AS LISTAS  ####



/**
 * Função backend para enviar o último questionário para o histórico
 */       
function enviarQuestionariosParaHistorico() {

console.log( "enviarQuestionariosParaHistorico - Início" );      

  // Grava os dados do questionário na planilha HISTORICO

  // TENTA PEGAR O LOCK
  const lock = LockService.getScriptLock();    

  try {

    lock.waitLock(10000);  
    
    
    // SE PEGAR O LOCK, PROSSEGUE COM A GRAVAÇÃO DO QUESTIONÁRIO NO HISTÓRICO
    if( lock.hasLock() ) {

      const range = TABELA_HISTORICO.getRange( TAMANHO_HISTORICO+2, 1, TAMANHO_QUESTIONARIO, NUM_COLUNAS_TABELA_QUESTIONARIO );  
      range.setValues( BUFFER_QUESTIONARIO );

      PLANILHA_HISTORICO.waitForAllDataExecutionsCompletion(2);      
      SpreadsheetApp.flush();  
      
    } else {
  
      // SE NAO CONSEGUIR PEGAR O LOCK, LANCA UMA EXCESSAO
      throw( new Error( "enviarQuestionariosParaHistorico - Nao foi possivel pegar o LOCK" ) );
    } 

  } catch( error ) {

    console.log( "enviarQuestionariosParaHistorico - " + error.message );
    throw( "enviarQuestionariosParaHistorico - " + error.message );

  } finally {

    // Always release the lock for other waiting instances
    lock.releaseLock(); 
  }     

  console.log( "enviarQuestionariosParaHistorico - Fim" );      

} // Fim da função enviarQuestionariosParaHistorico



/**
 * Função backend para limpar os questionários
 */       
function limparQuestionarios() {

  console.log( "limparQuestionarios - Início" );  
  
  
  // TENTA PEGAR O LOCK
  const lock = LockService.getScriptLock();    

  try {

    lock.waitLock(10000);      
    
    // SE PEGAR O LOCK, PROSSEGUE COM A HABILITAÇÃO DOS QUESTIONÁRIOS
    if( lock.hasLock() ) {

      let bufferQuestionariosLimpos = [];
      let questionarioLimpo = [];
  
      // Percorre todos os casos da fila
      for( let idCaso=1; idCaso<=TAMANHO_FILA; ++idCaso ) {
    
        questionarioLimpo = new Array(NUM_COLUNAS_TABELA_QUESTIONARIO).fill("");
        questionarioLimpo[0] = idCaso;
    
        bufferQuestionariosLimpos.push( questionarioLimpo );
    
      } // Fim for    

      // Grava o buffer na tabela QUESTIONARIO  
      let range = TABELA_QUESTIONARIO.getRange( 2, 1, bufferQuestionariosLimpos.length, NUM_COLUNAS_TABELA_QUESTIONARIO );
      range.setValues( bufferQuestionariosLimpos );

      PLANILHA_QUESTIONARIO.waitForAllDataExecutionsCompletion(2);      
      SpreadsheetApp.flush();        
      
    } else {
  
      // SE NAO CONSEGUIR PEGAR O LOCK, LANCA UMA EXCESSAO
      throw( new Error( "limparQuestionarios - Nao foi possivel pegar o LOCK" ) );
    } 

  } catch( error ) {

    console.log( "limparQuestionarios - " + error.message );
    throw( "limparQuestionarios - " + error.message );

  } finally {

    // Always release the lock for other waiting instances
    lock.releaseLock(); 
  }     
  
  console.log( "limparQuestionarios - Fim" );      

} // Fim da função limparQuestionarios



/**
 * Função backend que monitora os casos e, para os casos elegíveis, 
 * habilita o questionário. 
 */
function habilitarQuestionarios() {

  console.log( "habilitarQuestionarios - Início" );  
  
  
  // TENTA PEGAR O LOCK
  const lock = LockService.getScriptLock();    

  try {

    lock.waitLock(10000);      
    
    // SE PEGAR O LOCK, PROSSEGUE COM A HABILITAÇÃO DOS QUESTIONÁRIOS
    if( lock.hasLock() ) {

      let caso;
      let situacaoCaso;
      let vistoriasCaso;
      let situacaoVistoria;
      let situacaoQuestionario;
    
      let proposicao1;
      let proposicao2;
  
      // Percorre todos os casos da fila
      for( let idCaso=1; idCaso<=TAMANHO_FILA; ++idCaso ) {
    
        caso = BUFFER_FILA[idCaso-1];  
        
        situacaoCaso = getSituacaoCaso( idCaso );  
        vistoriasCaso = pesquisarVistoriasPorCPF( caso[CPF_RF] );
        situacaoVistoria = getSituacaoVistoria( vistoriasCaso );  
        situacaoQuestionario = getSituacaoQuestionarioCaso( idCaso );  
      
        // Casos convocados para acesso, sem movimentação de vistoria e sem questionário respondido
        proposicao1 = situacaoCaso == "3" && situacaoVistoria == "" && (situacaoQuestionario == "1" || situacaoQuestionario == "2");
    
        // Casos ainda não convocados para acesso e sem questionário respondido
        proposicao2 = (situacaoCaso == "2" || situacaoCaso == "7") && (situacaoQuestionario == "1" || situacaoQuestionario == "2");    
    
        if( proposicao1 || proposicao2 ) {
          habilitarQuestionarioCaso( idCaso );
        }
    
      } // Fim for    
      
    } else {
  
      // SE NAO CONSEGUIR PEGAR O LOCK, LANCA UMA EXCESSAO
      throw( new Error( "habilitarQuestionarios - Nao foi possivel pegar o LOCK" ) );
    } 

  } catch( error ) {

    console.log( "habilitarQuestionarios - " + error.message );
    throw( "habilitarQuestionarios - " + error.message );

  } finally {

    // Always release the lock for other waiting instances
    lock.releaseLock(); 
  }     
  
  console.log( "habilitarQuestionarios - Fim" );      

} // Fim da função habilitarQuestionarios



/**
 * Função backend que monitora os casos e, para os casos elegíveis, 
 * envia email para as instituições com o link do questionário .
 */
function enviarEmailsQuestionarios( idPrimeiroCaso, idUltimoCaso ) {

  console.log( "enviarEmailsQuestionarios - Início" );      
  
  let caso;
  let situacaoCaso;
  let vistoriasCaso;
  let situacaoVistoria;
  let situacaoQuestionario;

  let proposicao1;
  let proposicao2;


  try {

    const primeiro = parseInt( idPrimeiroCaso );
    const ultimo = parseInt( idUltimoCaso );

    const verificacaoPrimeiro = ( primeiro > 0  &&
                                  primeiro <= TAMANHO_FILA  &&
                                  primeiro <= ultimo ) ?
                                true  :
                                false;

    const verificacaoUltimo =  ( ultimo > 0  &&
                                 ultimo <= TAMANHO_FILA  &&
                                 ultimo >= primeiro ) ?
                                true  :
                                false;

    if( verificacaoPrimeiro && verificacaoUltimo )  {

      // Percorre todos os casos da fila
      //for( let idCaso=1; idCaso<=TAMANHO_FILA; ++idCaso ) {
      for( let idCaso=primeiro; idCaso<=ultimo; ++idCaso ) {
  
        caso = BUFFER_FILA[idCaso-1];  
        
        situacaoCaso = getSituacaoCaso( idCaso );  
        vistoriasCaso = pesquisarVistoriasPorCPF( caso[CPF_RF] );
        situacaoVistoria = getSituacaoVistoria( vistoriasCaso );  
        situacaoQuestionario = getSituacaoQuestionarioCaso( idCaso );
        
        // Casos convocados para acesso, sem movimentação de vistoria e sem questionário respondido
        proposicao1 = situacaoCaso == "3" && situacaoVistoria == "" && situacaoQuestionario == "2";
    
        // Casos ainda não convocados para acesso e sem questionário respondido
        proposicao2 = (situacaoCaso == "2" || situacaoCaso == "7") && (situacaoQuestionario == "2");    
    
        if( proposicao1 || proposicao2 ) {
          enviarEmailBE( idCaso );
        }
    
      } // Fim for    

    // Fim if
    } else {

      let error = new Error("IDs inválidos")

      console.log( "enviarEmailsQuestionarios - " + error.message );    
      throw( "enviarEmailsQuestionarios - " + error.message );      
    }



  } catch( error ) {

    console.log( "enviarEmailsQuestionarios - " + error.message );    
    throw( "enviarEmailsQuestionarios - " + error.message );
  }
  
  console.log( "enviarEmailsQuestionarios - Fim" );      

} // Fim da função enviarEmailsQuestionarios







