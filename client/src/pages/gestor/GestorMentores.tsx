import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { trpc } from "@/lib/trpc";
import { Plus, Building2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function GestorMentores() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: mentores, isLoading, refetch } = trpc.gestor.getMentores.useQuery();

  const createMutation = trpc.gestor.createMentor.useMutation({
    onSuccess: () => {
      toast.success("Mentor adicionado!");
      refetch();
      setDialogOpen(false);
    },
    onError: (error) => {
      toast.error("Erro: " + error.message);
    },
  });

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    nomePlataforma: "",
    logoUrl: "",
    corPrincipal: "#3b82f6",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mentores</h1>
          <p className="text-muted-foreground mt-2">Gerencie os mentores e suas plataformas</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Adicionar Mentor</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Mentor</DialogTitle>
              <DialogDescription>Configure a plataforma white-label do mentor</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <Label>Nome da Plataforma</Label>
                  <Input value={formData.nomePlataforma} onChange={(e) => setFormData({...formData, nomePlataforma: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <Label>URL do Logo</Label>
                  <Input value={formData.logoUrl} onChange={(e) => setFormData({...formData, logoUrl: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Cor Principal</Label>
                  <Input type="color" value={formData.corPrincipal} onChange={(e) => setFormData({...formData, corPrincipal: e.target.value})} />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending ? "Salvando..." : "Salvar"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Mentores</CardTitle>
          <CardDescription>Todos os mentores cadastrados</CardDescription>
        </CardHeader>
        <CardContent>
          {mentores && mentores.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Plataforma</TableHead>
                    <TableHead>Cor</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mentores.map((mentor) => (
                    <TableRow key={mentor.id}>
                      <TableCell className="font-medium">{mentor.nome}</TableCell>
                      <TableCell>{mentor.email}</TableCell>
                      <TableCell>{mentor.nomePlataforma}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded" style={{backgroundColor: mentor.corPrincipal}}></div>
                          <span className="text-xs text-muted-foreground">{mentor.corPrincipal}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${mentor.ativo ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                          {mentor.ativo ? "Ativo" : "Inativo"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum mentor cadastrado ainda.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
