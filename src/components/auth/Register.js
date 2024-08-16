import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserInBlockchain } from "../../utils/stellarSDK/stellarSDK";
import useSubmitForm from "../../hooks/useSubmitForm";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputPublicKey, setInputPublicKey] = useState("");
  const [role, setRole] = useState("donor"); // or charity

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

  const handleRegister = async () => {
    if (inputPublicKey) {
      registerUserInLocal(inputPublicKey);
    } else {
      let [keyPair] = await registerUserInBlockchain();
      alert(`Registered successfully! 
        Your public key is ${keyPair.publicKey()}
        Private key is ${keyPair.secret()}.
        Please save these keys for future use.
        Private key is not stored anywhere and cannot be recovered!`);
      registerUserInLocal(keyPair.publicKey());
    }
    // Redirect to login page
    navigate("/login");
  };

  const { isLoading, handleSubmit } = useSubmitForm(handleRegister);

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
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
        {isLoading ? (
          <button disabled>Loading...</button>
        ) : (
          <button type="submit">
            {inputPublicKey ? "Register" : "Register & Create Stellar Account"}
          </button>
        )}
      </form>
    </div>
  );
}

export default Register;
