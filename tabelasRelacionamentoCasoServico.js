"use strict";

/**
 * Módulo:    TabelaRelacionamentoCasoServico.gs
 * Objetivo:  Armazenar a tabela com o relacionamento Caso c/ Serviços de Referência
 */


/**
 * Planilha RELACIONAMENTO CASO SERVICO
 */
const PLANILHA_RELACIONAMENTO_CASO_SERVICO_ID  =  "1WdMEldsbbbqmJYEI3Up_X6geJFgBLolFQa4H9FDpnaI";
const PLANILHA_RELACIONAMENTO_CASO_SERVICO     =  SpreadsheetApp.openById(PLANILHA_RELACIONAMENTO_CASO_SERVICO_ID);

const TABELA_RELACIONAMENTO_CASO_SERVICO       =  PLANILHA_RELACIONAMENTO_CASO_SERVICO.getSheetByName('RELACIONAMENTO');
const TABELA_INDICE_INVERTIDO_RELACIONAMENTO   =  PLANILHA_RELACIONAMENTO_CASO_SERVICO.getSheetByName('INDICE_INVERTIDO_RELACIONAMENTO');

const BUFFER_RELACIONAMENTO_CASO_SERVICO       =  TABELA_RELACIONAMENTO_CASO_SERVICO.getDataRange().getDisplayValues().splice(1);
const BUFFER_INDICE_INVERTIDO_RELACIONAMENTO   =  TABELA_INDICE_INVERTIDO_RELACIONAMENTO.getDataRange().getDisplayValues().splice(1);

const TAMANHO_RELACIONAMENTO_CASO_SERVICO      =  BUFFER_RELACIONAMENTO_CASO_SERVICO.length;
const TAMANHO_INDICE_INVERTIDO_RELACIONAMENTO  =  BUFFER_INDICE_INVERTIDO_RELACIONAMENTO.length;




/**
 * Planilha RELACIONAMENTO CASO ANTIGO SERVICO
 */
const PLANILHA_RELACIONAMENTO_CASO_ANTIGO_SERVICO_ID  =  "1-emkLx1CGV8BeanAykTVSKv8xJj5XQI7TFC89H22EWc";
const PLANILHA_RELACIONAMENTO_CASO_ANTIGO_SERVICO     =  SpreadsheetApp.openById(PLANILHA_RELACIONAMENTO_CASO_ANTIGO_SERVICO_ID);

const TABELA_RELACIONAMENTO_CASO_ANTIGO_SERVICO       =  PLANILHA_RELACIONAMENTO_CASO_ANTIGO_SERVICO.getSheetByName('RELACIONAMENTO');
const TABELA_INDICE_INVERTIDO_RELACIONAMENTO_ANTIGO   =  PLANILHA_RELACIONAMENTO_CASO_ANTIGO_SERVICO.getSheetByName('INDICE_INVERTIDO_RELACIONAMENTO');

const BUFFER_RELACIONAMENTO_CASO_ANTIGO_SERVICO       =  TABELA_RELACIONAMENTO_CASO_ANTIGO_SERVICO.getDataRange().getDisplayValues().splice(1);
const BUFFER_INDICE_INVERTIDO_RELACIONAMENTO_ANTIGO   =  TABELA_INDICE_INVERTIDO_RELACIONAMENTO_ANTIGO.getDataRange().getDisplayValues().splice(1);

const TAMANHO_RELACIONAMENTO_CASO_ANTIGO_SERVICO      =  BUFFER_RELACIONAMENTO_CASO_ANTIGO_SERVICO.length;
const TAMANHO_INDICE_INVERTIDO_RELACIONAMENTO_ANTIGO  =  BUFFER_INDICE_INVERTIDO_RELACIONAMENTO_ANTIGO.length;





// Posições das colunas da planilha RELACIONAMENTO CASO SERVICO
// const ID_CASO = 0;  Já declarado em tabelasQuestionario.js

const ID_RELACIONAMENTO          =  0;
const IDS_RELACIONAMENTOS        =  1;

const ID_CASO_RELACIONAMENTO     =  1;
const ID_SERVICO_RELACIONAMENTO  =  2;
const DATA_INFORMACAO            =  3;
const ID_RESPONSAVEL_INFORMACAO  =  4;




/** 
 *  ####################################################
 *  #####                                          ##### 
 *  #####  IMPLEMENTAÇÃO DAS FUNÇÕES DESSE MÓDULO  #####
 *  #####                                          ##### 
 *  ####################################################
 */




