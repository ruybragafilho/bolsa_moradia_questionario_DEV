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
const TABELA_ACOMPANHAMENTO_SIM  =  PLANILHA_CODIGOS.getSheetByName('ACOMPANHAMENTO_SIM');
const TABELA_ACOMPANHAMENTO_NAO  =  PLANILHA_CODIGOS.getSheetByName('ACOMPANHAMENTO_NAO');

const BUFFER_RESPOSTAS_SIMPLES   =  TABELA_RESPOSTAS_SIMPLES.getDataRange().getDisplayValues().splice(1);
const BUFFER_ACOMPANHAMENTO_SIM  =  TABELA_ACOMPANHAMENTO_SIM.getDataRange().getDisplayValues().splice(1);
const BUFFER_ACOMPANHAMENTO_NAO  =  TABELA_ACOMPANHAMENTO_NAO.getDataRange().getDisplayValues().splice(1);

const NUM_RESPOSTAS_SIMPLES   =  BUFFER_RESPOSTAS_SIMPLES.length;
const NUM_ACOMPANHAMENTO_SIM  =  BUFFER_ACOMPANHAMENTO_SIM.length;
const NUM_ACOMPANHAMENTO_NAO  =  BUFFER_ACOMPANHAMENTO_NAO.length;




/**
 * Constantes que armazenam as posições das colunas nas tabelas
 */

// Posição da coluna ID nas planilhas CODIGOS
const ID = 0;
const NOME  = 1;
const ATIVO = 2;


