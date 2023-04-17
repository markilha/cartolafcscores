import { useState, createContext,useEffect} from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoverUser = localStorage.getItem('cartUser');
    if (recoverUser) {
      const dat = JSON.parse(recoverUser);      
      setUser(dat);
    }
    // RetornaVersion();
    setLoading(false);
  }, []);


 async function SignIn(email, senha) {
    const auth = getAuth();

   await signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = {
          email: userCredential.user.email,
          id: userCredential.user.uid,
        };
    
        localStorage.setItem("cartUser", JSON.stringify(user));
        toast.success("Logado com sucesso!");
      })
      .catch((error) => {
      
        toast.error(error.message);
      })
      .finally(() => {
    
      });
  }

  async function logout() {
    localStorage.removeItem('cartUser');
  }



  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        SignIn,
        loading,
        signed: !!user,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
