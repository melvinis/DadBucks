// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract DadBucks {
    string  public name = "DadBucks";
    string  public symbol = "DBX";
    string  public standard = "Dad Bucks v1.0";
    uint256 public totalSupply;

    constructor() {
        totalSupply = 1000000;
    }
}
