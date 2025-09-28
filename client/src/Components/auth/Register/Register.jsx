import { useState } from "react";
import { IoPersonCircle, IoMail, IoLockClosed, IoEye, IoEyeOff } from "react-icons/io5";
import "../Form.css";
import { useNavigate } from "react-router-dom";

function Register({
  error,
  setError,
  formDetails,
  handleChange,
  handleSubmit,
  isTermAccepted,
  setIsTermAccepted,
}) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  function handleBlur(e) {
    const { name, value } = e.target;
    if (value.trim() === "") {
      const Label = name.charAt(0).toUpperCase() + name.slice(1);
      setError((prev) => ({ ...prev, [name]: `${Label} is required` }));
    }
  }

  return (
    <div className="mainRegister px-4 sm:px-8 md:px-16 lg:px-32 h-screen flex justify-center items-center">
      <div className="registerDivCard flex flex-col gap-4 p-6 sm:p-10 rounded-2xl w-full sm:w-[80%] md:w-[60%] lg:w-[40%] border-sky-100 shadow-2xl">
        <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl pb-6 font-bold">
          Register
        </h1>

        {/* Name */}
        <div className="row1">
          <div className="inner1 flex gap-3 items-center">
            <IoPersonCircle size={24} />
            <input
              className="input flex-1"
              onChange={handleChange}
              onBlur={handleBlur}
              value={formDetails.name}
              type="text"
              required
              name="name"
              placeholder="User Name"
              aria-label="User Name"
            />
          </div>
          <span
            className={`text-sm text-[red] w-full pl-10 ${
              error.name ? "visible" : "invisible"
            }`}
          >
            {error.name}
          </span>
        </div>

        {/* Email */}
        <div className="row3">
          <div className="inner3 flex gap-3 items-center">
            <IoMail size={24} />
            <input
              className="input flex-1"
              onBlur={handleBlur}
              onChange={handleChange}
              value={formDetails.email}
              type="text"
              required
              name="email"
              placeholder="Email"
              aria-label="Email"
            />
          </div>
          <span
            className={`text-sm text-[red] w-full pl-10 ${
              error.email ? "visible" : "invisible"
            }`}
          >
            {error.email}
          </span>
        </div>

        {/* Password with eye toggle */}
        <div className="row4">
          <div className="innerRow4 flex gap-3 items-center relative">
            <IoLockClosed size={24} />
            <input
              className="input flex-1 pr-10"
              onBlur={handleBlur}
              onChange={handleChange}
              value={formDetails.password}
              type={showPassword ? "text" : "password"}
              required
              name="password"
              placeholder="Password"
              aria-label="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 text-gray-600 hover:text-black"
            >
              {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </button>
          </div>
          <span
            className={`text-sm text-[red] w-full pl-10 ${
              error.password ? "visible" : "invisible"
            }`}
          >
            {error.password}
          </span>
        </div>

        {/* Terms */}
        <div className="row5">
          <label
            htmlFor="terms"
            className="cursor-pointer font-medium flex gap-2 items-center pl-2 text-sm sm:text-md"
          >
            <input
              className="size-4 cursor-pointer"
              onChange={() => setIsTermAccepted((prev) => !prev)}
              type="checkbox"
              id="terms"
              name="terms"
              checked={isTermAccepted}
            />
            I Agree to the{" "}
            <a href="#" className="text-blue-600">
              Terms & Conditions
            </a>
          </label>
        </div>

        {/* Register Button */}
        <div className="row4Button flex justify-center mt-4">
          <button
            className="btn w-full sm:w-auto bg-gradient-to-r from-blue-600 via-blue-300 to-blue-200 shadow-xl px-6 py-2 rounded-lg"
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>

        {/* Already have account */}
        <div className="row7 flex justify-center mt-4">
          <p className="text-sm sm:text-base font-medium">
            Already have an Account ?{" "}
            <span
              onClick={() => navigate("/auth/login")}
              className="underline underline-offset-4 cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
