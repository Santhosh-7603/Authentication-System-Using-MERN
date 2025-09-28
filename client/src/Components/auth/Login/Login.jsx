import { useState } from "react";
import { IoPersonCircle, IoLockClosed, IoEye, IoEyeOff } from "react-icons/io5";
import "../Form.css";
import { useNavigate } from "react-router-dom";

function Login({ handleChange, details, submissionValidation, error }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="main px-4 sm:px-8 md:px-16 lg:px-32 h-screen flex justify-center items-center">
      <div className="card flex flex-col gap-4 p-6 sm:p-10 rounded-2xl w-full sm:w-[80%] md:w-[60%] lg:w-[40%] border-sky-100 shadow-2xl">
        <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold">
          Login
        </h1>

        {/* Username */}
        <div className="row1">
          <div className="inner1 flex gap-3 items-center">
            <IoPersonCircle size={28} />
            <input
              className="input flex-1"
              onChange={handleChange}
              value={details.email}
              type="text"
              required
              name="email"
              placeholder="Email"
            />
          </div>
          <span
            className={`text-sm text-red-500 w-full pl-10 ${
              error.email ? "visible" : "invisible"
            }`}
          >
            {error.email}
          </span>
        </div>

        {/* Password with eye toggle */}
        <div className="row2">
          <div className="innerRow4 flex gap-3 items-center relative">
            <IoLockClosed size={28} />
            <input
              className="input flex-1 pr-10"
              onChange={handleChange}
              value={details.password}
              type={showPassword ? "text" : "password"}
              required
              name="password"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 text-gray-600 hover:text-black"
            >
              {showPassword ? <IoEyeOff size={22} /> : <IoEye size={22} />}
            </button>
          </div>
          <span
            className={`text-sm text-red-500 w-full pl-10 ${
              error.password ? "visible" : "invisible"
            }`}
          >
            {error.password}
          </span>
        </div>

        {/* Forgot password */}
        <div className="row3 flex justify-end">
          <button
            onClick={() => navigate("/auth/forgot-password")}
            className="text-blue-500 cursor-pointer text-sm hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {/* Login button */}
        <div className="row4Button flex justify-center mt-4">
          <button
            className="btn w-full sm:w-auto bg-gradient-to-r from-blue-600 via-blue-300 to-blue-200 shadow-xl px-6 py-2 rounded-lg"
            onClick={submissionValidation}
          >
            Login
          </button>
        </div>

        {/* Register redirect */}
        <div className="row7 flex justify-start mt-4">
          <p className="text-[16px] font-medium">
            New User?{" "}
            <span
              onClick={() => navigate("/auth/register")}
              className="underline underline-offset-4 cursor-pointer"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
