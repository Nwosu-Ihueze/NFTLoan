import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const main = async () => {
  const Loan = await ethers.getContractFactory('Loan');
  const loan = await Loan.deploy();
  await loan.deployed();

  console.log('Loan address:', loan.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
