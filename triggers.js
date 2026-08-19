"use strict";

/**
 * Módulo:    triggers.gs
 * Objetivo:  Contém os triggers que vão chamar as funções do módulo.
 *            Esses triggers são utilizados com o Acionador Google
 */

/**
 * Planilha QUESTIONARIO
 */
const PLANILHA_TRIGGERS_ID  =  "1yMbF1bZocuymtyLWeJdpzpFMs1sr_Q2Ezv68KRivzT0";
const PLANILHA_TRIGGERS     =  SpreadsheetApp.openById(PLANILHA_TRIGGERS_ID);

const TABELA_TRIGGERS   =  PLANILHA_TRIGGERS.getSheetByName('TRIGGERS');
const BUFFER_TRIGGERS   =  TABELA_TRIGGERS.getDataRange().getDisplayValues().splice(1);


/**
 * Constantes que armazenam as posições das colunas da tabela TRIGGERS
 */
const COLUNA_ID_CASO_INICIAL  =  0;
const COLUNA_INCREMENTO_ID    =  1;




function trigger_enviarEmailsQuestionarios() {

  try {

    let flag_teto = false;

    let idPrimeiroCaso = parseInt( BUFFER_TRIGGERS[0][COLUNA_ID_CASO_INICIAL] );
    let incremento_id  = parseInt( BUFFER_TRIGGERS[0][COLUNA_INCREMENTO_ID] );

    console.log( "idPrimeiroCaso: " + idPrimeiroCaso );
    console.log( "incremento_id:  " + incremento_id );
    
    let idUltimoCaso = idPrimeiroCaso + incremento_id - 1;
    
    if( idUltimoCaso >= TAMANHO_FILA ) { 
      flag_teto = true;
      idUltimoCaso = TAMANHO_FILA;
    }
    console.log( "idUltimoCaso: " + idUltimoCaso );
    console.log( "flag_teto:    " + flag_teto );

    enviarEmailsQuestionarios( idPrimeiroCaso, idUltimoCaso );    

    // Grava, na tabela TRIGGERS, o ID do próximo elemento inicial
    let proximo_idPrimeiroCaso = flag_teto ? "1" : parseInt( idUltimoCaso ) + 1;
    const campo_id_caso_inicial = TABELA_TRIGGERS.getRange( 2, COLUNA_ID_CASO_INICIAL+1 );
    campo_id_caso_inicial.setValue( proximo_idPrimeiroCaso );    

  } catch( error ) {
    console.log( "trigger_enviarEmailsQuestionarios - " + error.message );
  }

} // trigger_enviarEmailsQuestionarios







