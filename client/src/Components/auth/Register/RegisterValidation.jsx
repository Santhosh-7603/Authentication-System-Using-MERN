import { useState, useContext } from "react";
import Register from "./Register";
import axiosInstance from "../../../helpers/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";

function RegisterValidation() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [error, setError] = useState({ name: "", email: "", password: "" });
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isTermAccepted, setIsTermAccepted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    const updatedFormDetails = { ...formDetails, [name]: value };
    const formValidationResult = formValidation(name, value);
    setError((prev) => ({ ...prev, [name]: formValidationResult }));
    setFormDetails(updatedFormDetails);
  }

  function formValidation(name, value) {
    switch (name) {
      case "name":
        return isValidName(value);
      case "email":
        return isValidMail(value);
      case "password":
        return isValidPassword(value);
      default:
        return "";
    }
  }

  function submitValidation(formDetails) {
    let newErrors = {};
    Object.entries(formDetails).forEach(([key, value]) => {
      if (!value.trim()) {
        const fieldLabel = key.charAt(0).toUpperCase() + key.slice(1);
        newErrors[key] = `${fieldLabel} is required`;
      } else {
        const fieldError = formValidation(key, value);
        if (fieldError) newErrors[key] = fieldError;
      }
    });
    setError(newErrors);
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = submitValidation(formDetails);
    let hasError = Object.values(newErrors).some((e) => e.trim().length > 0);

    if (!hasError) {
      try {
        const res = await axiosInstance.post("/auth/register", formDetails);

        // Store email for OTP if needed
        localStorage.setItem("emailForOtp", formDetails.email);

        toast.success("Registration successful, verify OTP!");

        // If backend sends user after register (without OTP)
        if (res.data?.user) {
          setUser(res.data.user);
          navigate("/");
        } else {
          // Otherwise go verify OTP
          navigate("/auth/verify-otp");
        }

        setFormDetails({ name: "", email: "", password: "" });
      } catch (err) {
        toast.error(err.response?.data?.message || "Registration Failed");
      }
    } else {
      toast.error("Oops..! Invalid Inputs");
    }
  }

  // 🔹 Validation helpers
  function isValidName(value) {
    if (value.trim() === "") return "Username is required!";
    if (!/^[a-zA-Z0-9._]+$/.test(value))
      return "Only letters, numbers, '_' and '.' allowed.";
    if (!/^.{3,30}$/.test(value)) return "Must be 3–30 characters long.";
    if (!/[a-zA-Z]/.test(value)) return "Must contain at least one letter.";
    if (/^\.|\.$/.test(value)) return "Cannot start or end with '.'";
    if (/\.\./.test(value)) return "No consecutive '.' allowed.";
    return "";
  }

  function isValidMail(value) {
    if (value.trim() === "") return "Email is required!";
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
      return "Enter valid Email";
    return "";
  }

  function isValidPassword(value) {
    if (value.trim() === "") return "Password is required!";
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        value
      )
    )
      return "Weak Password";
    return "";
  }

  return (
    <Register
      error={error}
      setError={setError}
      formDetails={formDetails}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isTermAccepted={isTermAccepted}
      setIsTermAccepted={setIsTermAccepted}
    />
  );
}

export default RegisterValidation;
