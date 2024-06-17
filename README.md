
  

# MaxProcess l Desafio Técnico – FrontEnd

Desenvolvi uma aplicação web de gerenciamento de tarefas chamado Tasker Talk. A aplicação permiti que os usuários criem, visualizem, editem e excluam tarefas (CRUD). Cada tarefa deve conter um título, uma descrição, uma data de vencimento, e um status (Pendente, Em Progresso, Concluída).

(Angular 17.3.1.)

  

## INSTRUÇÕES GERAIS:

- [X] O teste deve ser completado em até **23/06 (domingo) às 23:59**
- Infelizmente não foi o tempo que eu precisava, mas foi entregue a tempo.

- [X] Submeta seu código em um repositório **GitHub privado** e compartilhe o acesso conosco.

- [X] Publique a aplicação em um serviço de hospedagem gratuito (exemplo: Vercel, Netlify ou **GitHub Pages**)

- [X] Inclua um arquivo **README** com instruções claras sobre como configurar e rodar a aplicação, além de quaisquer observações adicionais que você julgue pertinentes.

  

## REQUISITOS TÉCNICOS:

### FrontEnd:

- [X] **Tecnologias** Angular 14+ e TypeScript.

- [X] **Biblioteca UI:** PrimeNG 15+.

- [X] **Funcionalidades**

- - [X] Página inicial com a lista de tarefas.
		- A forma que foi pensado seria 3 listagens (Projetos, Tarefas e Subtarefas). Porém consegui listar apenas os Projetos e as Tarefas.

- - [X] Formulário para adicionar uma nova tarefa.

- - [X] Funcionalidade para editar e excluir tarefas existentes.

- - [X] Filtro para visualizar tarefas por status.

- - [X] Consumo da MockAPI para gerenciar as tarefas.

  

## Configuração e Instalação

#### Pré-requisitos

-  **Node.js**: Pode ser baixado e instalado a partir do [site oficial](https://nodejs.org/).

-  **Angular CLI**: Instale globalmente usando o npm executando:

`npm install -g @angular/cli`

  

#### Baixar o Projeto do GitHub

-  **Clonar o Repositório**: Abra o terminal ou prompt de comando e clone o repositório:

`git clone git@github.com:vitorzortea/desafio-tecnico-tasker-talk.git`

#### Instalar Dependências

-  **Pacotes npm**: No diretório do projeto, execute:

`npm install`

  

#### Executar o Projeto

-  **Executar o Servidor de Desenvolvimento**: Inicie o servidor de desenvolvimento do Angular executando:

`ng serve`

-  **Acessar o Projeto no Navegador**: Após iniciar o servidor, abra seu navegador e acesse:

`http://localhost:4200`

> O projeto foi desenvolvido com o Angular 17


## Sistema de Login
simulei um sistema de autenticação tendo em vista que a maioria dos sistemas reais teria um login e senha. Criei um Guard que verifica um Token no Storage e defini se pode ou não abrir o modulo do Painel. Caso não, é redirecionado de para o Login.
Combinando o Interceptor e o Guard eu simulei um JWT no lado do front (algo que em um sistema real seria do lado do back).
Para te acesso a um E-mail e Senha acesse a rota: https://666db1857a3738f7cacd1182.mockapi.io/pi/v1/users

## Listagem
Na listagem optei não listar com tabelas e escolhe cards que para esse caso deixaria mais fácil o responsável e o poderia usar recursos como gráficos. 
Cada card é um Projeto com um usuário responsável e no botão superior ao lado direito "+" vc ode ver as tarefas ligadas a ela.
No botão ao lado você tem um menu suspenso onde pode editar o projeto ou deletar.
Na barra superior vc por filtrar por projetos que o seu usuário é responsável ou por status.

Em baixo tem a paginação para poder navegar caso tenha muitos projetos

## Editar/Criar
com os dados necessários no formulário vc pode criar e editar qualquer projeto, e no formulário do projeto terá o link para creiar tarefas ligadas ao projeto, assim ao salvar atualiza o projeto e em sequência salva/edita o array de tarefas.