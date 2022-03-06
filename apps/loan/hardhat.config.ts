import * as dotenv from 'dotenv';
import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';

dotenv.config({ path: '.env' });

task('accounts', 'Prints the list of accounts', async (_, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

const ALCHEMY_API_KEY_URL = process.env.ALCHEMY_API_KEY_URL;

const POLYGON_PRIVATE_KEY = process.env.POLYGON_PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: '0.8.4',
  networks: {
    polygon_mumbai: {
      url: ALCHEMY_API_KEY_URL,
      accounts: [POLYGON_PRIVATE_KEY]
    }
  }
};

export default config;
