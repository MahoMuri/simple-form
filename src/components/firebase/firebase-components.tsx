"use client";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  AuthProvider,
  FirestoreProvider,
  StorageProvider,
  useFirebaseApp,
} from "reactfire";

export function FirebaseComponents({
  children,
}: {
  children: React.ReactNode;
}) {
  const app = useFirebaseApp();

  const auth = getAuth(app);
  const storage = getStorage(app);
  const firestore = getFirestore(app);
  return (
    <AuthProvider sdk={auth}>
      <StorageProvider sdk={storage}>
        <FirestoreProvider sdk={firestore}>{children}</FirestoreProvider>
      </StorageProvider>
    </AuthProvider>
  );
}
