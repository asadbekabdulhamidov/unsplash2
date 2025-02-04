//firebase auth
import { auth } from "../firebase/firebaseConfig";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

//toast
import { toast } from "react-toastify";

//use global context
import { useGlobalContext } from "./useGlobalContext";

export const useRegister = () => {
  const { dispatch } = useGlobalContext();
  const registerWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        dispatch({ type: "LOGIN", payload: user });
        toast(`Welcome ${user.displayName}`);
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast(errorMessage);
      });
  };

  const registerWithEmail = async (displayName, email, password) => {
    console.log(displayName, email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: `https://api.dicebear.com/9.x/initials/svg?seed=${displayName}`,
        });
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        toast.success(`Welcome ${user.displayName}`);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);

        toast.error("Email or password is not incorrect");
      });
  };

  return { registerWithGoogle, registerWithEmail };
};
