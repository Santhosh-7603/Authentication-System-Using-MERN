import { useNavigate } from "react-router-dom";
import axiosInstance from "../../helpers/axiosInstance";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import {AuthContext} from "../context/authContext";

function VerifyOtp() {
  const email = localStorage.getItem("emailForOtp");
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    toast.success("OTP sent to your email");
  }, []);

  async function handleSubmit() {
    try {
      if (!otp.trim()) return toast.error("Oops! OTP can't be empty");

      const res = await axiosInstance.post("/auth/verify-otp", {
        otp: otp.toString(), // 🔥 always send string
        email,
      });

      if (res.status === 200) {
        toast.success("OTP Verified Successfully!");
        setUser(res.data.user);
        localStorage.removeItem("emailForOtp"); // 🔥 cleanup
        navigate("/");
      }
    } catch (err) {
      toast.error(
        `Something Went Wrong: ${err.response?.data?.message || err.message}`
      );
    }
  }

  return (
    <div className="main px-4 sm:px-8 md:px-16 lg:px-32 h-screen flex justify-center items-center">
      <div className="card flex flex-col gap-6 p-6 sm:p-10 rounded-2xl w-full sm:w-[80%] md:w-[60%] lg:w-[40%] border-sky-100 shadow-2xl">
        <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold">
          Enter OTP
        </h1>

        <div className="row1">
          <div className="inner1 flex gap-3 items-center">
            <div className="img w-14 sm:w-16">
              <img
                src="/otp.png"
                alt="OTP"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              className="input text-xl sm:text-2xl flex-1"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              autoFocus
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              name="otp"
              placeholder="123456"
            />
          </div>
        </div>

        <div className="row4Button flex justify-center mt-4">
          <button
            onClick={handleSubmit}
            className="btn w-full sm:w-auto bg-gradient-to-r from-blue-600 via-blue-300 to-blue-200 shadow-xl px-6 py-2 rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
