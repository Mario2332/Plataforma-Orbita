import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Building2, BarChart3, Users, MessageSquare } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

export default function LoginMentor() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    senha: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.senha
      );
      
      toast.success("Login realizado com sucesso!");
      setLocation("/mentor");
    } catch (error: any) {
      console.error("Erro no login:", error);
      toast.error(error.message || "Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado Esquerdo - Informações */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-indigo-700 p-12 flex-col justify-between text-white">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <Building2 className="h-10 w-10" />
            <h1 className="text-3xl font-bold">Órbita Plataforma</h1>
          </div>
          <h2 className="text-4xl font-bold mb-6">
            Gerencie seus alunos e acompanhe o progresso de cada um
          </h2>
          <p className="text-lg text-purple-100 mb-12">
            Plataforma completa para mentores acompanharem o desenvolvimento dos seus alunos rumo à aprovação no ENEM.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-white/10 p-3 rounded-lg">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Gestão de Alunos</h3>
              <p className="text-purple-100">Adicione e gerencie todos os seus alunos em um só lugar</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-white/10 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Acompanhamento Detalhado</h3>
              <p className="text-purple-100">Visualize métricas e progresso de cada aluno</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-white/10 p-3 rounded-lg">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Anotações Privadas</h3>
              <p className="text-purple-100">Mantenha registros e observações sobre cada aluno</p>
            </div>
          </div>
        </div>

        <div className="text-sm text-purple-200">
          © 2024 Órbita Plataforma. Todos os direitos reservados.
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Área do Mentor</CardTitle>
            <CardDescription className="text-center">
              Entre com suas credenciais de mentor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  type="password"
                  placeholder="••••••••"
                  value={loginData.senha}
                  onChange={(e) => setLoginData({ ...loginData, senha: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">Outros acessos</span>
                </div>
              </div>

              <div className="text-center text-sm space-y-2">
                <p className="text-muted-foreground">
                  Aluno?{" "}
                  <a href="/login/aluno" className="text-primary hover:underline">
                    Acesse aqui
                  </a>
                </p>
                <p className="text-muted-foreground">
                  Gestor?{" "}
                  <a href="/login/gestor" className="text-primary hover:underline">
                    Acesse aqui
                  </a>
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                <p className="font-medium mb-1">📝 Nota para Mentores</p>
                <p>
                  Suas credenciais são fornecidas pelo gestor da plataforma. Entre em contato se precisar de ajuda.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
