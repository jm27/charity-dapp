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
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Welcome, {donorName}! Ready to make a difference?
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Source Secret Key:
          </label>
          <input
            type="text"
            value={sourceSecretKey}
            onChange={(e) => setSourceSecretKey(e.target.value)}
            placeholder="Source Secret Key"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Destination Public Key:
          </label>
          <input
            type="text"
            value={destinationPublicKey}
            onChange={(e) => setDestinationPublicKey(e.target.value)}
            placeholder="Destination Public Key"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`mt-3 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
            isLoading
              ? "bg-gray-400"
              : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          }`}
        >
          {isLoading ? "Sending..." : "Send Donation"}
        </button>
      </form>
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900">
          Donation History
        </h2>
        <DonationsList donations={donationHistory} />
      </div>
    </div>
  );
};

export default DonorDashboard;
