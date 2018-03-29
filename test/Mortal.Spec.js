require("babel-polyfill");
import assert from 'assert';
import ganache from 'ganache-cli';
import Web3 from 'web3';

const interface1 =  require('../compile').interface;
const { bytecode } =  require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let ownerAccount;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    ownerAccount = await new web3.eth.Contract(JSON.parse(interface1))
        .deploy({ 
            data: bytecode,
            arguments:['TestOwner'] 
        })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Mortal', () => {

    it('deploy a contract' , () => {
        assert.equal(accounts.length, 10, 'Expected 10 test Accounts');
        assert.ok(ownerAccount.options.address);
    });

    it('has a default owner name', async () => {
        const ownerName = await ownerAccount.methods.GetOwnerName().call();
        assert.equal(ownerName, 'TestOwner');
    });

});
