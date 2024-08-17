import { useNavigate } from "react-router-dom";
import Wrapper from "./common/Wrapper";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <h1 className="text-3xl font-bold text-blue-500 mb-4 text-center">
        Welcome to Stellar Decentralized Donations!
      </h1>
      <p className="text-gray-700 mb-6 text-center">
        Empowering change, one donation at a time. Whether you’re here to give
        or to receive, our platform makes it simple, transparent, and secure.
        Join our community today!
      </p>
      <div className="flex justify-around">
        <button
          className="bg-blue-500 text-white mr-2 py-2 px-4 rounded hover:bg-blue-600 transition duration-300 w-full max-w-xs"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 w-full max-w-xs"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </Wrapper>
  );
};

export default Home;
