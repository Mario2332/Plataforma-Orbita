import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Save, Copy, Palette } from "lucide-react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type TimeSlot = {
  day: number; // 0 = Domingo, 6 = Sábado
  hour: number; // 0-23
  minute: number; // 0 ou 30
  activity: string;
  color: string;
};

const DAYS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = [0, 30];

const COLORS = [
  { name: "Laranja", value: "#FFA500" },
  { name: "Azul", value: "#4A90E2" },
  { name: "Verde", value: "#50C878" },
  { name: "Rosa", value: "#FF69B4" },
  { name: "Roxo", value: "#9B59B6" },
  { name: "Amarelo", value: "#FFD700" },
  { name: "Vermelho", value: "#E74C3C" },
  { name: "Cinza", value: "#95A5A6" },
  { name: "Branco", value: "#FFFFFF" },
];

export default function AlunoCronograma() {
  const [schedule, setSchedule] = useState<TimeSlot[]>([]);
  const [copiedCell, setCopiedCell] = useState<TimeSlot | null>(null);
  const [editingCell, setEditingCell] = useState<string | null>(null);

  const getCellKey = (day: number, hour: number, minute: number) => 
    `${day}-${hour}-${minute}`;

  const getSlot = (day: number, hour: number, minute: number): TimeSlot => {
    const existing = schedule.find(
      s => s.day === day && s.hour === hour && s.minute === minute
    );
    return existing || { day, hour, minute, activity: "", color: "#FFFFFF" };
  };

  const updateSlot = (day: number, hour: number, minute: number, updates: Partial<TimeSlot>) => {
    const key = getCellKey(day, hour, minute);
    const existing = schedule.find(
      s => s.day === day && s.hour === hour && s.minute === minute
    );

    if (existing) {
      setSchedule(schedule.map(s => 
        s.day === day && s.hour === hour && s.minute === minute
          ? { ...s, ...updates }
          : s
      ));
    } else {
      setSchedule([...schedule, { day, hour, minute, activity: "", color: "#FFFFFF", ...updates }]);
    }
  };

  const handleCopy = (day: number, hour: number, minute: number) => {
    const slot = getSlot(day, hour, minute);
    setCopiedCell(slot);
    toast.success("Célula copiada!");
  };

  const handlePaste = (day: number, hour: number, minute: number) => {
    if (!copiedCell) {
      toast.error("Nenhuma célula copiada");
      return;
    }
    updateSlot(day, hour, minute, {
      activity: copiedCell.activity,
      color: copiedCell.color,
    });
    toast.success("Célula colada!");
  };

  const handleSave = () => {
    // TODO: Salvar no backend via tRPC
    toast.success("Cronograma salvo com sucesso!");
    console.log("Schedule to save:", schedule);
  };

  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Cronograma Semanal</h1>
          </div>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Salvar Cronograma
          </Button>
        </div>
        <p className="text-muted-foreground">
          Organize sua rotina semanal. Clique nas células para editar, escolher cores e copiar/colar atividades.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Grade Semanal</CardTitle>
          <CardDescription>
            Intervalos de 30 minutos • Clique para editar • Clique direito para copiar/colar
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="min-w-[900px]">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-border bg-muted p-2 text-sm font-semibold sticky left-0 z-10">
                    Horário
                  </th>
                  {DAYS.map((day, index) => (
                    <th key={index} className="border border-border bg-muted p-2 text-sm font-semibold">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HOURS.map(hour =>
                  MINUTES.map(minute => {
                    const timeKey = `${hour}-${minute}`;
                    return (
                      <tr key={timeKey}>
                        <td className="border border-border bg-muted p-2 text-xs font-mono sticky left-0 z-10">
                          {formatTime(hour, minute)}
                        </td>
                        {DAYS.map((_, dayIndex) => {
                          const slot = getSlot(dayIndex, hour, minute);
                          const cellKey = getCellKey(dayIndex, hour, minute);
                          const isEditing = editingCell === cellKey;

                          return (
                            <td
                              key={cellKey}
                              className="border border-border p-0 h-10 relative group"
                              style={{ backgroundColor: slot.color }}
                              onContextMenu={(e) => {
                                e.preventDefault();
                                if (copiedCell) {
                                  handlePaste(dayIndex, hour, minute);
                                } else {
                                  handleCopy(dayIndex, hour, minute);
                                }
                              }}
                            >
                              {isEditing ? (
                                <Input
                                  autoFocus
                                  value={slot.activity}
                                  onChange={(e) => updateSlot(dayIndex, hour, minute, { activity: e.target.value })}
                                  onBlur={() => setEditingCell(null)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") setEditingCell(null);
                                    if (e.key === "Escape") setEditingCell(null);
                                  }}
                                  className="h-full border-0 text-xs p-1"
                                  style={{ backgroundColor: slot.color }}
                                />
                              ) : (
                                <div
                                  onClick={() => setEditingCell(cellKey)}
                                  className="h-full w-full p-1 text-xs cursor-pointer flex items-center justify-between"
                                >
                                  <span className="truncate flex-1">{slot.activity}</span>
                                  <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                          }}
                                          className="p-0.5 hover:bg-black/10 rounded"
                                        >
                                          <Palette className="h-3 w-3" />
                                        </button>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-auto p-2">
                                        <div className="grid grid-cols-3 gap-2">
                                          {COLORS.map((color) => (
                                            <button
                                              key={color.value}
                                              onClick={() => {
                                                updateSlot(dayIndex, hour, minute, { color: color.value });
                                              }}
                                              className="w-8 h-8 rounded border-2 border-border hover:scale-110 transition-transform"
                                              style={{ backgroundColor: color.value }}
                                              title={color.name}
                                            />
                                          ))}
                                        </div>
                                      </PopoverContent>
                                    </Popover>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCopy(dayIndex, hour, minute);
                                      }}
                                      className="p-0.5 hover:bg-black/10 rounded"
                                      title="Copiar"
                                    >
                                      <Copy className="h-3 w-3" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Instruções</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• <strong>Editar:</strong> Clique em uma célula para digitar a atividade</p>
          <p>• <strong>Cor:</strong> Clique no ícone de paleta para escolher a cor da célula</p>
          <p>• <strong>Copiar:</strong> Clique no ícone de copiar ou clique com botão direito</p>
          <p>• <strong>Colar:</strong> Após copiar, clique com botão direito na célula de destino</p>
          <p>• <strong>Salvar:</strong> Clique em "Salvar Cronograma" para guardar suas alterações</p>
        </CardContent>
      </Card>
    </div>
  );
}
