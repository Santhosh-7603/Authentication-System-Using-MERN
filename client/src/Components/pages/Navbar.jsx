import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react" // nice icons for hamburger
import { AuthContext } from "../context/authContext"
import axiosInstance from "../../helpers/axiosInstance"

function Navbar() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const {user, setUser} = useContext(AuthContext)

  async function handleLogout(){
    try{

      const res = await axiosInstance.post('/auth/logout')
      setUser(null)
      toast.success("User Loggedout Successfully");
      navigate('/')
    }
    catch(err){
      console.log("errorrr nav : ", err.message);
      
    }
  }

  return (
    <nav className="bg-transparent backdrop-blur-2xl px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div
          className="logo text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Auth <span className="text-blue-700">App</span>
        </div>

        {/* Desktop Menu */}
        {

          !user ? 
          <div className="hidden sm:flex gap-6">
          <button
            onClick={() => navigate("/auth/login")}
            className="px-6 py-2 text-white rounded-lg bg-blue-700 cursor-pointer border-2 border-transparent hover:bg-transparent hover:text-black hover:border-blue-700 transition"
            >
            Login
          </button>
          <button
            onClick={() => navigate("/auth/register")}
            className="px-6 py-2 rounded-lg border-2 border-blue-700 cursor-pointer hover:bg-blue-700 hover:text-white hover:border-transparent transition"
            >
            Register
          </button>
        </div>
        : 
        <div className="hidden sm:flex gap-6">
          <button
            onClick={() => handleLogout()}
            className="px-6 py-2 text-white rounded-lg bg-blue-700 cursor-pointer border-2 border-transparent hover:bg-transparent hover:text-black hover:border-blue-700 transition"
            >
            Logout
          </button>
        </div>
          }

        {/* Mobile Hamburger */}
        <div className="sm:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      
      {isOpen && !user ? (
        <div className="sm:hidden mt-4 flex flex-col gap-4">
          <button
            onClick={() => {
              navigate("/auth/login")
              setIsOpen(false)
            }}
            className="px-6 py-2 text-white rounded-lg bg-blue-700 cursor-pointer border-2 border-transparent hover:bg-transparent hover:text-black hover:border-blue-700 transition"
          >
            Login
          </button>
          <button
            onClick={() => {
              navigate("/auth/register")
              setIsOpen(false)
            }}
            className="px-6 py-2 rounded-lg border-2 border-blue-700 cursor-pointer hover:bg-blue-700 hover:text-white hover:border-transparent transition"
          >
            Register
          </button>
        </div>
      ):
        <div className="sm:hidden mt-4 flex flex-col gap-4">
          <button
            onClick={() => {
              handleLogout()
              setIsOpen(false)
            }}
            className="px-6 py-2 text-white rounded-lg bg-blue-700 cursor-pointer border-2 border-transparent hover:bg-transparent hover:text-black hover:border-blue-700 transition"
          >
            Logout
          </button>
        </div>
      }
    </nav>
  )
}

export default Navbar
