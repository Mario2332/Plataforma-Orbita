import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCZt2o9SaW7IcbomUq-Cpl3w-2nbJOYGHY",
  authDomain: "plataforma-teste-manus.firebaseapp.com",
  projectId: "plataforma-teste-manus",
  storageBucket: "plataforma-teste-manus.firebasestorage.app",
  messagingSenderId: "968650138349",
  appId: "1:968650138349:web:cef58c26fc9cdfd0dfa2e4",
  measurementId: "G-JZSSNV4Z3C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Analytics (only in browser)
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
export default app;

// Função para obter o token atual do usuário
export async function getFirebaseToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  try {
    return await user.getIdToken();
  } catch (error) {
    console.error('Erro ao obter token Firebase:', error);
    return null;
  }
}

// Listener para mudanças no estado de autenticação
if (typeof window !== 'undefined') {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Usuário logado - armazenar token
      const token = await user.getIdToken();
      localStorage.setItem('firebase-token', token);
      
      // Armazenar informações do usuário
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
      localStorage.setItem('firebase-user', JSON.stringify(userData));
    } else {
      // Usuário deslogado - limpar dados
      localStorage.removeItem('firebase-token');
      localStorage.removeItem('firebase-user');
    }
  });
}