/**
 * Função que obtém os serviços de referência associados a um caso específico.
 * @param {String} idCaso 
 * @returns array de objetos contendo os serviços de referência do caso
 */
function obterServicosReferenciaDoCaso( idCaso ) {


  let id;
  let BUFFER_INDICE;
  let BUFFER_RELACIONAMENTO;
  let ID_MAXIMO;      
  

  // CASO ATUAL
  if( !String(idCaso).includes("old_") ) {
      
    // Converte o id para Integer
    id = parseInt( idCaso );  
    BUFFER_INDICE = BUFFER_INDICE_INVERTIDO_RELACIONAMENTO;
    BUFFER_RELACIONAMENTO = BUFFER_RELACIONAMENTO_CASO_SERVICO;    
    ID_MAXIMO = TAMANHO_FILA;
  
    // CASO ANTIGO  
  } else {
  
    // Converte o id para Integer
    id = parseInt( idCaso.split("_")[1] );  
    BUFFER_INDICE = BUFFER_INDICE_INVERTIDO_RELACIONAMENTO_ANTIGO;
    BUFFER_RELACIONAMENTO = BUFFER_RELACIONAMENTO_CASO_ANTIGO_SERVICO;    
    ID_MAXIMO = TAMANHO_FILA_CASOS_ANTIGOS;
  
  }  

  // Se id caso inválido, retorna uma exceção  
  if( id < 1  ||  id > ID_MAXIMO ) {
    throw( new Error( "obterServicosReferenciaDoCaso - ID Caso Inválido" ) );
  }    

  const indicesRelacionamentos = BUFFER_INDICE[id-1][IDS_RELACIONAMENTOS].split(";").map(id => parseInt(id));

  let servicosReferencia = []  
  let relacionamento;
  indicesRelacionamentos.forEach( ir => { 
    
    if( ir != 0 ) {

      relacionamento = BUFFER_RELACIONAMENTO[ parseInt(ir) - 1 ];
      servicosReferencia.push(
        {         
          idServico: relacionamento[ID_SERVICO_RELACIONAMENTO] //,
//          dataInformacao: relacionamento[DATA_INFORMACAO],
//          idResponsavelInformacao: relacionamento[ID_RESPONSAVEL_INFORMACAO],
//          emailResponsavelInformacao: emailUsuario( relacionamento[ID_RESPONSAVEL_INFORMACAO] )
        }
      );
    }
    
  }); // Fim do forEach

  return servicosReferencia.reverse();

} // Fim da função obterServicosReferenciaDoCaso



/**
 * Função que obtém o serviço de referência ativo associado a um caso específico.
 * @param {String} servicosReferencia 
 * @returns Serviço de referência ativo do caso
 */
function obterServicoReferenciaAtivo( servicosReferencia ) {

  const servicoAtivo = servicosReferencia[0];
  
  return servicoAtivo;

} // Fim da função obterServicoReferenciaAtivo




/** 
 *  #################################################
 *  #####                                       ##### 
 *  #####  TESTES PARA AS FUNÇÕES DESSE MÓDULO  #####
 *  #####                                       ##### 
 *  #################################################
 */




/**
 * Função de teste para a função obterServicosReferenciaDoCaso
 */
function testeObterServicosReferenciaDoCaso() {

  //const idCaso = "2";
  const idCaso = "old_2";

  const servicosReferencia = obterServicosReferenciaDoCaso( idCaso );

  servicosReferencia.forEach( sr => {
    console.log(`ID do Serviço: ${sr.idServico}, Data da Informação: ${sr.dataInformacao}, ID do Responsável pela Informação: ${sr.idResponsavelInformacao}`);
  });

} // Fim da função testeObterServicosReferenciaDoCaso



/**
 * Função de teste para a função obterServicoReferenciaAtivo
 */
function testeObterServicoReferenciaAtivo() {

  const idCaso = "2";

  const servicosReferencia = obterServicosReferenciaDoCaso( idCaso );

  const servicoAtivo = obterServicoReferenciaAtivo( servicosReferencia );

  console.log(`ID do Serviço Ativo: ${servicoAtivo.idServico}, Data da Informação: ${servicoAtivo.dataInformacao}, ID do Responsável pela Informação: ${servicoAtivo.idResponsavelInformacao}`);

} // Fim da função testeObterServicoReferenciaAtivo


