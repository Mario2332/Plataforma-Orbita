# TODO - Órbita Plataforma

## Fase 1: Configuração do Banco de Dados e Autenticação
- [x] Criar schema do banco de dados com todas as tabelas necessárias
- [x] Configurar sistema de roles (gestor, mentor, aluno)
- [x] Implementar proteção de rotas baseada em roles
- [x] Configurar autenticação e contexto de usuário

## Fase 2: Funcionalidades do Aluno

### Gestão da Conta
- [x] Página de cadastro com nome, email, celular e senha
- [x] Sistema de login seguro
- [x] Modo noturno/claro (tema)

### Dashboard Inicial
- [x] Cards de métricas principais (streak, tempo total, questões, último simulado, última redação)
- [x] Gráfico de evolução de acertos em simulados
- [x] Botões de ação rápida (cronômetro, registrar estudo)
- [x] Análise inteligente com sugestões de conteúdos

### Registro de Estudos
- [x] Formulário de registro manual de estudos
- [x] Componente de cronômetro com iniciar/pausar/resetar
- [x] Histórico de estudos com tabela ordenável
- [x] Edição e exclusão de registros de estudo

### Análise de Desempenho
- [x] Painel de métricas gerais (tempo, questões, acertos, percentual)
- [ ] Heatmap de consistência (90 dias)
- [x] Gráficos de barra por matéria (questões, acertos, flashcards)
- [ ] Gráficos de pizza (tempo por matéria e área)
- [ ] Gráfico de linha (acertos vs erros semanal)
- [ ] Tabelas de pontos fracos (< 50%) e fortes (> 80%)

### Simulados
- [x] Formulário de registro de simulado com todas as áreas
- [x] Histórico de simulados com cálculos automáticos
- [ ] Editor de anotações por simulado (Quill.js)
- [ ] Gráficos de evolução de simulados
- [ ] Filtros por período (30d, 3m, 6m)

## Fase 3: Funcionalidades do Mentor

### Gestão de Alunos
- [x] Dashboard com lista de alunos
- [ ] Busca e filtro por nome/email
- [x] Adicionar novos alunos
- [ ] Editar informações de alunos
- [ ] Remover alunos

### Acompanhamento
- [ ] Visualizar dashboard completo de qualquer aluno
- [ ] Acesso a todas as métricas e registros do aluno
- [ ] Editor de anotações privadas por aluno

## Fase 4: Funcionalidades do Gestor

### Dashboard de Gestão
- [x] Contagem total de alunos na plataforma
- [x] Listagem de mentores/clientes

### White-label
- [x] Criar e editar mentores
- [x] Configurar nome da plataforma por mentor
- [x] Upload e configuração de logo por mentor
- [x] Configurar cor principal por mentor

## Fase 5: Gráficos e Análises
- [ ] Integrar biblioteca de gráficos (Recharts)
- [ ] Implementar todos os gráficos de análise do aluno
- [ ] Implementar gráficos de evolução de simulados
- [ ] Adicionar filtros de período em gráficos

## Fase 6: Ajustes Finais
- [ ] Testes de funcionalidades principais
- [ ] Ajustes de responsividade
- [ ] Otimização de performance
- [ ] Documentação do projeto
- [ ] Preparar estrutura para webhooks Kiwify/Hotmart

## Funcionalidades Extras Sugeridas
- [ ] Sistema de metas e objetivos para alunos
- [ ] Gamificação (badges, níveis, ranking)
- [ ] Sistema de notificações
- [ ] Exportação de relatórios em PDF
- [ ] Relatórios consolidados para mentores
- [ ] Sistema de mensagens mentor-aluno
- [ ] Analytics para gestores


## Bugs
- [x] Página inicial mostrando conteúdo de exemplo ao invés de redirecionar para dashboard baseado em role

## Novas Funcionalidades - Firebase e Login
- [x] Integrar Firebase no projeto
- [x] Criar configuração do Firebase com credenciais fornecidas
- [x] Implementar autenticação Firebase (email/senha)
- [x] Criar página de login para Alunos (com opção de cadastro)
- [x] Criar página de login para Mentores (sem cadastro)
- [x] Criar página de login para Gestores (sem cadastro)
- [x] Implementar design moderno e profissional nas páginas de login
- [x] Separar rotas de login por perfil (/login/aluno, /login/mentor, /login/gestor)
- [ ] Integrar autenticação Firebase com sistema de roles existente

