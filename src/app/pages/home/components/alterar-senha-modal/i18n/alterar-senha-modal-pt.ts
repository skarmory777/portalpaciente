export const alterarSenhaModalPt = {
  titulo: 'Alteração de senha',
  mensagem: '<i>É necessário informar os dados abaixos para alterar sua senha.</i>',
  mensagemSucesso: 'Senha alterada!',
  inputs: {
    senhaAtual: {
      label: 'Senha atual',
    },
    senha: {
      label: 'Nova senha',
    },
    confirmarNovaSenha: {
      label: 'Confirmação da nova senha',
    },
  },
  botoes: {
    confirmar: {
      label: 'Alterar senha',
    },
  },
  telaPosAlteracao: {
    literals: { ok: 'Ir para Login' },
    title: 'Alteração de senha  ',
    message:
      `<h3 class="strong">Sua senha foi alterada!</h3>
      <p><i>É necessário fazer o login com a nova senha.</i></p>`,
  },
}
