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
