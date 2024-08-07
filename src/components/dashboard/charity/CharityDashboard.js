import { useState, useEffect } from "react";
import { fetchDonationHistory } from "../../../utils/stellarSDK/stellarSDK";
import DonationsList from "../common/DonationsList";
import { Link } from "react-router-dom";

const CharityDashboard = () => {
  const [charityPublicKey, setCharityPublicKey] = useState("");
  const [donationHistory, setDonationHistory] = useState([]);

  useEffect(() => {
    if (!charityPublicKey) return;
    const donations = fetchDonationHistory(charityPublicKey);
    setDonationHistory(donations);
  }, [charityPublicKey]);

  return (
    <div>
      <h1>Charity Dashboard</h1>
      <div>
        <label>Charity Public Key:</label>
        <input
          type="text"
          value={charityPublicKey}
          onChange={(e) => setCharityPublicKey(e.target.value)}
          placeholder="Charity Public Key"
        />
      </div>
      <Link to="/charity-profile">Edit Profile</Link>
      <h2>Received Donations</h2>
      <DonationsList donations={donationHistory} />
    </div>
  );
};

export default CharityDashboard;
