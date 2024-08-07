// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FundAllocation {
    address public owner;

    struct Donation {
        uint256 amount;
        address donor;
        uint256 timestamp;
    }

    struct Charity {
        address payable charityAddress;
        string name;
        uint256 totalReceived;
        Donation[] donations;
    }

    mapping(address => Charity) public charities;

    event Log(string message);
    event Debug(string message, address addressValue);

    constructor() {
        emit Debug("Constructor started", msg.sender);
        owner = msg.sender;
        require(owner != address(0), "Owner address cannot be zero");
        emit Log("Constructor completed");
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function addCharity(
        address payable _charityAddress,
        string memory _name
    ) public onlyOwner {
        require(
            _charityAddress != address(0),
            "Charity address cannot be zero"
        );
        require(bytes(_name).length > 0, "Charity name cannot be empty");
        require(
            charities[_charityAddress].charityAddress == address(0),
            "Charity already exists"
        );

        charities[_charityAddress].charityAddress = _charityAddress;
        charities[_charityAddress].name = _name;
        charities[_charityAddress].totalReceived = 0;

        emit Log("Charity added successfully");
    }

    function donate(address _charityAddress) public payable {
        require(
            charities[_charityAddress].charityAddress != address(0),
            "Charity does not exist"
        );

        charities[_charityAddress].donations.push(
            Donation({
                amount: msg.value,
                donor: msg.sender,
                timestamp: block.timestamp
            })
        );

        charities[_charityAddress].totalReceived += msg.value;

        (bool success, ) = _charityAddress.call{value: msg.value}("");
        require(success, "Transfer failed");

        emit Log("Donation made successfully");
    }

    function getDonations(
        address _charityAddress
    ) public view returns (Donation[] memory) {
        return charities[_charityAddress].donations;
    }
}
