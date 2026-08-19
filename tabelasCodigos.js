"use strict";

/**
 * Módulo:    tabelasCodigos.gs
 * Objetivo:  Armazenar as tabelas do sistema Bolsa Moradia
 */



/**
 * Planilha CODIGOS contendo as tabelas 
 */
const PLANILHA_CODIGOS_ID  =  "1eba9uB4QpIpLI7HJQWxJeUuR_pIG3bxI07deoirgN7k";
const PLANILHA_CODIGOS     =  SpreadsheetApp.openById(PLANILHA_CODIGOS_ID);

const TABELA_RESPOSTAS_SIMPLES      =  PLANILHA_CODIGOS.getSheetByName('RESPOSTAS_SIMPLES');
const TABELA_COMPLEXIDADES          =  PLANILHA_CODIGOS.getSheetByName('COMPLEXIDADES');
const TABELA_ORGAOS_ENCAMINHADORES  =  PLANILHA_CODIGOS.getSheetByName('ORGAOS_ENCAMINHADORES');
const TABELA_SITUACOES_BENEFICIO    =  PLANILHA_CODIGOS.getSheetByName('SITUACOES_BENEFICIO');
const TABELA_SITUACOES_VISTORIA     =  PLANILHA_CODIGOS.getSheetByName('SITUACOES_VISTORIA');
const TABELA_INTERVALOS_DE_TEMPO    =  PLANILHA_CODIGOS.getSheetByName('INTERVALOS_DE_TEMPO');
const TABELA_IDENTIDADES_DE_GENERO  =  PLANILHA_CODIGOS.getSheetByName('IDENTIDADES_DE_GENERO');
const TABELA_ORIENTACOES_SEXUAIS    =  PLANILHA_CODIGOS.getSheetByName('ORIENTACOES_SEXUAIS');
const TABELA_PARAMETROS             =  PLANILHA_CODIGOS.getSheetByName('PARAMETROS');
const TABELA_PERFIS                 =  PLANILHA_CODIGOS.getSheetByName('PERFIS');
const TABELA_SITUACOES_QUESTIONARIO      =  PLANILHA_CODIGOS.getSheetByName('SITUACOES_QUESTIONARIO'); 
const TABELA_ETAPA_ACESSO                =  PLANILHA_CODIGOS.getSheetByName('ETAPA_ACESSO');
const TABELA_ACOMPANHAMENTO_NAO          =  PLANILHA_CODIGOS.getSheetByName('ACOMPANHAMENTO_NAO');
const TABELA_IMPOSSIBILIDADE_TEMPORARIA  =  PLANILHA_CODIGOS.getSheetByName('IMPOSSIBILIDADE_TEMPORARIA');
const TABELA_NAO_ACESSO_DEFINITIVO       =  PLANILHA_CODIGOS.getSheetByName('NAO_ACESSO_DEFINITIVO');

