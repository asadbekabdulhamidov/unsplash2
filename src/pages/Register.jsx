// react router dom
import { Form, Link, useActionData } from "react-router-dom";

//react icons
import { FcGoogle } from "react-icons/fc";

//components
import { FormInput } from "../components";

//import register hooks
import { useRegister } from "../hooks/useRegister";
import { toast } from "react-toastify";

import { useEffect } from "react";

//action
export const action = async ({ request }) => {
  const form = await request.formData();
  const displayName = form.get("displayName");
  const email = form.get("email");
  const password = form.get("password");
  const confirmPassword = form.get("confirm password");

  if (password === confirmPassword) {
    return {
      displayName,
      email,
      password,
      confirmPassword,
    };
  } else {
    toast.warn("password  is not equal !");
    return null;
  }
};

function Register() {
  const inputData = useActionData();
  const { registerWithGoogle, registerWithEmail } = useRegister();

  useEffect(() => {
    if (inputData) {
      registerWithEmail(
        inputData.displayName,
        inputData.email,
        inputData.password,
      );
    }
  }, [inputData]);

  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden w-[40%] bg-[url(https://picsum.photos/900/1200)] bg-cover bg-center bg-no-repeat md:block"></div>

      <div className="fixed bottom-0 left-0 right-0 top-0 z-10 w-full bg-black bg-opacity-30 md:hidden"></div>

      <div className="flex w-full items-center justify-center bg-[url(https://picsum.photos/900/1200)] bg-cover bg-center bg-no-repeat md:w-[60%] md:bg-none">
        <Form
          method="post"
          className="relative z-50 mx-auto w-full max-w-96 px-5 md:px-0"
        >
          <h1 className="mb-5 text-center text-3xl font-medium text-primary md:text-4xl md:text-secondary">
            Register
          </h1>
          <div className="flex flex-col gap-3 md:gap-5">
            <FormInput placeholder="Full Name" name="displayName" type="text" />
            <FormInput placeholder="Email" name="email" type="email" />
            <FormInput placeholder="Password" name="password" type="password" />
            <FormInput
              placeholder="Confirm Password"
              name="confirm password"
              type="password"
            />
          </div>

          <div className="my-5 flex flex-col gap-3 md:my-10 md:flex-row md:gap-5">
            <button
              type="submit"
              className="btn btn-primary btn-sm grow md:btn-md"
            >
              Register
            </button>
            <button
              onClick={registerWithGoogle}
              type="button"
              className="btn btn-secondary btn-sm grow md:btn-md"
            >
              <span>Google</span>
              <FcGoogle className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col justify-between gap-3 md:flex-row md:gap-0">
            <Link to="/login" className="link text-secondary">
              You allready have account !
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
