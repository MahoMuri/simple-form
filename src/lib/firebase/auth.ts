import { deleteCookie, setCookie } from "cookies-next";
import { FirebaseError } from "firebase/app";
import {
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  NextOrObserver,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import { auth } from "./client";

interface SignUpParams {
  email: string;
  password: string;
}

export async function signUp({ email, password }: SignUpParams) {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredentials.user;
  } catch (error) {
    console.log(error);
  }
}

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(cb: NextOrObserver<User>) {
  return _onIdTokenChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signIn({ email, password }: SignUpParams): Promise<{
  user: User | null;
  error: FirebaseError | null;
}> {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const idToken = await userCredentials.user.getIdToken();

    await setCookie("__session", idToken);

    return {
      user: userCredentials.user,
      error: null,
    };
  } catch (error) {
    return {
      user: null,
      error: error as FirebaseError,
    };
  }
}

export async function signOut() {
  try {
    await auth.signOut();

    await deleteCookie("__session");

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}
