const DonationsList = ({ donations }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { timeZone: "UTC" });
  };

  return (
    <div>
      <ul>
        {donations?.map((donation, index) => (
          <li key={index}>
            {donation.amount} XLM to {donation.to} on{" "}
            {formatDate(donation.created_at)} UTC
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonationsList;
