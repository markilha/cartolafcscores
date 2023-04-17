import { useState, createContext } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {toast} from 'react-toastify'
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user,setUser]= useState(false);
  const [logged,setLogged]= useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  function SignIn(email,senha){    

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {       
        const user = {
          email: userCredential.user.email,
          id: userCredential.user.uid,
        };
        setLogged(true)
        localStorage.setItem("cartUser", JSON.stringify(user));
        toast.success("Logado com sucesso!");

      })
      .catch((error) => {
        setLogged(false)
        toast.error(error.message);
      });
      setLoadingAuth(false)

  }

  return (
    <AuthContext.Provider
      value={{
       user,
       setUser,
       SignIn,
       logged,
       loadingAuth,
       setLoadingAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
