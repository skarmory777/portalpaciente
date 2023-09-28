export const MeuPerfilPt = {
  titulo: 'Meu Perfil',
  subTitulo:
    'Para alteração de dados bloqueados, entre em contato com a área de TI.',
  botoes: {
    desativarCadastro: 'Desativar Cadastro',
    alterarDados: 'Alterar Dados',
  },
  telaConfirmacaoSair: {
    literals: { cancel: 'Não', confirm: 'Sim' },
    title: 'Sair do meu perfil?',
    message:
      `<h3 class="strong">Tem certeza que deseja sair do meu perfil?</h3>
      <p><i>Todas as informações digitadas serão perdidas, e você será direcionado(a) á Página Inicial.</i></p>`,
  },
  telaConfirmacaoAlterarDados: {
    literals: { cancel: 'Não', confirm: 'Sim' },
    title: 'Alterar dados?',
    message:
      `<h3 class="strong">Tem certeza que deseja alterar os dados do seu cadastro?</h3>
      <p><i>Os campos que foram alterados, serão registrados no seu perfil.</i></p>`,
  },
  mensagemAlterarDadosSucesso: 'Dados do perfil atualizados com sucesso!',
  mensagemDesativarPerfilSucesso: 'Perfil desativado com sucesso!',
};
