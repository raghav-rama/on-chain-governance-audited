import { ethers } from 'hardhat';
import {
  GovernanceToken,
  GovernanceTokenContractAddress,
} from '../../utils/constants';

async function main() {
  const governanceToken = GovernanceToken;
  const [signer, second] = await ethers.getSigners();

  console.log('Signers: ', signer.address, second.address);

  const governanceTokenContract = await ethers.getContractAt(
    governanceToken,
    GovernanceTokenContractAddress
  );
  await governanceTokenContract.mint(second.address, 1000);
  const balance = await governanceTokenContract.balanceOf(second.address);
  console.log('Second address balance:', balance.toString());
  console.log(
    `Balance of ${signer.address} is ${await ethers.provider.getBalance(signer.address)}`
  );
}

main()
  .then(() => {
    return 0;
  })
  .catch((error) => {
    console.error(error);
    return 1;
  });
