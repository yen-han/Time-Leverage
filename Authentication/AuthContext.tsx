import { createContext, useEffect, useState, useContext } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<{
    email: string | null;
    uid: string | null;
  }>({ email: null, uid: null });
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {});
    if (user) {
      setUser({
        email: user.email,
        uid: user.uid,
      });
    } else {
      setUser({ email: null, uid: null });
    }
    return () => unsubscribe();
  }, []);

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password);
    setUser({ email: email, uid: password });
  };

  const logOut = async () => {
    setUser({ email: null, uid: null });
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