## Melhorias de Interface
- [x] Personalizar navegação lateral para mostrar apenas abas do perfil do usuário
- [x] Desenvolver dashboard principal do aluno com atalhos para funcionalidades
- [x] Ativar todos os botões inativos da plataforma
- [x] Implementar navegação contextual baseada em role

## Novas Funcionalidades - Análise e Cronograma
- [x] Implementar página de análise de desempenho com gráficos
- [x] Adicionar filtros de período nos gráficos (7d, 30d, 3m, 6m, 1a)
- [x] Criar gráfico de evolução temporal (linha)
- [x] Criar gráfico de distribuição por matéria (barras)
- [x] Criar gráfico de taxa de acerto por área (pizza)
- [x] Implementar tabela de schema para horários de estudo
- [x] Criar página de cronograma semanal
- [x] Implementar funcionalidade de adicionar horários
- [x] Implementar funcionalidade de editar horários
- [x] Implementar funcionalidade de remover horários
- [x] Criar visualização em grade semanal

## Bugs Reportados
- [ ] Barra lateral mostrando abas incorretas - todos os perfis veem as mesmas abas ao invés de abas específicas do seu perfil

## Migração para Firebase
- [ ] Instalar Firebase Admin SDK no servidor
- [ ] Instalar Firebase Client SDK no cliente
- [ ] Configurar Firebase Admin no backend
- [ ] Substituir queries MySQL por Firestore
- [ ] Migrar autenticação para Firebase Auth
- [ ] Atualizar todos os routers tRPC para usar Firestore
- [ ] Atualizar frontend para usar Firebase Auth
- [ ] Remover dependências do Drizzle ORM
- [ ] Testar todas as funcionalidades com Firebase

## Bugs Críticos - Sistema Híbrido
- [x] Erro "Gestor não encontrado" - routers tentando buscar no Firestore mas usuário está no MySQL
- [x] Query data undefined para gestor.me
- [ ] Sistema híbrido MySQL/Firestore causando conflitos - precisa suportar ambos

## Nova Funcionalidade - Gestão de Mentores
- [x] Criar página de listagem de mentores para o gestor
- [x] Implementar formulário de adição de novos mentores
- [x] Adicionar validações de email e campos obrigatórios
- [x] Implementar edição de mentores existentes
- [x] Implementar exclusão de mentores
- [ ] Criar usuário Firebase Auth automaticamente ao adicionar mentor
- [x] Configurar white-label (nome, logo, cor) por mentor

## Nova Funcionalidade - Gestão de Alunos e Dashboard Gestor
- [x] Criar página de listagem de todos os alunos para o gestor
- [x] Mostrar informações de cada aluno (nome, email, mentor vinculado)
- [x] Implementar edição de informações do aluno
- [x] Implementar troca de mentor do aluno
- [x] Implementar exclusão de aluno
- [x] Criar dashboard analítico com gráficos temporais
- [x] Gráfico de crescimento de alunos ao longo do tempo
- [x] Gráfico de crescimento de mentores ao longo do tempo
- [x] Métricas gerais no dashboard (total alunos, mentores, crescimento)

## Melhoria - Filtro de Alunos por Mentor
- [x] Adicionar dropdown de seleção de mentor na página de alunos
- [x] Implementar filtro combinado (busca + mentor)
- [x] Adicionar opção "Todos os mentores" no filtro

## Ajustes de UI - Páginas de Login
- [x] Remover seção "Acesso restrito para alunos" e links para outros perfis da página de login do aluno
- [x] Remover seção "Outros acessos" e "Nota para Mentores" da página de login do mentor

## Correção - Navegação do Aluno
- [x] Remover "Mentores" e "Alunos" da navegação lateral do aluno
- [x] Adicionar "Configurações" à navegação do aluno
- [x] Reordenar itens: Início, Estudos, Cronograma, Métricas, Simulados, Configurações

## Nova Funcionalidade - Configurações do Aluno
- [x] Criar página de configurações do aluno
- [x] Implementar formulário de edição de perfil (nome, email, celular)
- [x] Implementar formulário de alteração de senha
- [x] Adicionar validações de campos
- [x] Integrar com Firebase Auth para atualização de email e senha
- [x] Adicionar procedures tRPC para atualização de dados do aluno
