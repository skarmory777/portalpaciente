export const recuperarSenhaModalPt = {
  titulo: 'Esqueceu sua senha?',
  mensagem: '<i>É necessário informar os dados abaixo para conferirmos sua identidade.</i>',
  inputs: {
    cpf: {
      label: 'CPF',
      placeholder: 'Somente números',
      errorPatterns: 'CPF inválido',
    },
    dataNascimento: {
      label: 'Data de Nascimento',
    },
    email: {
      label: 'E-mail',
      placeholder: 'Insira seu e-mail',
    },
  },
  botoes: {
    enviarEmail: {
      texto: 'Enviar e-mail',
    },
  },
  mensagemEmailEnviado: 'E-mail enviado!',
  telaPosEmailEnviado: {
    literals: { ok: 'Ir para Login' },
    title: 'Alteração de senha  ',
    message:
      `<b>Foi enviado um e-mail para recuperação!</b>
      <p><i>Acesse seu e-mail: <b>@EMAIL_INFORMADO@</b></i></p>
      <p><i>Enviamos no link para realizar a recuperação.</i></p>`,
  },
}