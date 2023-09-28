
export const HomePt = {
  saudacao: 'Olá {0}',
  mensagem: 'O que deseja fazer agora?',
  sairPortal: {
    literals: { cancel: 'Não', confirm: 'Sim' },
    title: 'Sair do Portal?',
    message:
      '<h3>Tem certeza que deseja sair do Portal?</h3>Para voltar é só fazer o login novamente',
  },
  menus: {
    home: {
      label: 'Página Inicial',
      icon: 'po-icon-home',
      shortLabel: 'Página Inicial',
      link: '/home',
    },
    agendar: {
      label: 'Agendar',
      icon: 'po-icon-calendar',
      shortLabel: 'Register',
      link: '/agendamento',
    },
    agendamentos: {
      label: 'Meus Agendamentos',
      icon: 'po-icon-clock',
      shortLabel: 'Meus Agendamentos',
    },
    resultados: {
      label: 'Resultados de Exames',
      icon: 'po-icon-document',
      shortLabel: 'Resultados de Exames',
    },
  },
};
