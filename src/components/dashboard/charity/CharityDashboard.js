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
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Hello, {charityName}! Let's make an impact.
        </h2>
      </div>
      <Link
        to="/charity-profile"
        className="text-indigo-600 hover:text-indigo-800 font-medium"
      >
        Edit Profile
      </Link>
      <h2 className="mt-8 text-xl font-semibold text-gray-900">
        Received Donations
      </h2>
      <DonationsList donations={donationHistory} />
    </div>
  );
};

export default CharityDashboard;
