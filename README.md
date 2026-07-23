<h1 align="center">
    <strong>Sistema de Triagem para UPA</strong>
</h1>

Uma Unidade de Pronto Atendimento (UPA) realiza diariamente centenas de atendimentos. O processo de triagem precisa classificar pacientes conforme o grau de urgência, organizar a fila de atendimento, registrar alterações de prioridade e disponibilizar estatísticas para a equipe médica.

Sua tarefa será desenvolver um **Sistema de Triagem e Gerenciamento de Atendimento** utilizando exclusivamente **TypeScript**, sem interface gráfica obrigatória. O sistema poderá ser executado via terminal (Node.js), simulando a entrada de pacientes, classificação de risco, gerenciamento das filas e geração de relatórios.

Ao longo do desenvolvimento, você deverá aplicar os principais conceitos estudados na disciplina, organizando o código em módulos e implementando funcionalidades de forma incremental. Além disso, o projeto inclui desafios de pesquisa para incentivar a consulta à documentação oficial do TypeScript e a exploração de recursos modernos do ecossistema.

 ## **Requisitos do Projeto**
Os requisitos abaixo descrevem as funcionalidades esperadas para o sistema, bem como as tecnologias, práticas e recursos técnicos que deverão ser aplicados durante o desenvolvimento.

| Requisito | Funcionalidade / Descrição | Conteúdos Avaliados |
|---|---|---|
| **R01 — Cadastro e gerenciamento de pacientes** | O sistema deve permitir cadastrar pacientes contendo informações como nome, idade, sintomas, data de chegada e prioridade de atendimento. Também deve permitir consultar e atualizar informações dos pacientes cadastrados. | **Módulo 1 — Fundamentos e Tipagem Básica:**<br><br>Variáveis, tipos primitivos (`string`, `number`, `boolean`), inferência de tipos, tipagem explícita, operadores e expressões. |
| **R02 — Organização das funcionalidades do sistema** | O sistema deve ser estruturado utilizando funções reutilizáveis e módulos independentes, permitindo separar responsabilidades como cadastro, fila, estatísticas e validações. | **Módulo 2 — Funções e Escopo:**<br><br>Declaração de funções, parâmetros obrigatórios, opcionais e default, Arrow Functions, escopo de variáveis.<br><br>**Módulo 6 — Modularização:**<br><br>Importação e exportação (`named` e `default`). |
| **R03 — Classificação e gerenciamento da fila de atendimento** | O sistema deve aplicar regras de negócio para classificar pacientes e controlar a ordem de atendimento conforme a prioridade definida. Deve utilizar estruturas de decisão e repetição para controlar o fluxo da aplicação. | **Módulo 3 — Estruturas de Controle e Decisão:**<br><br>`if/else`, `switch`, operador ternário, `for`, `while`, Truthiness e Falsiness. |
| **R04 — Consulta, busca e geração de estatísticas** | O sistema deve disponibilizar operações de análise dos dados dos pacientes, como listar pacientes por prioridade, localizar pacientes específicos, verificar condições e gerar informações consolidadas. | **Módulo 4 — Manipulação Avançada de Arrays:**<br><br>`map()`, `filter()`, `find()`, `some()`, `reduce()` e `join()`. |
| **R05 — Modelagem das entidades do sistema** | O sistema deve representar corretamente as entidades do domínio utilizando estruturas de dados tipadas, garantindo maior segurança e organização do código. | **Módulo 5 — Tipagem de Objetos e Estruturas de Dados:**<br><br>Interfaces, Type Aliases, Union Types, Arrays de Objetos, Destructuring e Spread Operator. |
| **R06 — Simulação de comunicação com uma API** | O sistema deve implementar uma camada simulando o carregamento de dados externos, utilizando operações assíncronas e manipulação de informações no formato JSON. | **Módulo 6 — Modularização e Assincronismo:**<br><br>Promises, tipagem de retornos e manipulação de JSON. |
| **R07 — Validação automatizada das funcionalidades** | O sistema deve possuir testes automatizados para validar as principais regras de negócio, incluindo cadastro, classificação de prioridade, consultas e operações assíncronas. Os testes devem ser implementados utilizando o Node.js Test Runner (`node:test`). | **Competência transversal:**<br><br>Testes automatizados, validação de regras de negócio, qualidade de código e uso consciente de IA como ferramenta de apoio ao desenvolvimento. |
| **RA01 — Validação de dados com Expressões Regulares** | O estudante deve pesquisar e implementar validações utilizando Regex para garantir a qualidade dos dados de entrada do sistema (ex.: CPF, telefone, e-mail ou outros campos relevantes). | **Pesquisa e aprofundamento:**<br><br>Expressões Regulares, validação de dados e consulta à documentação técnica. |
| **RA02 — Aperfeiçoamento da tipagem utilizando Utility Types** | O estudante deve aplicar pelo menos um recurso avançado de tipagem do TypeScript, como `Partial`, `Pick`, `Omit`, `Readonly` ou `Record`, justificando sua utilização no contexto do projeto. | **Pesquisa e aprofundamento:**<br><br>Recursos avançados de tipagem do TypeScript e boas práticas de modelagem de dados. |
| **RA03 — Aplicação de recurso avançado do ecossistema TypeScript** | O estudante deve pesquisar e incorporar um recurso moderno ao projeto, como Pattern Matching utilizando `ts-pattern` ou outra biblioteca/técnica equivalente, justificando sua escolha e aplicação. | **Pesquisa e aprofundamento:**<br><br>Ecossistema TypeScript, bibliotecas modernas, leitura de documentação e aprendizagem autônoma. |

