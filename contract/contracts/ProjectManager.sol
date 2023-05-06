// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract ProjectManager {
    address public immutable i_owner;
    address public immutable i_projectsManager;

    string public projectName;
    string public projectDescription;

    mapping(address => uint) public donatersAddressToAmount;
    uint public balance;

    constructor(
        string memory _projectName,
        string memory _projectDescription,
        address _owner
    ) {
        projectName = _projectName;
        projectDescription = _projectDescription;
        i_owner = _owner;
        i_projectsManager = msg.sender;
    }

    function fundProject(address requestAddress) public payable {
        donatersAddressToAmount[requestAddress] += msg.value;
        balance += msg.value;
    }

    function withdrawFunds(address requestAddress) public onlyOwner {
        require(
            requestAddress == i_owner,
            "Only the owner of the project can withdraw funds"
        );
        (bool isSuccess, ) = payable(requestAddress).call{
            value: address(this).balance
        }("");
        balance = 0;
        require(isSuccess, "Failed to withdraw funds");
    }

    modifier onlyOwner() {
        if (msg.sender != i_projectsManager) {
            revert(
                "Functiuon can only be called by the projectsManager contract"
            );
        }
        _;
    }

    function getBalance() public view returns (uint) {
        return balance;
    }

    function getProjectDetails()
        public
        view
        returns (string memory, string memory, uint, address)
    {
        return (projectName, projectDescription, balance, i_owner);
    }
}
