"use strict";

/**
 * Módulo:    enviarEmailBE.gs
 * Objetivo:  Envia um email para o endereço de e-mail informado
 */


/**
 * Função que envia um email com o questionário  
 */
function enviarEmailBE( idCaso ) {
  
  const cpfRFCaso = (BUFFER_FILA[idCaso-1][CPF_RF]).padStart(11, "0");
  const nomeRFCaso = BUFFER_FILA[idCaso-1][REFERENCIA_FAMILIAR];

  const servicosReferenciaCaso = obterServicosReferenciaDoCaso( idCaso );
  const servicoReferenciaAtivo = obterServicoReferenciaAtivo(servicosReferenciaCaso);
  const idInstituicao = servicoReferenciaAtivo.idServico;
  const emailInstituicao = BUFFER_ORGAOS_ENCAMINHADORES[idInstituicao-1][EMAIL_INSTITUICAO];
      

  let linkAppBolsaMoradiaPBH = "https://script.google.com/a/macros/pbh.gov.br/s/AKfycby2peoZlAQWgXVh3LlMQ7YPmMuEWwtFpgnlte_tzf8j7ahfK7MCQ_WuoeB4oU041rqI/exec";

  let linkAppBolsaMoradiaGMAIL = "https://script.google.com/macros/s/AKfycbwYnRG-F7sEE-U5bajOJcHFFFXYtlfM6Q7DXdQlyPZZdBhr9i_fkcpK1mR8S6s10hSR/exec";


  if( isEmailValidBE(emailInstituicao) ) { 

    try {
    
      MailApp.sendEmail({
    
        to: `${emailInstituicao}`,
        cc: `ruybragafilho@gmail.com`,
        subject: `Solicitação de Informação Bolsa Moradia - ${nomeRFCaso} - ${(new Date()).toLocaleString("pt-BR")}`,
        htmlBody:  
`Prezado (a),<br><br>

solicitamos que vocês acessem o sistema do Bolsa Moradia - Pop Rua, pelos <b>links</b> abaixo, para o preenchimento do questionário sobre a situação atual do acompanhamento, pelo serviço, do(a) beneficiário(a)  <b>${nomeRFCaso}</b>, CPF <b>${cpfRFCaso}</b><br><br><br>


Link de acesso para instituições / trabalhadores com e-mail <b>@pbh.gov.br</b> <b style="color: red;">(Apenas e-mails já cadastrados no Bolsa Moradia)</b> <br><br>

${linkAppBolsaMoradiaPBH}<br><br><br>


Link de acesso para instituições / trabalhadores com e-mail <b>@gmail.com</b> <b style="color: red;">(Apenas e-mails já cadastrados no Bolsa Moradia)</b> <br><br>

${linkAppBolsaMoradiaGMAIL}<br><br><br>


Qualquer dúvida, procure a equipe da DPOP.<br><br>


Equipe Bolsa Moradia | Diretoria de Políticas para População em Situação de Rua, Migrantes e Refugiados | DPOP<br>
Secretaria Municipal de Assistência Social e Direitos Humanos | SMASDH<br>
Av. Afonso Pena, 342, 6º andar - Centro | Belo Horizonte/MG | CEP: 30130-001<br>
Telefone: (31) 3277-6373 / 3277-9994 | pbh.gov.br      <br><br> `
  
      });     
    
    } catch( error ) {
  
      console.log( "enviarEmailBE - " + error.message );    
      throw( "enviarEmailBE - " + error.message );
  
    }    

  } else {
    throw( new Error( "enviarEmailBE - E-mail inválido" ) );
  }

} // Fim da função enviarEmailBE



/**
 *  #####  TESTES PARA AS FUNÇÕES DESSE MÓDULO  #####
 */

/**
 * Função para testar a função enviarEmail
 */
function teste_enviarEmail() {
  
  let idCaso = 4;
  
  enviarEmailBE( idCaso );
 
}


function limiteEmailDisponivel() {

  const n = MailApp.getRemainingDailyQuota();

  console.log( "Limite Email Disponivel: " + n );
}



/**
 * ##### FIM DO MÓDULO enviarEmailBE.gs #####
 */
