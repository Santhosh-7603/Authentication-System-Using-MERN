import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function ViewProfile() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate()
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col gap-8 justify-center items-center h-screen ">
        <button 
      onClick={()=>{
        navigate('/')  
      }}
      className="bg-blue-600 text-white rounded-full cursor-pointer px-5 py-2 "
      >
        Back to Home
      </button>
        <p>You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-screen">
      <button 
      onClick={()=>{
        navigate('/')  
      }}
      className="bg-blue-600 text-white px-5 py-2 rounded-full order-1 cursor-pointer"
      >
        Back to Home
      </button>
      <div className="p-6 shadow-xl rounded-2xl border w-[90%] sm:w-[60%] md:w-[40%]">
        <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
}

export default ViewProfile;
