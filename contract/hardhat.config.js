require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

const rpc_url = process.env.RPC_URL;
const private_key = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.18',

  networks: {
    mumbai: {
      url: rpc_url,
      accounts: [private_key],
      chainId: 80001,
    },
  },
};
