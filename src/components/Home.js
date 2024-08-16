import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <h1>Welcome to Stellar Decentralized Donations!</h1>
        <p>
          Empowering change, one donation at a time. Whether you’re here to give
          or to receive, our platform makes it simple, transaparent, and secure.
          Join our community by logging in or registering today!
        </p>
      </div>
      <div>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Register</button>
      </div>
    </div>
  );
};

export default Home;
