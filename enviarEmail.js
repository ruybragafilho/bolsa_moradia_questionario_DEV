"use strict";

/**
 * Módulo:    enviarEmailBE.gs
 * Objetivo:  Envia um email para o endereço de e-mail informado
 */


/**
 * Função que envia um email com o questionário 
 *   
 * 
 */
function enviarEmailBE( idCaso ) {

  
  const cpfRFCaso = (BUFFER_FILA[idCaso-1][CPF_RF]).padStart(11, "0");
  const nomeRFCaso = BUFFER_FILA[idCaso-1][REFERENCIA_FAMILIAR];

  
  const idInstituicao = parseInt(BUFFER_FILA[idCaso-1][ORGAO_ENCAMINHADOR]);
  const emailInstituicao = BUFFER_ORGAOS_ENCAMINHADORES[idInstituicao-1][EMAIL_INSTITUICAO];

  const emailOrgaoEncaminhador = BUFFER_FILA[idCaso-1][EMAIL_ORGAO_ENCAMINHADOR];
    
  const emails = [];
  if( isEmailValidBE(emailInstituicao) ) { emails.push(emailInstituicao) }
  if( isEmailValidBE(emailOrgaoEncaminhador) ) { emails.push(emailOrgaoEncaminhador) }
  


  try {
  
    MailApp.sendEmail({
  
      to: `${emails}`,
      cc: `ruybragafilho@gmail.com`,
      subject: `Solicitação de Informação Bolsa Moradia - ${nomeRFCaso} - ${(new Date()).toLocaleString("pt-BR")}`,
      htmlBody:  
`Prezado (a),<br><br>

solicitamos que vocês acessem o sistema do Bolsa Moradia - Pop Rua para o preenchimento do questionário sobre a situação atual do acompanhamento, pelo serviço, do(a) beneficiário(a)  <b>${nomeRFCaso}</b>, CPF <b>${cpfRFCaso}</b><br>


Qualquer dúvida, procure a equipe da DPOP.<br><br>

Equipe Bolsa Moradia | Diretoria de Políticas para População em Situação de Rua, Migrantes e Refugiados | DPOP<br>
Secretaria Municipal de Assistência Social e Direitos Humanos | SMASDH<br>
Av. Afonso Pena, 342, 6º andar - Centro | Belo Horizonte/MG | CEP: 30130-001<br>
Telefone: (31) 3277-6373 / 3277-9994 | pbh.gov.br      <br><br> `
  
    });     

    console.log("EMAIL ENVIADO");            
  
  } catch( error ) {

    console.log( "enviarEmailBE - " + error.message );    
    throw( "enviarEmailBE - " + error.message );

  }

} // Fim da função enviarEmailBE



/**
 *  #####  TESTES PARA AS FUNÇÕES DESSE MÓDULO  #####
 */

/**
 * Função para testar a função enviarEmail
 */
function teste_enviarEmail() {
  
  let enderecoEmail = "sigps@pbh.gov.br";
  let cpfRFCaso = "111.222.333-44";
  let nomeRFCaso = "João da Silva";
  let evolucaoCaso = "evolução";
  let mensagemDataLimite = "";
  
  enviarEmailBE( enderecoEmail, cpfRFCaso, nomeRFCaso, evolucaoCaso, mensagemDataLimite );
 
}


function limiteEmailDisponivel() {

  const n = MailApp.getRemainingDailyQuota();

  console.log( "Limite Email Disponivel: " + n );
}



/**
 * ##### FIM DO MÓDULO enviarEmailBE.gs #####
 */
