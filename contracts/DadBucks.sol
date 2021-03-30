// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract DadBucks {
    string  public name = "Dad Bucks";
    string  public symbol = "DBX";
    string  public standard = "DadBucks v1.0";
    uint256 public totalSupply;
    
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );
    
    mapping(address => uint256) public balanceOf;

    constructor(uint256 _initialSupply) {
        balanceOf[msg.sender] = _initialSupply;
        // In the Truffle console, you can use "web3.eth.getAccounts().then(function(acc){ accounts = acc})"
        // account[0] to get the address of the first account
        // or web3.eth.getaccount() to return all the accounts
        totalSupply = _initialSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

}
