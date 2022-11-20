import Head from "next/head";
import Image from "next/image";
import BackgroundAnimation from "../src/components/BackgroundAnimation";
import styles from "../styles/Home.module.css";
import boy from "../src/assets/Untitled-2.png";
import Prism from "prismjs";
import "animate.css";
import "prismjs/themes/prism-twilight.css";
import "prismjs/components/prism-jsx.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import miro from "../src/assets/miroboard.png";

import { useEffect, useRef } from "react";

export default function Home() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  const logoref = useRef();

  const dao = `// SPDX-License-Identifier: MIT

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
  
      /// @param _member is the address of the person who wants to join the DAO.
      function addMember(address _member) public payable {
          if (!isMemberAdded[_member]) {
              members.push(_member);
          }
      }
  
      /// @param _numberOfTokens is the number of tokens the person wants to buy.
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
  
      /// @notice Members will share the cid and wait for votes.
      /// @param _cid id the cid of the data, _description is the description related to that cid.
      function createRequest(string memory _cid, string memory _description)
          public
      {
          dataIdCounter += 1;
          idToData[dataIdCounter] = Data(
              dataIdCounter,
              _cid,
              _description,
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
  
      /// @notice checks msg.sender has joined the DAO; member has not voted yet.
      /// @param _id is the id of that data struct, and _status is whether the member voted for positive or negative.
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
  
      /// @notice Questionable means that the data have no votes yet; allowed means that the data have more positive votes; 
      /// and not allowed means that the data have more negative votes.
      /// @param _id is the id of that data struct
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
  
      /// @return total number of data requests in the DAO
      function getTotalPosts() public view returns (uint256) {
          return dataIdCounter;
      }
  }`;

  const dealdata = `// SPDX-License-Identifier: MIT

  pragma solidity ^0.8.0;
  
  /// @title Smart Contract to retrive deal data
  /// @author Bhumi Sadariya
  
  import {MarketAPI} from "./MarketAPI.sol";
  import {MarketTypes} from "./MarketTypes.sol";
  import "./DAO.sol";
  
  contract DealData {
      DAO dao = DAO(0xa60C7e5D0cCec0B28E5e6a57EE30C48Bfa29C5C6);
  
      /// @return the data commitment and size of a deal proposal for the requested data in the DAO.
      function getStorageSize(uint256 _id)
          public
          view
          returns (MarketTypes.GetDealDataCommitmentReturn memory)
      {
          uint64 d_id = dao.getDealId(_id);
          address d_address = dao.getDealAddress(_id);
          MarketAPI marketApiInstance = MarketAPI(d_address);
          MarketTypes.GetDealDataCommitmentParams memory params = MarketTypes
              .GetDealDataCommitmentParams(d_id);
          MarketTypes.GetDealDataCommitmentReturn
              memory response = marketApiInstance.get_deal_data_commitment(
                  params
              );
          return response;
      }
  
      /// @return the client of a deal proposal for the requested data in the DAO.
      function getStorageDealClient(uint256 _id)
          public
          view
          returns (string memory)
      {
          uint64 d_id = dao.getDealId(_id);
          address d_address = dao.getDealAddress(_id);
          MarketAPI marketApiInstance = MarketAPI(d_address);
          MarketTypes.GetDealClientParams memory params = MarketTypes
              .GetDealClientParams(d_id);
  
          MarketTypes.GetDealClientReturn memory response = marketApiInstance
              .get_deal_client(params);
          return response.client;
      }
  
      /// @return the provider of a deal proposal for the requested data in the DAO.
      function getStorageDealProvider(uint256 _id)
          public
          view
          returns (MarketTypes.GetDealProviderReturn memory)
      {
          uint64 d_id = dao.getDealId(_id);
          address d_address = dao.getDealAddress(_id);
          MarketAPI marketApiInstance = MarketAPI(d_address);
          MarketTypes.GetDealProviderParams memory params = MarketTypes
              .GetDealProviderParams(d_id);
          MarketTypes.GetDealProviderReturn memory response = marketApiInstance
              .get_deal_provider(params);
          return response;
      }
  
      /// @return the label of a deal proposal for the requested data in the DAO.
      function getStorageDealLabel(uint256 _id)
          public
          view
          returns (MarketTypes.GetDealLabelReturn memory)
      {
          uint64 d_id = dao.getDealId(_id);
          address d_address = dao.getDealAddress(_id);
          MarketAPI marketApiInstance = MarketAPI(d_address);
  
          MarketTypes.GetDealLabelParams memory params = MarketTypes
              .GetDealLabelParams(d_id);
  
          MarketTypes.GetDealLabelReturn memory response = marketApiInstance
              .get_deal_label(params);
          return response;
      }
  
      /// @return the start epoch and duration of a deal proposal for the requested data in the DAO
      function getStorageDealTerm(uint256 _id)
          public
          view
          returns (MarketTypes.GetDealTermReturn memory)
      {
          uint64 d_id = dao.getDealId(_id);
          address d_address = dao.getDealAddress(_id);
          MarketAPI marketApiInstance = MarketAPI(d_address);
  
          MarketTypes.GetDealTermParams memory params = MarketTypes
              .GetDealTermParams(d_id);
  
          MarketTypes.GetDealTermReturn memory response = marketApiInstance
              .get_deal_term(params);
          return response;
      }
  
      /// @return the per-epoch price of a deal proposal for the requested data in the DAO
      function getStorageDealTotalPrice(uint256 _id)
          public
          view
          returns (MarketTypes.GetDealEpochPriceReturn memory)
      {
          uint64 d_id = dao.getDealId(_id);
          address d_address = dao.getDealAddress(_id);
          MarketAPI marketApiInstance = MarketAPI(d_address);
  
          MarketTypes.GetDealEpochPriceParams memory params = MarketTypes
              .GetDealEpochPriceParams(d_id);
  
          MarketTypes.GetDealEpochPriceReturn memory response = marketApiInstance
              .get_deal_total_price(params);
          return response;
      }
  
      /// @return the verified flag for a deal proposal for the requested data in the DAO
      function getStorageDealVerified(uint256 _id)
          public
          view
          returns (MarketTypes.GetDealVerifiedReturn memory)
      {
          uint64 d_id = dao.getDealId(_id);
          address d_address = dao.getDealAddress(_id);
          MarketAPI marketApiInstance = MarketAPI(d_address);
  
          MarketTypes.GetDealVerifiedParams memory params = MarketTypes
              .GetDealVerifiedParams(d_id);
  
          MarketTypes.GetDealVerifiedReturn memory response = marketApiInstance
              .get_deal_verified(params);
          return response;
      }
  
      /// @return If the deal does not yet exist, return USR_NOT_FOUND; otherwise, return EX_DEAL_EXPIRED for the requested data in the DAO.
      function getStorageDealActivation(uint256 _id)
          public
          view
          returns (MarketTypes.GetDealActivationReturn memory)
      {
          uint64 d_id = dao.getDealId(_id);
          address d_address = dao.getDealAddress(_id);
          MarketAPI marketApiInstance = MarketAPI(d_address);
  
          MarketTypes.GetDealActivationParams memory params = MarketTypes
              .GetDealActivationParams(d_id);
  
          MarketTypes.GetDealActivationReturn memory response = marketApiInstance
              .get_deal_activation(params);
          return response;
      }
  }`;

  const token = `// SPDX-License-Identifier:MIT
  pragma solidity ^0.8.7;
  
  /// @title Smart Contract for custome token.
  /// @author Bhumi Sadariya
  
  contract Token {
      string public name = "UpToData Token";
      string public symbol = "UTD";
      uint256 public totalSupply;
      address public admin;
      uint256 tokenPrice = 0.0001 ether;
      uint256 public tokensSold;
  
      event Transfer(address indexed _from, address indexed _to, uint256 _value);
  
      // mapping of his address to the number of tokens purchased
      mapping(address => uint256) public balanceOf;
  
      constructor(uint256 _initialSupply) {
          admin = msg.sender;
          balanceOf[admin] = _initialSupply;
          totalSupply = _initialSupply;
      }
  
      ///@return balance of the owner
      function checkBalance() external view returns (uint256) {
          return balanceOf[admin];
      }
  
      ///@param _to is the address of the member, _value is the number of tokens he wants to buy
      function transfer(address _to, uint256 _value)
          public
          returns (bool success)
      {
          require(balanceOf[admin] >= _value, "xyz");
          balanceOf[admin] -= _value;
          balanceOf[_to] += _value;
          emit Transfer(admin, _to, _value);
          return true;
      }
  
      ///@return the price of the UTD
      function getTokenPrice() external view returns (uint256) {
          return tokenPrice;
      }
  }`;
  // const button = document.getElementById("logo_image");

  return (
    <div className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroinsidefirst}>
          <h1 className="heroh1 animate__animated animate__fadeInDown">
            Smart Contracts
          </h1>
          <p className="herop1 animate__animated animate__fadeInDown">
            DAO that curates data for its useability.
          </p>
          <p className="herop1 animate__animated animate__fadeInDown">
            eg. image, article, scientific research, etc.
          </p>
          <button className="herofirstbutton animate__animated animate__fadeIn">
            <a
              href="https://miro.com/app/board/uXjVPBvZqS4=/?share_link_id=108563393303"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>{" "}
          </button>
        </div>
        <div className="heroinsidesecond animate__animated animate__fadeIn">
          <div className="inside animate__animated animate__fadeIn">
            <Image className="heroimage" src={boy} alt="boy-image" />
          </div>
          <BackgroundAnimation />
        </div>
      </section>
      <section className={styles.secondsection}>
        <h2 className="contractsheading">Contracts</h2>
        <div className={styles.contractdiv} id="dao">
          <h2>DAO contract</h2>
          <span className={styles.features}>
            <ul>
              <li>Users can join the DAO and buy tokens.</li>
              <li>Members can request for the data to be added.</li>
              <li>The DAO community can vote for the requested data.</li>
              <li>The vote&apos;s outcome can be calculated.</li>
            </ul>
          </span>
          <button className="herofirstbutton-2">
            {" "}
            <a
              target="_blank"
              href="https://github.com/Bhumi18/UpToDataDAO/blob/main/DAO.sol"
              rel="noopener noreferrer"
            >
              View on Github
            </a>
          </button>
          <div className="parentofcode">
            <span className={styles.code}>
              <pre className="line-numbers">
                <code className="language-jsx">{dao}</code>
              </pre>
            </span>
          </div>
        </div>
        <div className={styles.contractdiv} id="dealdata">
          <h2>DealData contract</h2>
          <span className={styles.features}>
            <ul>
              <li>
                The community can check the deal info for the requested data
                from the member of the DAO.
              </li>
              <li>
                Deal info such as size, label, start time, end time, price,
                client, provider, verified, and activation
              </li>
            </ul>
          </span>
          <button className="herofirstbutton-2">
            <a
              target="_blank"
              href="https://github.com/Bhumi18/UpToDataDAO/blob/main/DealData.sol"
              rel="noopener noreferrer"
            >
              View on Github
            </a>
          </button>
          <div className="parentofcode">
            <span className={styles.code}>
              <pre className="line-numbers">
                <code className="language-jsx">{dealdata}</code>
              </pre>
            </span>
          </div>
        </div>
        <div className={styles.contractdiv} id="token">
          <h2>Token contract</h2>
          <span className={styles.features}>
            <ul>
              <li>ERC20 custom token for UpToDataDAO</li>
              <li>UTD is the symbol of the token.</li>
              <li>
                Contract is deployed at
                &apos;0x6D79555eb6d32BAF438991d26Bb5a38Fe36Ae4DB&apos;
              </li>
            </ul>
          </span>
          <button className="herofirstbutton-2">
            <a
              target="_blank"
              href="https://github.com/Bhumi18/UpToDataDAO/blob/main/Token.sol"
              rel="noopener noreferrer"
            >
              View on Github
            </a>
          </button>
          <div className="parentofcode">
            <span className={styles.code}>
              <pre className="line-numbers">
                <code className="language-jsx">{token}</code>
              </pre>
            </span>
          </div>
        </div>
        <div className={styles.contractdiv} id="token">
          <h2>Project Sketch</h2>
          <div className="parentofcode">
            <Image className="miro-image" src={miro} alt="miroboard" />
          </div>
        </div>
      </section>
    </div>
  );
}