const BUFFER_RESPOSTAS_SIMPLES      =  TABELA_RESPOSTAS_SIMPLES.getDataRange().getDisplayValues().splice(1);
const BUFFER_COMPLEXIDADES          =  TABELA_COMPLEXIDADES.getDataRange().getDisplayValues().splice(1);
const BUFFER_ORGAOS_ENCAMINHADORES  =  TABELA_ORGAOS_ENCAMINHADORES.getDataRange().getDisplayValues().splice(1);
const BUFFER_SITUACOES_BENEFICIO    =  TABELA_SITUACOES_BENEFICIO.getDataRange().getDisplayValues().splice(1);
const BUFFER_SITUACOES_VISTORIA     =  TABELA_SITUACOES_VISTORIA.getDataRange().getDisplayValues().splice(1);
const BUFFER_INTERVALOS_DE_TEMPO    =  TABELA_INTERVALOS_DE_TEMPO.getDataRange().getDisplayValues().splice(1);
const BUFFER_IDENTIDADES_DE_GENERO  =  TABELA_IDENTIDADES_DE_GENERO.getDataRange().getDisplayValues().splice(1);
const BUFFER_ORIENTACOES_SEXUAIS    =  TABELA_ORIENTACOES_SEXUAIS.getDataRange().getDisplayValues().splice(1);
const BUFFER_PARAMETROS             =  TABELA_PARAMETROS.getDataRange().getDisplayValues().splice(1);
const BUFFER_PERFIS                 =  TABELA_PERFIS.getDataRange().getDisplayValues().splice(1);
const BUFFER_SITUACOES_QUESTIONARIO      =  TABELA_SITUACOES_QUESTIONARIO.getDataRange().getDisplayValues().splice(1);
const BUFFER_ETAPA_ACESSO                =  TABELA_ETAPA_ACESSO.getDataRange().getDisplayValues().splice(1);
const BUFFER_ACOMPANHAMENTO_NAO          =  TABELA_ACOMPANHAMENTO_NAO.getDataRange().getDisplayValues().splice(1);
const BUFFER_IMPOSSIBILIDADE_TEMPORARIA  =  TABELA_IMPOSSIBILIDADE_TEMPORARIA.getDataRange().getDisplayValues().splice(1);
const BUFFER_NAO_ACESSO_DEFINITIVO       =  TABELA_NAO_ACESSO_DEFINITIVO.getDataRange().getDisplayValues().splice(1);

const NUM_RESPOSTAS_SIMPLES      =  BUFFER_RESPOSTAS_SIMPLES.length;
const NUM_COMPLEXIDADES          =  BUFFER_COMPLEXIDADES.length;
const NUM_ORGAOS_ENCAMINHADORES  =  BUFFER_ORGAOS_ENCAMINHADORES.length;
const NUM_SITUACOES_BENEFICIO    =  BUFFER_SITUACOES_BENEFICIO.length;
const NUM_SITUACOES_VISTORIA     =  BUFFER_SITUACOES_VISTORIA.length;
const NUM_INTERVALOS_DE_TEMPO    =  BUFFER_INTERVALOS_DE_TEMPO.length;
const NUM_IDENTIDADES_DE_GENERO  =  BUFFER_IDENTIDADES_DE_GENERO.length;
const NUM_ORIENTACOES_SEXUAIS    =  BUFFER_ORIENTACOES_SEXUAIS.length;
const NUM_PARAMETROS             =  BUFFER_PARAMETROS.length;
const NUM_PERFIS                 =  BUFFER_PERFIS.length;
const NUM_SITUACOES_QUESTIONARIO      =  BUFFER_SITUACOES_QUESTIONARIO.length; 
const NUM_ETAPA_ACESSO                =  BUFFER_ETAPA_ACESSO.length;
const NUM_ACOMPANHAMENTO_NAO          =  BUFFER_ACOMPANHAMENTO_NAO.length;
const NUM_IMPOSSIBILIDADE_TEMPORARIA  =  BUFFER_IMPOSSIBILIDADE_TEMPORARIA.length;
const NUM_NAO_ACESSO_DEFINITIVO       =  BUFFER_NAO_ACESSO_DEFINITIVO.length;


/**
 * Constantes que armazenam as posições das colunas nas tabelas
 */

// Posição da coluna ID nas planilhas CODIGOS, FILA e USUARIOS
const ID = 0;


// Posições das colunas nas tabelas da planilha CODIGOS e USUARIOS
const NOME  = 1;
const ATIVO = 2;
const PESO_PARAMETRO = 3;
const PONTUACAO_PARAMETRO = 4;
const EMAIL_INSTITUICAO = 3;

const ID_COMPLEXIDADE = 4;
const COMUNICACAO_ATIVA = 5

// Posições das colunas da planilha USUARIOS
const EMAIL             = 1;
const NOME_USUARIO      = 3;
const ID_INSTITUICAO    = 4;
const TIPO_USUARIO      = 5;



