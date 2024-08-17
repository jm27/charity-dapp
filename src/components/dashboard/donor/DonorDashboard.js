import { useEffect, useState } from "react";
import {
  fetchDonationHistory,
  sendPayment,
} from "../../../utils/stellarSDK/stellarSDK";
import DonationsList from "../common/DonationsList";
import useSubmitForm from "../../../hooks/useSubmitForm";

const DonorDashboard = () => {
  const donorProfile = JSON.parse(localStorage.getItem("currentUser")) || {};
  const [sourceSecretKey, setSourceSecretKey] = useState("");
  const [destinationPublicKey, setDestinationPublicKey] = useState("");
  const [amount, setAmount] = useState(0);
  const [donationHistory, setDonationHistory] = useState([]);
  const [donorPublicKey] = useState(donorProfile.publicKey || "");
  const [donorName] = useState(donorProfile.name || "");

  const submitDonation = async (e) => {
    if (!sourceSecretKey || !destinationPublicKey || !amount) {
      alert("Please fill all the fields");
      return;
    }
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    try {
      const result = await sendPayment(
        sourceSecretKey,
        destinationPublicKey,
        amount
      );
      if (result.successful) {
        alert("Donation sent successfully!");
      } else {
        alert(
          "Error sending donation. Please double check your details. And try again."
        );
      }
    } catch (error) {
      console.error("Error sending donation:", error);
    }
  };

  const { isLoading, handleSubmit } = useSubmitForm(submitDonation);

  useEffect(() => {
    if (!donorPublicKey && isLoading) return;
    const fetchHistory = async (donorPublicKey) => {
      const donationHisory = await fetchDonationHistory(donorPublicKey);
      setDonationHistory(donationHisory);
    };
    fetchHistory(donorPublicKey);
  }, [donorPublicKey, isLoading]);

  return (
    <div>
      <h2>Welcome, {donorName}! Ready to make a difference?</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Source Secret Key:</label>
          <input
            type="text"
            value={sourceSecretKey}
            onChange={(e) => setSourceSecretKey(e.target.value)}
            placeholder="Source Secret Key"
          />
        </div>
        <div>
          <label>Destination Public Key:</label>
          <input
            type="text"
            value={destinationPublicKey}
            onChange={(e) => setDestinationPublicKey(e.target.value)}
            placeholder="Destination Public Key"
          />
        </div>
        <div>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Donation"}
        </button>
      </form>
      <div>
        <h2>Donation History</h2>
        <DonationsList donations={donationHistory} />
      </div>
    </div>
  );
};

export default DonorDashboard;
