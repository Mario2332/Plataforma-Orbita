import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Calendar, Clock, Plus, Trash2, Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DIAS_SEMANA = [
  { valor: 0, nome: "Domingo" },
  { valor: 1, nome: "Segunda" },
  { valor: 2, nome: "Terça" },
  { valor: 3, nome: "Quarta" },
  { valor: 4, nome: "Quinta" },
  { valor: 5, nome: "Sexta" },
  { valor: 6, nome: "Sábado" },
];

const MATERIAS_SUGERIDAS = [
  "Matemática",
  "Português",
  "Física",
  "Química",
  "Biologia",
  "História",
  "Geografia",
  "Filosofia",
  "Sociologia",
  "Inglês",
  "Redação",
  "Literatura",
];

type HorarioForm = {
  diaSemana: number;
  horaInicio: string;
  horaFim: string;
  materia: string;
  descricao: string;
};

export default function AlunoCronograma() {
  const [dialogAberto, setDialogAberto] = useState(false);
  const [horarioEditando, setHorarioEditando] = useState<number | null>(null);
  const [formData, setFormData] = useState<HorarioForm>({
    diaSemana: 1,
    horaInicio: "",
    horaFim: "",
    materia: "",
    descricao: "",
  });

  const { data: horarios, isLoading, refetch } = trpc.aluno.getHorarios.useQuery();
  const criarHorario = trpc.aluno.criarHorario.useMutation({
    onSuccess: () => {
      toast.success("Horário adicionado com sucesso!");
      refetch();
      fecharDialog();
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao adicionar horário");
    },
  });

  const atualizarHorario = trpc.aluno.atualizarHorario.useMutation({
    onSuccess: () => {
      toast.success("Horário atualizado com sucesso!");
      refetch();
      fecharDialog();
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao atualizar horário");
    },
  });

  const deletarHorario = trpc.aluno.deletarHorario.useMutation({
    onSuccess: () => {
      toast.success("Horário removido com sucesso!");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao remover horário");
    },
  });

  const abrirDialogNovo = () => {
    setHorarioEditando(null);
    setFormData({
      diaSemana: 1,
      horaInicio: "",
      horaFim: "",
      materia: "",
      descricao: "",
    });
    setDialogAberto(true);
  };

  const abrirDialogEditar = (horario: any) => {
    setHorarioEditando(horario.id);
    setFormData({
      diaSemana: horario.diaSemana,
      horaInicio: horario.horaInicio,
      horaFim: horario.horaFim,
      materia: horario.materia,
      descricao: horario.descricao || "",
    });
    setDialogAberto(true);
  };

  const fecharDialog = () => {
    setDialogAberto(false);
    setHorarioEditando(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.horaInicio || !formData.horaFim || !formData.materia) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    if (formData.horaInicio >= formData.horaFim) {
      toast.error("A hora de início deve ser anterior à hora de fim");
      return;
    }

    if (horarioEditando) {
      atualizarHorario.mutate({
        id: horarioEditando,
        ...formData,
      });
    } else {
      criarHorario.mutate(formData);
    }
  };

  const handleDeletar = (id: number) => {
    if (confirm("Tem certeza que deseja remover este horário?")) {
      deletarHorario.mutate({ id });
    }
  };

  // Agrupar horários por dia da semana
  const horariosPorDia = DIAS_SEMANA.map((dia) => ({
    ...dia,
    horarios: (horarios || [])
      .filter((h) => h.diaSemana === dia.valor)
      .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio)),
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cronograma Semanal</h1>
          <p className="text-muted-foreground">Organize seus horários de estudo</p>
        </div>
        <Button onClick={abrirDialogNovo}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Horário
        </Button>
      </div>

      {/* Visualização em Grade Semanal */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {horariosPorDia.map((dia) => (
          <Card key={dia.valor} className="flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {dia.nome}
              </CardTitle>
              <CardDescription>
                {dia.horarios.length} {dia.horarios.length === 1 ? "horário" : "horários"}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              {dia.horarios.length > 0 ? (
                <div className="space-y-3">
                  {dia.horarios.map((horario) => (
                    <div
                      key={horario.id}
                      className="p-3 bg-secondary/50 rounded-lg space-y-2 hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{horario.materia}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3" />
                            {horario.horaInicio} - {horario.horaFim}
                          </div>
                          {horario.descricao && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {horario.descricao}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => abrirDialogEditar(horario)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive hover:text-destructive"
                            onClick={() => handleDeletar(horario.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                  <Clock className="h-8 w-8 mb-2 opacity-20" />
                  <p className="text-sm">Nenhum horário</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog de Adicionar/Editar */}
      <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {horarioEditando ? "Editar Horário" : "Adicionar Horário"}
              </DialogTitle>
              <DialogDescription>
                Defina o horário de estudo para sua rotina semanal
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="diaSemana">Dia da Semana</Label>
                <Select
                  value={formData.diaSemana.toString()}
                  onValueChange={(v) =>
                    setFormData({ ...formData, diaSemana: parseInt(v) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DIAS_SEMANA.map((dia) => (
                      <SelectItem key={dia.valor} value={dia.valor.toString()}>
                        {dia.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="horaInicio">Hora Início</Label>
                  <Input
                    id="horaInicio"
                    type="time"
                    value={formData.horaInicio}
                    onChange={(e) =>
                      setFormData({ ...formData, horaInicio: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="horaFim">Hora Fim</Label>
                  <Input
                    id="horaFim"
                    type="time"
                    value={formData.horaFim}
                    onChange={(e) =>
                      setFormData({ ...formData, horaFim: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="materia">Matéria</Label>
                <Select
                  value={formData.materia}
                  onValueChange={(v) => setFormData({ ...formData, materia: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma matéria" />
                  </SelectTrigger>
                  <SelectContent>
                    {MATERIAS_SUGERIDAS.map((materia) => (
                      <SelectItem key={materia} value={materia}>
                        {materia}
                      </SelectItem>
                    ))}
                    <SelectItem value="Outra">Outra</SelectItem>
                  </SelectContent>
                </Select>
                {formData.materia === "Outra" && (
                  <Input
                    placeholder="Digite o nome da matéria"
                    value={formData.materia === "Outra" ? "" : formData.materia}
                    onChange={(e) =>
                      setFormData({ ...formData, materia: e.target.value })
                    }
                    className="mt-2"
                  />
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="descricao">Descrição (opcional)</Label>
                <Textarea
                  id="descricao"
                  placeholder="Ex: Resolver exercícios do capítulo 5"
                  value={formData.descricao}
                  onChange={(e) =>
                    setFormData({ ...formData, descricao: e.target.value })
                  }
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={fecharDialog}>
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={criarHorario.isPending || atualizarHorario.isPending}
              >
                {horarioEditando ? "Atualizar" : "Adicionar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