Os requisitos **R01 a R07** representam as funcionalidades e práticas obrigatórias do projeto, consolidando os conteúdos trabalhados durante a disciplina.

Os requisitos **RA01 a RA03** representam desafios de aprofundamento, nos quais o estudante deverá pesquisar, avaliar e aplicar novos conhecimentos relacionados ao ecossistema TypeScript.

Cada requisito deverá ser identificado e explicado no arquivo `README.md`, indicando como foi implementado e quais decisões técnicas foram adotadas.

## **Entrega**
O aluno deverá entregar:

- link do repositório público GitHub;
- projeto completo;
- `README.md` detalhando como cada um dos 10 requisitos foi contemplado;
- instruções de execução;
- instruções para execução dos testes;
- exemplos de uso do sistema.

---

## Implementação dos Requisitos

### R01 - Cadastro e gerenciamento de pacientes

O sistema permite cadastrar pacientes com nome, CPF, idade, data de entrada, sintomas e prioridade. Cada cadastro recebe um código numérico incremental e o status inicial `aguardando`. Pelo menu também é possível listar, buscar, editar e remover os pacientes cadastrados.

Os dados são tipados em `src/types/paciente.ts` por meio de `Paciente` e `PostPaciente`. Os serviços de criação, edição e remoção mantêm a lista atualizada e persistem as alterações no arquivo JSON.

### R02 - Organização das funcionalidades do sistema

O projeto foi separado por responsabilidade:

- `src/menus/`: interação com o usuário no terminal;
- `src/services/`: regras de negócio, atendimento, estatísticas e persistência;
- `src/types/`: tipos e contratos das entidades;
- `src/utils/`: validações e ordenação da fila.

As funcionalidades são implementadas como funções reutilizáveis e módulos independentes. Há exportações nomeadas para utilitários e exportações default nos serviços de criar e editar pacientes.

### R03 - Classificação e gerenciamento da fila de atendimento

A classificação de risco usa as prioridades `1`, `2` e `3`, que representam baixa, média e alta prioridade. A fila considera primeiro a maior prioridade e, em caso de empate, a menor data de entrada.

No menu de pacientes é possível chamar o próximo paciente aguardando e finalizar o atendimento atual. O sistema só permite um paciente em atendimento por vez e controla os status `aguardando`, `em_atendimento` e `atendido`.

As decisões de fluxo usam `if`, `switch` e `while` nos menus e serviços. A regra de ordenação está centralizada em `src/utils/pacienteQueue.ts`.

### R04 - Consulta, busca e geração de estatísticas

O submenu de listagem permite:

- ordenar pacientes por data de entrada ou prioridade;
- visualizar apenas a fila de espera;
- filtrar pacientes por prioridade;
- buscar por nome, CPF ou código;
- consultar estatísticas de status, prioridades, média de idade e fila atual.

As operações utilizam os métodos de array `map`, `filter`, `find`, `some`, `reduce` e `join` em `src/services/estatisticasPacientes.service.ts`.

### R05 - Modelagem das entidades do sistema

