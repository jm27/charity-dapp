import { useState, useEffect } from "react";
import { extractTransactionDetails } from "../../../utils/stellarSDK/stellarSDK";

const DonationsList = ({ donations }) => {
  const [transactionDetails, setTransactionDetails] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { timeZone: "UTC" });
  };

  useEffect(() => {
    const getTransactionDetails = async (donations) => {
      try {
        const transactionDetails = await Promise.all(
          donations.map((donation) => extractTransactionDetails(donation))
        );
        return transactionDetails;
      } catch (error) {
        console.error("Error fetching transaction details:", error);
        return [];
      }
    };

    getTransactionDetails(donations).then((transactionDetails) =>
      setTransactionDetails(transactionDetails)
    );
  }, [donations]);

  return (
    <div>
      <ul>
        {transactionDetails?.map(
          (transaction, index) =>
            Number(transaction.amount).toFixed(2) > 0 && (
              <li key={index}>
                {Number(transaction.amount).toFixed(2)} XLM from{" "}
                {transaction.from} to {transaction.to} on{" "}
                {formatDate(transaction.createdAt)} UTC
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default DonationsList;
