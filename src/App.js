import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import DonorDashboard from "./components/dashboard/donor/DonorDashboard";
import CharityDashboard from "./components/dashboard/charity/CharityDashboard";
import PrivateRoute from "./components/auth/PrivateRoute";
import CharityProfile from "./components/dashboard/charity/CharityProfile";
import "./App.css";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/donor-dashboard"
          element={
            <PrivateRoute>
              <DonorDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/charity-dashboard"
          element={
            <PrivateRoute>
              <CharityDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/charity-profile" element={<CharityProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
