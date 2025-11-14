# App de Gerenciamento para Oficina (React Native + Supabase)

Este repositório contém o código-fonte de um aplicativo móvel dual (Cliente e Administrador) para gerenciamento de serviços automotivos, como mecânica e lavagem de carros.

Este projeto foi criado para resolver um problema comum em pequenas oficinas: a falta de um sistema digital para organizar agendamentos, que muitas vezes são feitos manualmente por telefone ou presencialmente. Isso leva à desorganização, perda de pedidos e dificuldade no acompanhamento por parte do cliente. A aplicação centraliza todo esse fluxo.

---

## Visão Geral da Aplicação

A plataforma é dividida em duas interfaces principais dentro do mesmo aplicativo, com funcionalidades distintas baseadas no tipo de usuário (cliente ou administrador).

---

## Funcionalidades (Visão do Cliente)

- **Agendamento "Wizard"**: Um assistente passo-a-passo guia o cliente para descrever o problema do veículo (ex: lavagem, motor, freios).  
- **Acompanhamento em Tempo Real**: O cliente pode visualizar uma "timeline" com o status atual do seu serviço (ex: *Agendado*, *Em análise*, *Concluído*).  
- **Orçamentos**: Recebimento de orçamentos estimados após a solicitação.  
- **Autenticação**: Sistema de cadastro e login.  

---

## Funcionalidades (Visão do Administrador)

- **Painel de Controle Móvel**: Gerenciamento completo de todos os pedidos recebidos.  
- **Gestão de Status**: Listar, editar e atualizar o status de cada pedido.  
- **Gerenciamento de Usuários**: Ferramentas para administrar permissões de usuários.  

---

## Pilha Tecnológica (Tech Stack)

- **Frontend:** React Native  
- **Framework/SDK:** Expo  
- **Backend (BaaS):** Supabase  
- **Banco de Dados:** PostgreSQL (via Supabase)  
- **Autenticação:** Supabase Auth  
- **Gerenciamento de Estado:** React Hooks (`useReducer`)  

---

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório

```
git clone https://github.com/seu-usuario/seu-repositorio.git  
cd seu-repositorio
```

### 2. Instalar dependências

```
npm install  
# ou  
yarn install
```

### 3. Configurar Variáveis de Ambiente (Supabase)

Configure o arquivo /core/config.js e modifique:

```
const supabaseUrl = SUA_URL_DO_SUPABASE  
const supabasePublishableKey = SUA_CHAVE_ANON_DO_SUPABASE
```

### 4. Rodar o projeto

```
npx expo start
```

Use o aplicativo Expo Go no celular para escanear o QR code, ou rode em um emulador (Android/iOS).

---

## Estrutura de Pastas

O projeto segue uma arquitetura MVVM + Command Pattern:

```
src/  
├── components/screens/   # As "Views" (Componentes React)  
├── models/               # Os "ViewModels" (Hooks com lógica de UI)  
├── domain/  
│   ├── commands/         # "Commands" (Lógica de negócios encapsulada)  
│   ├── CommandFactory.js # Factory para criar comandos  
│   └── Maestro.js        # O Command Bus (orquestrador)  
├── core/  
│   ├── DIContainer.js    # Contêiner de Injeção de Dependência  
│   └── bootstrap.js      # Registro de serviços e comandos  
├── services/             # Serviços (ApiService, AuthService, NavigationService...)  
└── context/              # Contexto de Autenticação (AuthContext.js)
```
---

## Arquitetura e Padrões de Projeto

O diferencial deste projeto é sua arquitetura focada em baixo acoplamento e separação de responsabilidades (SoC).

**Arquitetura Principal: MVVM + Command Pattern**

**View (Telas):** Componentes React em src/components/screens/.  
Responsáveis apenas pela renderização e por chamar ações dos ViewModels.

**ViewModel (Hooks):** Hooks React em src/models/.  
Gerenciam estado (frequentemente com useReducer) e lógica de apresentação, delegando lógica de negócios a comandos.

**Model (Domínio):** Lógica de negócios em duas camadas:

- src/domain/commands/: ações específicas encapsuladas como comandos.  
- src/services/: acesso a dados, autenticação e serviços auxiliares.

---

## Padrões de Projeto Aplicados

### **Command Pattern**
Toda lógica de negócios vive em comandos como RegisterOrderCommand ou UpdateAdminUserCommand.  
As ViewModels apenas disparam comandos pelo Maestro (src/domain/Maestro.js), que atua como Command Bus.

### **Injeção de Dependência (DI)**
Um contêiner (src/core/DIContainer.js) registra serviços como IApiService e IAuthService.  
O bootstrap.js injeta dependências nos comandos, removendo acoplamento direto.

### **Factory Method**
O CommandFactory.js cria comandos sob demanda para o Maestro, centralizando sua instanciação.

### **Strategy Pattern**
Presente em src/services/AdminFormConfigService.js, onde this.strategies seleciona automaticamente a configuração correta baseada em:

- FORM_MODES.ORDER  
- FORM_MODES.USER  
