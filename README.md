# Portal do Paciente

O Portal do Paciente é um sistema que permite aos usuários agendar consultas, teleconsultas e exames, visualizar seus agendamentos anteriores e também acessar resultados de exames online.


## Instruções de instalação

Faça o download do repositório em sua máquina local.
Certifique-se de que o Node.js e o Angular CLI estão instalados em seu computador.
No terminal, navegue até a pasta raiz do projeto e execute o comando npm install para instalar as dependências necessárias.
Depois de concluir a instalação, execute o comando ng serve para iniciar o servidor local.
Abra o navegador e acesse o endereço http://localhost:5051.

## Tecnologias utilizadas

- Angular 14.1.0
- PoUI 14.4.0
- NgRx 14.1.0

## Boas Práticas

A nomenclatura do arquivo com sufixo indicando o tipo separado por ponto. Ex: produto.model.ts, produto.interface.ts etc.
Classes, Enum e Interfaces sempre em Pascal case, porém o nome do arquivo em Kebab case, ex status-processo.enum.ts.
Já o nome de propriedades e métodos/funções em Camel case.

https://tdn.totvs.com/pages/viewpage.action?pageId=514741180

Para estilização, utilizar less como pré-processador para css e na sua construção utilizar a metodologia do BEM. Para definição de cores do sistema utlizar ou criar variaveis no styleguide.less


## Licença
Este projeto está licenciado sob a TOTVS S.A.
