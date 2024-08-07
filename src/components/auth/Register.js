import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserInBlockchain } from "../../utils/stellarSDK/stellarSDK";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputPublicKey, setInputPublicKey] = useState("");
  const [role, setRole] = useState("donor"); // or charity

  const handleRegister = async (e) => {
    e.preventDefault();
    if (inputPublicKey) {
      registerUserInLocal(inputPublicKey);
    } else {
      let [publicKey] = await registerUserInBlockchain();
      registerUserInLocal(publicKey);
    }
    // Redirect to login page
    navigate("/login");
  };

  const registerUserInLocal = (publicKey) => {
    // Validation for name, email, password
    if (!name || !email || !password) {
      alert("Please fill all the fields");
      return;
    }
    // Add your register logic here
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newUser = { name, email, password, role, publicKey };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="donor">Donor</option>
          <option value="charity">Charity</option>
        </select>
        <p>
          If you have a public key, enter it here to link it to your account:
        </p>
        <input
          type="text"
          placeholder="Public Key"
          value={inputPublicKey}
          onChange={(e) => setInputPublicKey(e.target.value)}
        />
        <button type="submit">
          {inputPublicKey ? "Register" : "Register & Create Stellar Account"}
        </button>
      </form>
    </div>
  );
}

export default Register;
