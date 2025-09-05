import { FirebaseApp, FirebaseError, initializeServerApp } from "firebase/app";
import { getAuth, User } from "firebase/auth";
import { cookies } from "next/headers";
import { firebaseApp } from "./client";

export async function getAuthenticatedAppForUser() {
  const authIdToken = (await cookies()).get("__session")?.value;

  let firebaseServerApp: FirebaseApp | null = null;
  let currentUser: User | null = null;
  try {
    firebaseServerApp = initializeServerApp(firebaseApp, {
      authIdToken,
    });

    const auth = getAuth(firebaseServerApp);
    await auth.authStateReady();
    currentUser = auth.currentUser;
  } catch (error: unknown) {
    if ((error as FirebaseError).code.includes("invalid-user-token")) {
      return {
        firebaseServerApp: null,
        currentUser: null,
        error: (error as FirebaseError).code,
      };
    }
  }

  return { firebaseServerApp, currentUser };
}
