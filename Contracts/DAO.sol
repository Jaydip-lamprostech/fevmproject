// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/// @title Smart Contract for UpToDataDAO.
/// @author Bhumi Sadariya

import "./Token.sol";

contract DAO {
    constructor() {
        owner = msg.sender;
    }

    address internal owner;
    // all DAO members
    address[] public members;
    mapping(address => bool) public isMemberAdded;
    uint256 internal dataIdCounter;
    uint256 public tokensSold;
    Token s = Token(0x6D79555eb6d32BAF438991d26Bb5a38Fe36Ae4DB);

    // structure containing all information about a cid request
    struct Data {
        uint256 id;
        string cid;
        string description;
        uint64 dealId;
        address d_address;
        address creator;
        uint256 timeCreated;
        uint256 totalVotes;
        uint256 yesVotes;
        uint256 noVotes;
        bool isChecked;
        string status;
    }
    Data[] public allData;
    // mapping of dataIdCounter to Data struct
    mapping(uint256 => Data) public idToData;
    //mapping of member addresses to an array of data struct ids
    mapping(address => uint256[]) public memberToDataIDs;
    // mapping to store if the member has voted or not
    mapping(address => mapping(uint256 => bool)) internal hasVoted;
    // Keep track of all the data structure identifiers that are allowed by the community.
    uint256[] internal allAllowed;

    event Sell(address _buyer, uint256 _amount);

    // modifier to check whether the member has already voted or not
    modifier votedCheck(uint256 _id) {
        require(hasVoted[msg.sender][_id] == false, "You have already voted.");
        _;
    }

    // modifier to check that only members can vote
    modifier checkMember() {
        require(isMemberAdded[msg.sender], "Join the DAO to cast your votes.");
        _;
    }

    ///@param _member is the address of the person who wants to join the DAO.
    function addMember(address _member) public payable {
        if (!isMemberAdded[_member]) {
            members.push(_member);
        }
    }

    ///@param _numberOfTokens is the number of tokens the person wants to buy.
    function buyTokens(uint256 _numberOfTokens) public payable {
        require(
            msg.value == (_numberOfTokens * s.getTokenPrice()),
            "not enough value"
        );
        require(s.checkBalance() >= _numberOfTokens, "not enough token");
        s.transfer(msg.sender, _numberOfTokens);
        tokensSold += _numberOfTokens;
        emit Sell(msg.sender, _numberOfTokens);
    }

    ///@notice Members will share the cid and wait for votes.
    ///@param _cid id the cid of the data, _dealId is the storage provider's deal id, _description is the description related to that cid.
    function createRequest(
        string memory _cid,
        uint64 _dealId,
        address _d_address,
        string memory _description
    ) public {
        dataIdCounter += 1;
        idToData[dataIdCounter] = Data(
            dataIdCounter,
            _cid,
            _description,
            _dealId,
            _d_address,
            msg.sender,
            block.timestamp,
            0,
            0,
            0,
            false,
            ""
        );
        memberToDataIDs[msg.sender].push(dataIdCounter);
        allData.push(idToData[dataIdCounter]);
    }

    ///@notice checks msg.sender has joined the DAO; member has not voted yet.
    ///@param _id is the id of that data struct, and _status is whether the member voted for positive or negative.
    function vote(uint256 _id, uint256 _status)
        public
        checkMember
        votedCheck(_id)
    {
        require(msg.sender != idToData[_id].creator, "You can't vote");
        if (_status == 1) {
            idToData[_id].yesVotes += 1;
            idToData[_id].totalVotes += 1;
        } else if (_status == 2) {
            idToData[_id].noVotes += 1;
            idToData[_id].totalVotes += 1;
        }
        hasVoted[msg.sender][_id] = true;
    }

    ///@notice Questionable means that the data have no votes yet; allowed means that the data have more positive votes; and not allowed means that the data have more negative votes.
    ///@param _id is the id of that data struct
    function decision(uint256 _id) public {
        require(idToData[_id].isChecked == false, "Decision is made already.");
        if (idToData[_id].totalVotes == 0) {
            idToData[_id].status = "Questionable";
        } else if (
            ((idToData[_id].yesVotes / idToData[_id].totalVotes) * 100) > 80
        ) {
            idToData[_id].status = "Allowed";
            allAllowed.push(_id);
        } else if (
            ((idToData[_id].noVotes / idToData[_id].totalVotes) * 100) > 80
        ) {
            idToData[_id].status = "Not Allowed";
        }
        idToData[_id].isChecked = true;
    }

    /// @return all data structures
    function showRequests() public view returns (Data[] memory) {
        return allData;
    }

    /// @return member's data requests
    function getMyPostsIds() public view returns (uint256[] memory) {
        return memberToDataIDs[msg.sender];
    }

    /// @return data struct of the given id
    function getPost(uint256 _id) public view returns (Data memory) {
        return idToData[_id];
    }

    ///@return total number of data requests in the DAO
    function getTotalPosts() public view returns (uint256) {
        return dataIdCounter;
    }

    ///@return deal id for the data request
    function getDealId(uint256 _id) public view returns (uint64) {
        return idToData[_id].dealId;
    }

    /// @return deal address for the data request
    function getDealAddress(uint256 _id) public view returns (address) {
        return idToData[_id].d_address;
    }
}
