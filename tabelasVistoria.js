"use strict";

/**
 * Módulo:    tabelasVistoria.gs
 * Objetivo:  Armazenar as tabelas do sistema Bolsa Moradia
 */


/**
 * Planilha VISTORIAS
 */
const PLANILHA_VISTORIAS_ID  =  PropertiesService.getScriptProperties().getProperty('PLANILHA_VISTORIAS_ID');
const PLANILHA_VISTORIAS     =  SpreadsheetApp.openById(PLANILHA_VISTORIAS_ID);
const TABELA_VISTORIAS       =  PLANILHA_VISTORIAS.getSheetByName('VISTORIAS');
const BUFFER_VISTORIAS       =  TABELA_VISTORIAS.getDataRange().getDisplayValues().splice(1);
const TAMANHO_VISTORIAS      =  BUFFER_VISTORIAS.length;



// Posições das colunas da planilha VISTORIAS
const SELO_FK                      =  1;
const CPF_VISTORIA                 =  4;
const DATA_SOLICITACAO_VISTORIA    =  7;
const DATA_VISTORIA                =  8;
const DATA_LAUDO                   = 10 ;
const DESCRICAO_LAUDO              = 11;
const INFORMACAO_COMPLEMENTAR      = 13;





/**
 * Função que pesquisa por todas as vistorias relacionadas a um CPF de RF
 * @param {String} cpf - CPF da RF
 * @returns Um array de objetos, onde cada objeto representa uma vistoria relacionada ao CPF da RF, 
 *          contendo as seguintes propriedades: selo, dataSolicitacao, dataVistoria, dataLaudo, 
 *          descricaoLaudo e informacaoComplementar
 */
function pesquisarVistoriasPorCPF( cpf ) {

  const vistorias = BUFFER_VISTORIAS.filter( v => v[CPF_VISTORIA].padStart(11, "0") == cpf.padStart(11, "0") )
                                    .map( v => { return { selo: v[SELO_FK],
                                                          dataSolicitacao: v[DATA_SOLICITACAO_VISTORIA],
                                                          dataVistoria: v[DATA_VISTORIA],
                                                          dataLaudo: v[DATA_LAUDO],
                                                          descricaoLaudo: v[DESCRICAO_LAUDO],
                                                          informacaoComplementar: v[INFORMACAO_COMPLEMENTAR] };
                                               });

  return vistorias;

} // Fim da função pesquisarVistoriasPorCPF()



/**
 * Função que retorna o id da situação da última vistoria de um caso, a partir do histórico de vistorias do caso
 * @param {Array de vistorias} vistoriasCaso - Array com o historico de vistorias do caso
 * @returns ID do status da últimaVistoria do caso
 */
function getSituacaoVistoria( vistoriasCaso ) {

  // Se o parâmetro vistoria for null, retiorn null
  if( vistoriasCaso.length == 0 ) {
    return "";  
  }

  // Obtém a última vistoria de um caso
  let ultimaVistoria = vistoriasCaso[vistoriasCaso.length-1];


  // Retorna a situação da última vistoria

  if( ultimaVistoria.dataLaudo != "" ) {

    if( ultimaVistoria.descricaoLaudo.includes("Aprovado")  ) {
      return "4";         }
    else if( ultimaVistoria.descricaoLaudo.includes("Reprovado") ) {
      return "3";     
    } else if( ultimaVistoria.descricaoLaudo.includes("Passível") ) {
      return "2";     
    } else {
      return ""    
    }

  }

  if( ultimaVistoria.dataVistoria != "" ) {
    // Última vistoria passível de aprovação
    return "2";             
  }  

  if( ultimaVistoria.dataSolicitacao != "" ) {
    // Vistoria solicitada
    return "1";             
  }

  return "";

} // Fim da função getSituacaoVistoria


/**
 * ##### FIM DO MÓDULO tabelasVistoria.gs #####
 */


