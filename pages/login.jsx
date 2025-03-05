import { useState } from "react";
import { useLogin } from "@/components/Context/AuthContext";

function Login() {
  const { login } = useLogin(); // Get the login function from the context
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(username, password);
    setLoading(false);
  };

  return (
    <div className="flex items-center mt-28  justify-center ">
      <div className=" max-w-2xl p-5 lg:p-24 mb-5 bg-white rounded-2xl shadow-lg shadow-indigo-400/50">
        <form onSubmit={handleLogin}>
          <div className="mb-8">
            <label
              htmlFor="username"
              className="block text-gray-800 font-bold text-lg sm:text-xl"
            >
              Username:
            </label>
            <input
              type="text"
              name="username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full border-2 border-gray-300 py-3 px-4 rounded-xl mt-2 outline-none text-lg focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-gray-800 font-bold text-lg sm:text-xl"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border-2 border-gray-300 py-3 px-4 rounded-xl mt-2 outline-none text-lg focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          <button className="w-full py-3 px-6 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all ease-in-out duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-600">
  {loading ? "Logging in..." : "Login"}
</button>

        </form>
      </div>
    </div>
  );
}

export default Login;
