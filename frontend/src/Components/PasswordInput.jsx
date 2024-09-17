import React, { forwardRef, useState } from "react";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

const PasswordInput = forwardRef((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative ">
      <input {...props} ref={ref} type={showPassword ? "text" : "password"} />
      <button
        onClick={togglePassword}
        type="button"
        className="absolute right-2 top-[50%] -translate-y-[50%] transition-all text-2xl font-bold text-white/80"
      >
        {showPassword ? <VscEyeClosed /> : <VscEye />}
      </button>
    </div>
  );
});

export default PasswordInput;
