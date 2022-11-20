// SPDX-License-Identifier:MIT
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
}
