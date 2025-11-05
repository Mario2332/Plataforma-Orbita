import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { BookOpen, GraduationCap, Target, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

export default function LoginAluno() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);

  // Estado para Login
  const [loginData, setLoginData] = useState({
    email: "",
    senha: "",
  });

  // Estado para Cadastro
  const [cadastroData, setCadastroData] = useState({
    nome: "",
    email: "",
    celular: "",
    senha: "",
    confirmarSenha: "",
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

      // Aguardar token ser salvo no localStorage
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('firebase-token', token);

      toast.success("Login realizado com sucesso!");
      // Recarregar para atualizar contexto
      window.location.href = "/aluno";
    } catch (error: any) {
      console.error("Erro no login:", error);
      toast.error(error.message || "Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cadastroData.senha !== cadastroData.confirmarSenha) {
      toast.error("As senhas não coincidem!");
      return;
    }

    if (cadastroData.senha.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres!");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        cadastroData.email,
        cadastroData.senha
      );

      // Aguardar token ser salvo no localStorage
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('firebase-token', token);

      // TODO: Salvar dados adicionais no banco (nome, celular)
      // Isso deve ser feito via tRPC mutation

      toast.success("Cadastro realizado com sucesso!");
      // Recarregar para atualizar contexto
      window.location.href = "/aluno";
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Este email já está cadastrado!");
      } else {
        toast.error(error.message || "Erro ao criar conta. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado Esquerdo - Informações */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-12 flex-col justify-between text-white">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <GraduationCap className="h-10 w-10" />
            <h1 className="text-3xl font-bold">Órbita Plataforma</h1>
          </div>
          <h2 className="text-4xl font-bold mb-6">
            Sua jornada rumo à aprovação no ENEM começa aqui
          </h2>
          <p className="text-lg text-blue-100 mb-12">
            Gerencie seus estudos, acompanhe seu progresso e alcance seus objetivos com nossa plataforma completa.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-white/10 p-3 rounded-lg">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Cronômetro de Estudos</h3>
              <p className="text-blue-100">Registre e acompanhe cada minuto dedicado aos estudos</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-white/10 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Análise de Desempenho</h3>
              <p className="text-blue-100">Métricas detalhadas por matéria e área de conhecimento</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-white/10 p-3 rounded-lg">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Registro de Simulados</h3>
              <p className="text-blue-100">Acompanhe sua evolução nos simulados do ENEM</p>
            </div>
          </div>
        </div>

        <div className="text-sm text-blue-200">
          © 2024 Órbita Plataforma. Todos os direitos reservados.
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Área do Aluno</CardTitle>
            <CardDescription className="text-center">
              Entre com sua conta ou crie uma nova
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="cadastro">Cadastrar</TabsTrigger>
              </TabsList>

              {/* Tab de Login */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-senha">Senha</Label>
                    <Input
                      id="login-senha"
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
              </TabsContent>

              {/* Tab de Cadastro */}
              <TabsContent value="cadastro">
                <form onSubmit={handleCadastro} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cadastro-nome">Nome Completo</Label>
                    <Input
                      id="cadastro-nome"
                      type="text"
                      placeholder="Seu nome"
                      value={cadastroData.nome}
                      onChange={(e) => setCadastroData({ ...cadastroData, nome: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cadastro-email">Email</Label>
                    <Input
                      id="cadastro-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={cadastroData.email}
                      onChange={(e) => setCadastroData({ ...cadastroData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cadastro-celular">Celular</Label>
                    <Input
                      id="cadastro-celular"
                      type="tel"
                      placeholder="(00) 00000-0000"
                      value={cadastroData.celular}
                      onChange={(e) => setCadastroData({ ...cadastroData, celular: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cadastro-senha">Senha</Label>
                    <Input
                      id="cadastro-senha"
                      type="password"
                      placeholder="••••••••"
                      value={cadastroData.senha}
                      onChange={(e) => setCadastroData({ ...cadastroData, senha: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cadastro-confirmar">Confirmar Senha</Label>
                    <Input
                      id="cadastro-confirmar"
                      type="password"
                      placeholder="••••••••"
                      value={cadastroData.confirmarSenha}
                      onChange={(e) => setCadastroData({ ...cadastroData, confirmarSenha: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Criando conta..." : "Criar Conta"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Acesso restrito para alunos</p>
              <p className="mt-2">
                Mentor ou Gestor?{" "}
                <a href="/login/mentor" className="text-primary hover:underline">
                  Clique aqui
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
