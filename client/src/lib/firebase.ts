import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
