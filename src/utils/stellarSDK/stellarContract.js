import Web3 from "web3";
import FundAllocation from "../../build/contracts/FundAllocation.json";

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const getContract = async () => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = FundAllocation.networks[networkId];
  return new web3.eth.Contract(
    FundAllocation.abi,
    deployedNetwork && deployedNetwork.address
  );
};

export { web3, getContract };
