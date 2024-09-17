import FormHeader from "../Components/FormHeader";
import RegisterForm from "./RegisterForm";

const Register = () => {
  const title = "Create your account";
  const info = " Welcome! fill in the form to get started";

  return (
    <div className="w-full py-8">
      <div className="max-w-[550px] mx-auto ">
        <FormHeader title={title} info={info} />
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
