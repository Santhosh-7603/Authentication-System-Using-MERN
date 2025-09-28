import Login from "./Login";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../helpers/axiosInstance";
import { toast } from "react-toastify";

function LoginValidation() {
  const [error, setError] = useState({ email: "", password: "" });
  const [details, setDetails] = useState({ email: "", password: "" });

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  }

  async function submissionValidation() {
    try {
      if (!details.email || !details.password) {
        setError({
          email: details.email ? "" : "Email is required",
          password: details.password ? "" : "Password is required",
        });
        return toast.error("Please fill all fields");
      }

      const res = await axiosInstance.post("/auth/login", details);

      // ✅ If backend sends user info directly
      if (res.data?.user) {
        setUser(res.data.user);
      } else {
        // ✅ Otherwise fetch profile from /auth/me
        const profile = await axiosInstance.get("/auth/me");
        setUser(profile.data.user);
      }

      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    }
  }

  return (
    <Login
      handleChange={handleChange}
      details={details}
      error={error}
      submissionValidation={submissionValidation}
    />
  );
}

export default LoginValidation;
