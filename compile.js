require("babel-polyfill");
import path from 'path';
import fs from 'fs';
import solc from 'solc';

const inboxPath = path.resolve(__dirname, 'src/SmartContracts', 'MortalContract.sol');
const source = fs.readFileSync(inboxPath, 'utf8');
const contract= solc.compile(source, 1).contracts[':Mortal'];
module.exports = contract;