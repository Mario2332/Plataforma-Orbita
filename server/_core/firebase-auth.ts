import { Request } from 'express';
import { getAuth, getFirestore } from '../firebase-admin';

export interface FirebaseUser {
  id: number;
  openId: string;
  name: string | null;
  email: string | null;
  loginMethod: string | null;
  role: 'gestor' | 'mentor' | 'aluno';
  createdAt: Date;
  updatedAt: Date;
  lastSignedIn: Date;
}

/**
 * Autentica requisição usando token Firebase
 * Extrai o token do header Authorization: Bearer <token>
 * Verifica o token com Firebase Admin SDK e retorna o usuário do Firestore
 */
export async function authenticateFirebaseRequest(req: Request): Promise<FirebaseUser | null> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    
    // Verificar token com Firebase Admin SDK
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);
    
    if (!decodedToken.uid) {
      return null;
    }

    // Buscar usuário no Firestore
    const firestore = getFirestore();
    const userDoc = await firestore.collection('users').doc(decodedToken.uid).get();
    
    if (!userDoc.exists) {
      // Criar novo usuário no Firestore
      const newUser: Omit<FirebaseUser, 'id'> = {
        openId: decodedToken.uid,
        name: decodedToken.name || decodedToken.email?.split('@')[0] || null,
        email: decodedToken.email || null,
        loginMethod: 'firebase',
        role: (decodedToken.role as 'gestor' | 'mentor' | 'aluno') || 'aluno',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      };
      
      await firestore.collection('users').doc(decodedToken.uid).set(newUser);
      
      return {
        ...newUser,
        id: 0, // Firestore não usa IDs numéricos
      };
    }
    
    // Atualizar lastSignedIn
    await firestore.collection('users').doc(decodedToken.uid).update({
      lastSignedIn: new Date(),
    });
    
    const userData = userDoc.data() as Omit<FirebaseUser, 'id'>;
    return {
      ...userData,
      id: 0,
      createdAt: userData.createdAt instanceof Date ? userData.createdAt : (userData.createdAt as any).toDate(),
      updatedAt: userData.updatedAt instanceof Date ? userData.updatedAt : (userData.updatedAt as any).toDate(),
      lastSignedIn: new Date(),
    };
  } catch (error) {
    console.error('[Firebase Auth] Erro ao autenticar:', error);
    return null;
  }
}
