var DadBucks = artifacts.require("./DadBucks.sol");

contract('DadBucks', function(accounts) {
    var tokenInstance;
    it('Initializes the Dadbucks contract with the definition values', function() {
        return DadBucks.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name) {
            assert.equal(name, 'Dad Bucks', 'is the correct token name');
            return tokenInstance.symbol();
        }).then(function(symbol) {
            assert.equal(symbol, 'DBX', 'is the correct token symbol');
            return tokenInstance.standard();
        }).then(function(standard) {
            assert.equal(standard, 'DadBucks v1.0', 'is the correct token standard');
        });    
    })
    
    it('Allocates the Initial Supply of DadBucks on Deployment', function() {
        return DadBucks.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, 'Sets the Total Supply to 1,000,000');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance) {
            assert.equal(adminBalance.toNumber(), 1000000, 'Allocate the initial supply to the Admin');
        });
    });

    it('Transfers DadBucks to an account', function() {
        return DadBucks.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.transfer.call(accounts[1], 999999999999999);
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');

            return tokenInstance.transfer.call(accounts[1], 250000, { from: accounts[0] });
            }).then(function(success) {
            assert.equal(success, true, 'it returns true');

            return tokenInstance.transfer(accounts[1],250000, { from: accounts[0] });
        }).then(function(receipt) {

            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
            assert.equal(receipt.logs[0].args._value, 250000, 'logs the transfer amount');

            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 250000, 'Adds amount to childs account');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 750000, 'Deducts amount from Dads account');
        });
    });    
});