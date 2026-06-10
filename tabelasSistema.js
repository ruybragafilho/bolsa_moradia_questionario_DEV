"use strict";

/**
 * Módulo:    tabelasSistema.gs
 * Objetivo:  Armazenar as tabelas do sistema Bolsa Moradia - Questionário
 */



/**
 * Planilha CODIGOS contendo as tabelas 
 */
const PLANILHA_CODIGOS_ID  =  "1eba9uB4QpIpLI7HJQWxJeUuR_pIG3bxI07deoirgN7k";
const PLANILHA_CODIGOS     =  SpreadsheetApp.openById(PLANILHA_CODIGOS_ID);

const TABELA_RESPOSTAS_SIMPLES   =  PLANILHA_CODIGOS.getSheetByName('RESPOSTAS_SIMPLES');
const BUFFER_RESPOSTAS_SIMPLES   =  TABELA_RESPOSTAS_SIMPLES.getDataRange().getDisplayValues().splice(1);
const NUM_RESPOSTAS_SIMPLES      =  BUFFER_RESPOSTAS_SIMPLES.length;



/**
 * Constantes que armazenam as posições das colunas nas tabelas
 */

// Posição da coluna ID nas planilhas CODIGOS
const ID = 0;
const NOME  = 1;
const ATIVO = 2;


