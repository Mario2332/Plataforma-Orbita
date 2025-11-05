import admin from 'firebase-admin';
import serviceAccount from './firebase-credentials.json';

let firebaseApp: admin.app.App | null = null;

export function getFirebaseAdmin() {
  if (!firebaseApp) {
    try {
      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      });
      console.log('[Firebase Admin] Inicializado com sucesso');
    } catch (error: any) {
      if (error.code === 'app/duplicate-app') {
        firebaseApp = admin.app();
      } else {
        console.error('[Firebase Admin] Erro ao inicializar:', error);
        throw error;
      }
    }
  }
  return firebaseApp;
}

export function getFirestore() {
  const app = getFirebaseAdmin();
  return admin.firestore(app);
}

export function getAuth() {
  const app = getFirebaseAdmin();
  return admin.auth(app);
}
