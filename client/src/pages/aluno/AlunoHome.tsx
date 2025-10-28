import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Activity, BookOpen, Calendar, FileText, Target, TrendingUp } from "lucide-react";

export default function AlunoHome() {
  const { data: aluno, isLoading: loadingAluno } = trpc.aluno.me.useQuery();
  const { data: estudos, isLoading: loadingEstudos } = trpc.aluno.getEstudos.useQuery();
  const { data: simulados, isLoading: loadingSimulados } = trpc.aluno.getSimulados.useQuery();

  if (loadingAluno || loadingEstudos || loadingSimulados) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Calcular métricas
  const tempoTotal = estudos?.reduce((acc, e) => acc + e.tempoMinutos, 0) || 0;
  const questoesTotal = estudos?.reduce((acc, e) => acc + e.questoesFeitas, 0) || 0;
  const acertosTotal = estudos?.reduce((acc, e) => acc + e.questoesAcertadas, 0) || 0;
  const percentualAcerto = questoesTotal > 0 ? Math.round((acertosTotal / questoesTotal) * 100) : 0;

  // Último simulado
  const ultimoSimulado = simulados?.[0];
  const acertosUltimoSimulado = ultimoSimulado
    ? ultimoSimulado.linguagensAcertos +
      ultimoSimulado.humanasAcertos +
      ultimoSimulado.naturezaAcertos +
      ultimoSimulado.matematicaAcertos
    : 0;

  // Calcular streak (dias consecutivos de estudo)
  const calcularStreak = () => {
    if (!estudos || estudos.length === 0) return 0;
    
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const datasEstudo = estudos
      .map(e => {
        const data = new Date(e.data);
        data.setHours(0, 0, 0, 0);
        return data.getTime();
      })
      .filter((v, i, a) => a.indexOf(v) === i) // Remove duplicatas
      .sort((a, b) => b - a); // Ordena decrescente
    
    let streak = 0;
    let dataEsperada = hoje.getTime();
    
    for (const data of datasEstudo) {
      if (data === dataEsperada) {
        streak++;
        dataEsperada -= 24 * 60 * 60 * 1000; // Subtrai 1 dia
      } else if (data < dataEsperada) {
        break;
      }
    }
    
    return streak;
  };

  const streak = calcularStreak();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bem-vindo, {aluno?.nome}!</h1>
        <p className="text-muted-foreground mt-2">
          Acompanhe seu progresso e continue estudando para o ENEM
        </p>
      </div>

      {/* Cards de Métricas Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sequência de Dias</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{streak} dias</div>
            <p className="text-xs text-muted-foreground mt-1">
              {streak > 0 ? "Continue assim!" : "Comece sua sequência hoje"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Total</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.floor(tempoTotal / 60)}h {tempoTotal % 60}m</div>
            <p className="text-xs text-muted-foreground mt-1">
              De estudo dedicado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Questões Resolvidas</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{questoesTotal}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {percentualAcerto}% de acerto
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Último Simulado</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ultimoSimulado ? `${acertosUltimoSimulado}/180` : "-"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {ultimoSimulado ? "Acertos" : "Nenhum simulado registrado"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Registrar Estudo
            </CardTitle>
            <CardDescription>
              Adicione uma nova sessão de estudos
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Ver Métricas
            </CardTitle>
            <CardDescription>
              Analise seu desempenho detalhado
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Análise Inteligente */}
      {estudos && estudos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Análise Inteligente</CardTitle>
            <CardDescription>
              Sugestões baseadas no seu desempenho
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {percentualAcerto < 70 && (
                <p className="text-sm">
                  💡 Seu percentual de acerto está em {percentualAcerto}%. Considere revisar os conteúdos com mais dificuldade.
                </p>
              )}
              {streak === 0 && (
                <p className="text-sm">
                  🔥 Comece uma nova sequência de estudos hoje! A consistência é fundamental para o sucesso no ENEM.
                </p>
              )}
              {streak >= 7 && (
                <p className="text-sm">
                  🎉 Parabéns! Você está mantendo uma sequência de {streak} dias de estudo. Continue assim!
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
