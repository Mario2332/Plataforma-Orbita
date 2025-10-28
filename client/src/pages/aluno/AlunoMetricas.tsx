import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { BarChart3 } from "lucide-react";

export default function AlunoMetricas() {
  const { data: estudos, isLoading: loadingEstudos } = trpc.aluno.getEstudos.useQuery();
  const { data: simulados, isLoading: loadingSimulados } = trpc.aluno.getSimulados.useQuery();

  if (loadingEstudos || loadingSimulados) {
    return <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>;
  }

  const tempoTotal = estudos?.reduce((acc, e) => acc + e.tempoMinutos, 0) || 0;
  const questoesTotal = estudos?.reduce((acc, e) => acc + e.questoesFeitas, 0) || 0;
  const acertosTotal = estudos?.reduce((acc, e) => acc + e.questoesAcertadas, 0) || 0;
  const percentualAcerto = questoesTotal > 0 ? Math.round((acertosTotal / questoesTotal) * 100) : 0;

  // Agrupar por matéria
  const porMateria: Record<string, {questoes: number, acertos: number, tempo: number}> = {};
  estudos?.forEach(e => {
    if (!porMateria[e.materia]) {
      porMateria[e.materia] = {questoes: 0, acertos: 0, tempo: 0};
    }
    porMateria[e.materia].questoes += e.questoesFeitas;
    porMateria[e.materia].acertos += e.questoesAcertadas;
    porMateria[e.materia].tempo += e.tempoMinutos;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Métricas</h1>
        <p className="text-muted-foreground mt-2">Análise detalhada do seu desempenho</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Tempo Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{Math.floor(tempoTotal / 60)}h {tempoTotal % 60}m</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Questões Resolvidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{questoesTotal}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Acerto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{percentualAcerto}%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Desempenho por Matéria
          </CardTitle>
          <CardDescription>Análise detalhada de cada matéria estudada</CardDescription>
        </CardHeader>
        <CardContent>
          {Object.keys(porMateria).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(porMateria).map(([materia, dados]) => {
                const percentual = dados.questoes > 0 ? Math.round((dados.acertos / dados.questoes) * 100) : 0;
                return (
                  <div key={materia} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{materia}</span>
                      <span className="text-sm text-muted-foreground">
                        {dados.acertos}/{dados.questoes} ({percentual}%)
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${percentual}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Tempo: {Math.floor(dados.tempo / 60)}h {dados.tempo % 60}m
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Nenhum dado disponível ainda. Comece registrando seus estudos!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
