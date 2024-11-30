import { useState } from "react";
import { useRouter } from "next/router"; // Use this for redirecting

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const router = useRouter(); // For routing after successful login

  const handleLogin = async (e) => {
    e.preventDefault();

    const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    console.log(ADMIN_USERNAME, ADMIN_PASSWORD);

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setMessage("Login successful!");
      
      // Store the login status in localStorage
      localStorage.setItem("isLoggedIn", "true");

      // Redirect to the add actualite page or a protected route
      router.push("/ajouterActualite"); // Or wherever your add actualite page is
    } else {
      setMessage("Invalid username or password.");
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className="max-w-xl w-full px-8 py-8 bg-white rounded shadow-xl">
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-gray-800 font-bold">Username:</label>
            <input
              type="text"
              name="username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-800 font-bold">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
            />
          </div>
          <button className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">Login</button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
