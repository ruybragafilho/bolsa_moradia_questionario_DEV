"use strict";

/**
 * Módulo:    tabelasFila.gs
 * Objetivo:  Armazenar Fila de casos do sistema Bolsa Moradia
 */



/**
 * Planilha FILA
 */
const PLANILHA_FILA_ID        =  "1ByVMN2V9bk_yQTPu1TFXz4KuobKO59-aOEY7JZAUYg0";
const PLANILHA_FILA           =  SpreadsheetApp.openById(PLANILHA_FILA_ID);
const TABELA_FILA             =  PLANILHA_FILA.getSheetByName('FILA');
let BUFFER_FILA               =  TABELA_FILA.getDataRange().getDisplayValues().splice(1);
let TAMANHO_FILA              =  BUFFER_FILA.length;
const NUM_COLUNAS_TABELA_FILA =  20;

function refreshBufferFila() {
  BUFFER_FILA  =  TABELA_FILA.getDataRange().getDisplayValues().splice(1);
  TAMANHO_FILA = BUFFER_FILA.length;
}



// Posições das colunas da planilha FILA
const REFERENCIA_FAMILIAR        =  1;
const CPF_RF                     =  2;
const ORGAO_ENCAMINHADOR         =  3;
const DATA_ENCAMINHAMENTO        =  4;
const PONTUACAO                  =  5;

const IDS_PARAMETROS_CASO        =  6;
const PONTUACOES_PARAMETROS_CASO =  7;

const QUANTIDADE_CEA             =  8;
const PROBLEMAS_SAUDE            =  9;
const DATA_NASCIMENTO_RF         = 10;
const TEMPO_SITUACAO_DE_RUA      = 11;

const SITUACAO_BENEFICIO         = 12;
const DATA_ULTIMA_EVOLUCAO       = 13;
const DOC_PENDENTE               = 14;
const DATA_LIMITE                = 15;
const JUSTIFICATIVA_ALTERACAO_DATA_LIMITE = 16;
const PERFIL_COMPLETO            = 17;
const PERFIL_GENERO              = 18;
const PERFIL_ORIENTACAO_SEXUAL   = 19;



/** 
 *  ####################################################
 *  #####                                          ##### 
 *  #####  IMPLEMENTAÇÃO DAS FUNÇÕES DESSE MÓDULO  #####
 *  #####                                          ##### 
 *  ####################################################
 */

/**
 * Função backend que retorna a situação de um caso
 *    1 - Não convocado
 *    2 - Convocado
 */       
function getSituacaoCaso( idCaso ) {

  return BUFFER_FILA[idCaso-1][SITUACAO_BENEFICIO];

} // Fim da função getSituacaoCaso