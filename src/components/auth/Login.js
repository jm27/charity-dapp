import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../common/Wrapper";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (!user) {
      alert("Invalid credentials");
      return;
    }
    const dashboardPath =
      user.role === "charity" ? "/charity-dashboard" : "/donor-dashboard";
    navigate(dashboardPath);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  return (
    <Wrapper>
      <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
        Welcome back! Let’s get back to creating positive impact.
      </h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>
    </Wrapper>
  );
};

export default Login;
