import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

//gloabal context
import { useGlobalContext } from "./useGlobalContext";

//toast
import { toast } from "react-toastify";

export function useLogin() {
  const { dispatch } = useGlobalContext();
  const loginWithEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        toast.success(`Welcome ${user.displayName}`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return { loginWithEmail };
}

export default useLogin;
