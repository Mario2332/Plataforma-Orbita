# TODO - Órbita Plataforma

## Fase 1: Configuração do Banco de Dados e Autenticação
- [x] Criar schema do banco de dados com todas as tabelas necessárias
- [x] Configurar sistema de roles (gestor, mentor, aluno)
- [x] Implementar proteção de rotas baseada em roles
- [x] Configurar autenticação e contexto de usuário

## Fase 2: Funcionalidades do Aluno

### Gestão da Conta
- [ ] Página de cadastro com nome, email, celular e senha
- [ ] Sistema de login seguro
- [ ] Modo noturno/claro (tema)

### Dashboard Inicial
- [ ] Cards de métricas principais (streak, tempo total, questões, último simulado, última redação)
- [ ] Gráfico de evolução de acertos em simulados
- [ ] Botões de ação rápida (cronômetro, registrar estudo)
- [ ] Análise inteligente com sugestões de conteúdos

### Registro de Estudos
- [ ] Formulário de registro manual de estudos
- [ ] Componente de cronômetro com iniciar/pausar/resetar
- [ ] Histórico de estudos com tabela ordenável
- [ ] Edição e exclusão de registros de estudo

### Análise de Desempenho
- [ ] Painel de métricas gerais (tempo, questões, acertos, percentual)
- [ ] Heatmap de consistência (90 dias)
- [ ] Gráficos de barra por matéria (questões, acertos, flashcards)
- [ ] Gráficos de pizza (tempo por matéria e área)
- [ ] Gráfico de linha (acertos vs erros semanal)
- [ ] Tabelas de pontos fracos (< 50%) e fortes (> 80%)

### Simulados
- [ ] Formulário de registro de simulado com todas as áreas
- [ ] Histórico de simulados com cálculos automáticos
- [ ] Editor de anotações por simulado (Quill.js)
- [ ] Gráficos de evolução de simulados
- [ ] Filtros por período (30d, 3m, 6m)

## Fase 3: Funcionalidades do Mentor

### Gestão de Alunos
- [ ] Dashboard com lista de alunos
- [ ] Busca e filtro por nome/email
- [ ] Adicionar novos alunos
- [ ] Editar informações de alunos
- [ ] Remover alunos

### Acompanhamento
- [ ] Visualizar dashboard completo de qualquer aluno
- [ ] Acesso a todas as métricas e registros do aluno
- [ ] Editor de anotações privadas por aluno

## Fase 4: Funcionalidades do Gestor

### Dashboard de Gestão
- [ ] Contagem total de alunos na plataforma
- [ ] Listagem de mentores/clientes

### White-label
- [ ] Criar e editar mentores
- [ ] Configurar nome da plataforma por mentor
- [ ] Upload e configuração de logo por mentor
- [ ] Configurar cor principal por mentor

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
