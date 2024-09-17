import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { registerValidationSchema } from "../validationSchema";
import { useRegister } from "./useRegister";
import PasswordInput from "../../../Components/PasswordInput";
import InputError from "../../../Components/InputError";
import SubmitButton from "../../../Components/SubmitButton";

const initialValues = { email: "", phoneNumber: "", password: "" };

const RegisterForm = () => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(registerValidationSchema),
  });
  const { errors, isSubmitting } = formState;
  const onSubmit = useRegister();

  return (
    <div className="mt-4">
      <div className="max-w-[430px] mx-auto my-1 px-3 ">
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
            <PasswordInput {...register("password")} />
            <InputError
              condition={errors.password}
              errorMessage={errors.password?.message}
            />
          </div>

          <SubmitButton isLoading={isSubmitting} styles={"my-3"}>
            {isSubmitting ? "Submitting..." : "Register"}
          </SubmitButton>
        </form>

        <div className="flex justify-center items-center text-sm font-medium gap-1  my-2">
          <span>Already have an Account?</span>
          <Link to="/login" className="text-[#9d4edd]  ">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