O domínio é modelado com Type Aliases para paciente, estado da aplicação, prioridade, status e parâmetros dos menus. A prioridade é um Union Type (`1 | 2 | 3`) e o status de atendimento também é um Union Type.

Os textos de prioridade e status são organizados com `Record`, enquanto o código do paciente é `readonly`. As atualizações de estado usam destructuring e spread operator, preservando os dados já existentes.

### R06 - Simulação de comunicação com API

O serviço `src/services/pacientePersistence.service.ts` simula uma camada externa assíncrona com `node:fs/promises`. Ao iniciar, a aplicação lê os pacientes de `data/pacientes.json`; ao cadastrar, editar, remover, chamar ou finalizar atendimento, grava novamente os dados em JSON.

As operações são assíncronas e retornam `Promise`. O carregamento também normaliza registros antigos que não tenham o campo `status`, atribuindo-lhes o valor `aguardando`.

### R07 - Validação automatizada das funcionalidades

Os testes automatizados usam o Node.js Test Runner (`node:test`) no arquivo `src/services/pacientes.test.ts`. Eles validam:

- chamada do paciente aguardando de maior prioridade;
- finalização do atendimento;
- busca e geração de estatísticas;
- carregamento assíncrono de pacientes a partir de JSON.

### RA01 - Validação de dados com Expressões Regulares

As perguntas do terminal validam entradas com Regex antes de aceitá-las. Há validações para CPF, data, número, prioridade, nome e sintomas. Por exemplo, CPF aceita 11 dígitos ou o formato `XXX.XXX.XXX-XX`, e prioridade aceita somente `1`, `2` ou `3`.

### RA02 - Aperfeiçoamento da tipagem utilizando Utility Types

O tipo `PostPaciente` usa `Omit<Paciente, "codigo" | "status">`, evitando que informações controladas pelo sistema sejam enviadas no cadastro. Também são usados `Record<PrioridadePaciente, string>` e `Record<StatusAtendimento, string>` para garantir a cobertura de todas as opções válidas.

### RA03 - Aplicação de recurso avançado do ecossistema TypeScript

O projeto utiliza a biblioteca `ts-pattern` em `src/utils/pacienteQueue.ts`. A função `ordenarPacientes` aplica pattern matching para selecionar o tipo de ordenação: por data, prioridade ou fila. O método `.exhaustive()` força o TypeScript a exigir tratamento para todos os modos previstos.

## Instruções de Execução

Pré-requisito: Node.js 20 ou superior.

1. Instale as dependências:

```bash
npm install
```

2. Inicie o sistema:

```bash
npm start
```

O comando compila os arquivos TypeScript para `dist/` e abre o menu no terminal. Os pacientes iniciais são lidos de `data/pacientes.json`.

Para apenas validar a compilação, execute:

```bash
npm run build
```

## Instruções para Execução dos Testes

Execute a suíte de testes automatizados com:

```bash
npm test
```

O comando executa os arquivos `*.test.ts` com o Node.js Test Runner e o carregador `tsx`.

## Exemplos de Uso

Após executar `npm start`, escolha a opção `1` no menu principal para abrir o menu de pacientes.

### Cadastrar um paciente

1. Escolha `1. Novo Paciente`.
2. Informe os dados solicitados. Exemplo:

```text
Nome: Fernanda Alves Santos
CPF: 123.456.789-01
Idade: 29
Data de entrada: 23/07/2026
Sintomas: Dor abdominal intensa desde a madrugada
Prioridade: 2
```

### Consultar a fila e chamar atendimento

1. Escolha `2. Lista, Busca e Estatísticas`.
2. Escolha `3. Visualizar fila de atendimento` para ver somente os pacientes aguardando, ordenados pela regra de prioridade.
3. Volte ao menu de pacientes e escolha `5. Chamar Próximo Paciente`.
4. Quando o atendimento terminar, escolha `6. Finalizar Atendimento Atual`.

### Buscar e consultar estatísticas

1. Escolha `2. Lista, Busca e Estatísticas`.
2. Para localizar um paciente, escolha `5. Buscar paciente` e informe, por exemplo, `Maria`, um CPF completo ou um código.
3. Para o relatório consolidado, escolha `6. Ver estatísticas`. O sistema exibe totais por status e prioridade, média de idade, próximo paciente e a fila atual.