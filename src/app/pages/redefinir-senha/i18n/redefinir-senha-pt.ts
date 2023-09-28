export const redefinirSenhaPt = {
  titulo: 'Criar nova senha?',
  mensagem:
    '<p><i>É necessário informar os dados abaixos para conferirmos sua identidade.</i></p>',
  inputs: {
    senha: {
      label: 'Nova senha',
    },
    confirmarNovaSenha: {
      label: 'Confirmação da nova senha',
      mensagemValidacaoErro: 'Senhas não conferem'
    },
  },
  botoes: {
    criarSenha: {
      label: 'Criar senha',
    },
  },
  mensagemSucesso: 'Sua nova senha foi criada!',
  telaPosRedefinicao: {
    literals: { confirm: 'Ir para Login', cancel: '' },
    title: 'Criação de senha',
    message: `<b>Sua nova senha foi criada!</b>
      <p><i>Acesse a página de Login para entrar no Portal.</i></p>`,
  },
};
