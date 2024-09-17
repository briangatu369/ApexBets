import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { loginValidationSchema } from "../validationSchema";
import PasswordInput from "../../../Components/PasswordInput";
import InputError from "../../../Components/InputError";
import { useLogin } from "./useLogin";
import SubmitButton from "../../../Components/SubmitButton";

const LoginForm = () => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginValidationSchema),
  });
  const { errors, isSubmitting } = formState;
  const onSubmit = useLogin();

  return (
    <div className="mt-4">
      <div className="max-w-[430px] mx-auto my-2 px-3 ">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h4 className="mb-[3px] text-white/90 text-sm">Email</h4>
            <input
              {...register("email")}
              type="text"
              placeholder="e.g. brianwgatundu@gmail.com"
            />
            <InputError
              condition={errors.email}
              errorMessage={errors.email?.message}
            />
          </div>
          <div>
            <h4 className="mb-[3px] text-white/90 text-sm">Password</h4>
            <div className="relative ">
              <PasswordInput {...register("password")} />
              <InputError
                condition={errors.password}
                errorMessage={errors.password?.message}
              />
            </div>
          </div>
          <SubmitButton isLoading={isSubmitting} styles={"my-3"}>
            {isSubmitting ? "Submitting..." : "Login"}
          </SubmitButton>
        </form>

        <div className="flex justify-center items-center text-sm font-medium gap-1  my-2">
          <span>Don't have an Account?</span>
          <Link to="/register" className="text-[#9d4edd]  ">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
