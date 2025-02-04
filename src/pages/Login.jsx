// react router dom
import { Form, Link, useActionData } from "react-router-dom";

//react icons
import { FcGoogle } from "react-icons/fc";

//components
import { FormInput } from "../components";

//USE REGISTER HOOKS
import { useRegister } from "../hooks/useRegister";
import { useLogin } from "../hooks/useLogin";
//react
import { useEffect } from "react";

//action
export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  return {
    email,
    password,
  };
};

function Login() {
  const inputData = useActionData();
  const { loginWithEmail } = useLogin();
  const { registerWithGoogle } = useRegister();

  useEffect(() => {
    if (inputData) {
      loginWithEmail(inputData.email, inputData.password);
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
            Login
          </h1>
          <div className="flex flex-col gap-3 md:gap-5">
            <FormInput placeholder="Email" name="email" type="email" />
            <FormInput placeholder="Password" name="password" type="password" />
          </div>

          <div className="my-5 flex flex-col gap-3 md:my-10 md:flex-row md:gap-5">
            <button className="btn btn-primary btn-sm grow md:btn-md">
              Login
            </button>
            <button
              onClick={registerWithGoogle}
              className="btn btn-secondary btn-sm grow md:btn-md"
            >
              <span>Google</span>
              <FcGoogle className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col justify-between gap-3 md:flex-row md:gap-0">
            <p className="link text-primary">Forget password ?</p>
            <Link to="/register" className="link text-secondary">
              You don't have account yet ?
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
