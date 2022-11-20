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
  // const button = document.getElementById("logo_image");

  return (
    <div className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroinsidefirst}>
          <h1 className="heroh1 animate__animated animate__fadeInDown">
            Smart Contracts
          </h1>
          <p className="herop1 animate__animated animate__fadeInDown">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            reiciendis nam vero vitae rerum expedita sequi totam commodi
            dignissimos numquam?
          </p>
          <button className="herofirstbutton animate__animated animate__fadeIn">
            Learn more
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
              <li>
                Create a pool contract that accepts deposit from lenders and
                borrow money to the borrowers
              </li>
              <li>
                Lenders can lend any amount of money and earn some interest for
                it.
              </li>
              <li>
                User or borrower can borrow some amount of tokens (limited) ,
                and pay back with interest for some time period.
              </li>
              <li>
                Interest is calculated according the interest rate and borrowing
                time peroid
              </li>
              <li>
                Lender can withdraw the amount later with extra interest earning
              </li>
              <li>
                Other functions can be called to determine the balance at any
                point of time , and the rewards earned
              </li>
            </ul>
          </span>
          <button className="herofirstbutton-2">View on Github</button>
          <div className="parentofcode">
            <span className={styles.code}>
              <pre className="line-numbers">
                <code className="language-jsx">{dao}</code>
              </pre>
            </span>
          </div>
        </div>
        <div className={styles.contractdiv} id="staking">
          <h2>Lending contract</h2>
          <span className={styles.features}>
            <ul>
              <li>
                Create a pool contract that accepts deposit from lenders and
                borrow money to the borrowers
              </li>
              <li>
                Lenders can lend any amount of money and earn some interest for
                it.
              </li>
              <li>
                User or borrower can borrow some amount of tokens (limited) ,
                and pay back with interest for some time period.
              </li>
              <li>
                Interest is calculated according the interest rate and borrowing
                time peroid
              </li>
              <li>
                Lender can withdraw the amount later with extra interest earning
              </li>
              <li>
                Other functions can be called to determine the balance at any
                point of time , and the rewards earned
              </li>
            </ul>
          </span>
          <button className="herofirstbutton-2">View on Github</button>
          <div className="parentofcode">
            <span className={styles.code}>
              <pre className="line-numbers">
                <code className="language-jsx">{dao}</code>
              </pre>
            </span>
          </div>
        </div>
        <div className={styles.contractdiv} id="vault">
          <h2>Lending contract</h2>
          <span className={styles.features}>
            <ul>
              <li>
                Create a pool contract that accepts deposit from lenders and
                borrow money to the borrowers
              </li>
              <li>
                Lenders can lend any amount of money and earn some interest for
                it.
              </li>
              <li>
                User or borrower can borrow some amount of tokens (limited) ,
                and pay back with interest for some time period.
              </li>
              <li>
                Interest is calculated according the interest rate and borrowing
                time peroid
              </li>
              <li>
                Lender can withdraw the amount later with extra interest earning
              </li>
              <li>
                Other functions can be called to determine the balance at any
                point of time , and the rewards earned
              </li>
            </ul>
          </span>
          <button className="herofirstbutton-2">View on Github</button>
          <div className="parentofcode">
            <span className={styles.code}>
              <pre className="line-numbers">
                <code className="language-jsx">{dao}</code>
              </pre>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
