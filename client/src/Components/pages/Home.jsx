import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/authContext"

function Home() {
  const navigate = useNavigate()
  const {user, setUser} = useContext(AuthContext)

  return (
    <main className="flex items-center justify-center h-screen">
      <section className="content text-center">
        <h1 className="lg:text-6xl md:text-4xl text-2xl mb-8">
          HELLO <span className="text-blue-700"> { user?.name || "DEVELOPER" }!</span>
        </h1>
        <p className="w-[70%] mx-auto text-black/80 lg:text-lg md:text-md text-sm">
          Welcome to the Authentication System App! This platform is designed to
          provide secure and reliable access management with a smooth user
          experience. Whether you’re logging in, registering a new account, or
          managing your profile, our system ensures that your information
          remains safe while keeping the process simple and efficient.
        </p>
        <button
          onClick={() => navigate("/view-profile")}
          className="bg-black rounded-lg px-6 py-2 text-white mt-5 cursor-pointer"
          aria-label="View your profile"
        >
          View Profile
        </button>
      </section>
    </main>
  )
}

export default Home
