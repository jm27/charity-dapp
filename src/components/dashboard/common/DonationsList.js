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
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <ul className="space-y-2">
        {transactionDetails?.map(
          (transaction, index) =>
            Number(transaction.amount).toFixed(2) > 0 && (
              <li
                key={index}
                className="p-2 bg-white rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-center"
              >
                <span className="font-semibold text-lg">
                  {Number(transaction.amount).toFixed(2)} XLM
                </span>
                <span className="text-gray-600">
                  from {transaction.from} to {transaction.to}
                </span>
                <span className="text-gray-500 text-sm">
                  on {formatDate(transaction.createdAt)} UTC
                </span>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default DonationsList;
