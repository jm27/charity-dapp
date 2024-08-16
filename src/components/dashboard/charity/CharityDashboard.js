import { useState, useEffect } from "react";
import { fetchDonationHistory } from "../../../utils/stellarSDK/stellarSDK";
import DonationsList from "../common/DonationsList";
import { Link } from "react-router-dom";

const CharityDashboard = () => {
  const charityProfile = JSON.parse(localStorage.getItem("currentUser")) || {};
  const [charityPublicKey] = useState(charityProfile.publicKey || "");
  const [charityName] = useState(charityProfile.name || "");
  const [donationHistory, setDonationHistory] = useState([]);

  useEffect(() => {
    if (!charityPublicKey) return;
    const fetchHistory = async (charityPublicKey) => {
      const donationHistory = await fetchDonationHistory(charityPublicKey);
      setDonationHistory(donationHistory);
    };
    fetchHistory(charityPublicKey);
  }, [charityPublicKey]);

  return (
    <div>
      <div>
        <h2>Hello, {charityName}! Let's make an impact.</h2>
      </div>
      <Link to="/charity-profile">Edit Profile</Link>
      <h2>Received Donations</h2>
      <DonationsList donations={donationHistory} />
    </div>
  );
};

export default CharityDashboard;
