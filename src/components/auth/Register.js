import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserInBlockchain } from "../../utils/stellarSDK/stellarSDK";
import useSubmitForm from "../../hooks/useSubmitForm";
import Wrapper from "../common/Wrapper";

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
    <Wrapper>
      <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
        Become part of a community dedicated to making a real-world impact!
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
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
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="donor">Donor</option>
          <option value="charity">Charity</option>
        </select>
        <p className="text-gray-700">
          "Already have a public key? Add it here to link it to your account:"
        </p>
        <input
          type="text"
          placeholder="Public Key"
          value={inputPublicKey}
          onChange={(e) => setInputPublicKey(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {isLoading ? (
          <button
            disabled
            className="w-full bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed"
          >
            Loading...
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            {inputPublicKey ? "Register" : "Register & Create Stellar Account"}
          </button>
        )}
      </form>
    </Wrapper>
  );
}

export default Register;
