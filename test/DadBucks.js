var DadBucks = artifacts.require("./DadBucks.sol");

contract('DadBucks', function(accounts) {
    it('Sets the Total Supply of DadBucks on Deployment', function() {
        return DadBucks.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, 'Sets the Total Supply to 1,000,000');
        });
    });
})