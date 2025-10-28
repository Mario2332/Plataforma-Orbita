import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Users, Building2, TrendingUp } from "lucide-react";

export default function GestorHome() {
  const { data: gestor } = trpc.gestor.me.useQuery();
  const { data: mentores } = trpc.gestor.getMentores.useQuery();
  const { data: totalAlunos } = trpc.gestor.getTotalAlunos.useQuery();

  const mentoresAtivos = mentores?.filter(m => m.ativo).length || 0;
  const mentoresTotal = mentores?.length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard do Gestor</h1>
        <p className="text-muted-foreground mt-2">Bem-vindo à Órbita Plataforma, {gestor?.nome}!</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Mentores</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mentoresTotal}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {mentoresAtivos} ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAlunos || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Em toda a plataforma
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crescimento</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground mt-1">
              Em breve
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Visão Geral</CardTitle>
          <CardDescription>Resumo da plataforma Órbita</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Gerencie mentores, configure plataformas white-label e acompanhe o crescimento da rede de estudantes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
