import React from "react";
import LoginForm from "./LoginForm";
import FormHeader from "../Components/FormHeader";

const Login = () => {
  const title = "Welcome Back";
  const info = "fill in the form to login";

  return (
    <div className="w-full py-8">
      <div className="max-w-[550px] mx-auto ">
        <FormHeader title={title} info={info} />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
