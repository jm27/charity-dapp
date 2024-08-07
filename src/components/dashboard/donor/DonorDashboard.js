import { useEffect, useState } from "react";
import {
  fetchDonationHistory,
  sendPayment,
} from "../../../utils/stellarSDK/stellarSDK";
import DonationsList from "../common/DonationsList";

const DonorDashboard = () => {
  const [sourceSecretKey, setSourceSecretKey] = useState("");
  const [destinationPublicKey, setDestinationPublicKey] = useState("");
  const [amount, setAmount] = useState(0);
  const [donationHistory, setDonationHistory] = useState([]);
  const [donorPublicKey, setDonorPublicKey] = useState(
    "GCVQHCMYN3VSPDQQABK672A2OBDCU2W3BMSPKJ6XRXZF5PCITAOQGFDN"
  );

  useEffect(() => {
    // const server = new StellarSdk.Horizon.Server(
    //   "https://horizon-testnet.stellar.org"
    // );
    // // Example: Load account details
    // const fetchAccount = async () => {
    //   const account = await server.loadAccount("GB5..."); // TODO get account ID
    //   console.log(account);
    // };
    // fetchAccount();
    // if (hasEffectRun.current) return;
    // hasEffectRun.current = true;
    // sendPayment("S...", "G...", 100); // TODO: Add your source secret key and destination public key
    if (!donorPublicKey) return;
    const fetchHistory = async (donorPublicKey) => {
      const donationHisory = await fetchDonationHistory(donorPublicKey);
      setDonationHistory(donationHisory);
    };
    fetchHistory(donorPublicKey);
  }, [donorPublicKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sourceSecretKey || !destinationPublicKey || !amount) {
      alert("Please fill all the fields");
      return;
    }
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    await sendPayment(sourceSecretKey, destinationPublicKey, amount);
  };

  return (
    <div>
      <h1>Donor Dashboard</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
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
          <label>Amout</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
        </div>
        <button type="submit">Send Payment</button>
      </form>
      <div>
        <h2>Donation History</h2>
        <DonationsList donations={donationHistory} />
      </div>
    </div>
  );
};

export default DonorDashboard;
