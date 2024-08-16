const StellarSdk = require("stellar-sdk");

const server = new StellarSdk.Horizon.Server(
  "https://horizon-testnet.stellar.org"
);

export const registerUserInBlockchain = async () => {
  const pair = StellarSdk.Keypair.random();
  const publicKey = pair.publicKey();

  try {
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`
    );
    const responseJSON = await response.json();
    console.log("SUCCESS! You have a new account :)\n", responseJSON);
    return [pair, publicKey];
  } catch (e) {
    console.error("Error creating test account!", e);
  }
};

export const sendPayment = async (
  sourceSecretKey,
  destinationPublicKey,
  amount
) => {
  const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
  const sourcePublicKey = sourceKeypair.publicKey();

  try {
    const account = await server.loadAccount(sourcePublicKey);
    const fee = await server.fetchBaseFee();

    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: destinationPublicKey,
          asset: StellarSdk.Asset.native(),
          amount: amount.toString(),
        })
      )
      .setTimeout(30)
      .build();

    transaction.sign(sourceKeypair);
    const result = await server.submitTransaction(transaction);
    console.log("Success! Results:", result);
  } catch (e) {
    console.error("An error has occured sending payment", e);
  }
};

export const fetchDonationHistory = async (sourcePublicKey) => {
  try {
    const account = await server.loadAccount(sourcePublicKey);

    const transactions = await server
      .transactions()
      .forAccount(account.accountId())
      .call();

    return transactions?.records;
  } catch (e) {
    console.error("An error has occured fetching donation history", e);
  }
};

export const fetchOperationsForTransaction = async (transactionId) => {
  const url = `https://horizon-testnet.stellar.org/transactions/${transactionId}/operations`;
  const response = await fetch(url);
  const operations = await response.json();

  return operations._embedded.records;
};

export const extractTransactionDetails = async (transaction) => {
  const operations = await fetchOperationsForTransaction(transaction.id);
  const transactionDetails = {
    id: transaction.id,
    createdAt: transaction.created_at,
    amount: 0,
    to: "",
    from: "",
  };

  operations.forEach((operation) => {
    if (operation.type === "payment") {
      transactionDetails.amount = operation.amount;
      transactionDetails.to = operation.to;
      transactionDetails.from = operation.from;
    }
  });

  return transactionDetails;
};

export const fetchAccountBalance = async (publicKey) => {
  try {
    const account = await server.loadAccount(publicKey);
    const balance = account.balances.find(
      (balance) => balance.asset_type === "native"
    );
    return balance.balance;
  } catch (e) {
    console.error("An error has occured fetching account balance", e);
  }
};

export const fetchAccountDetails = async (publicKey) => {
  try {
    const server = new StellarSdk.Horizon.Server(
      "https://horizon-testnet.stellar.org"
    );
    const account = await server.loadAccount(publicKey);
    console.log(account);
  } catch (e) {
    console.error("An error has occured fetching account details", e);
  }
};
