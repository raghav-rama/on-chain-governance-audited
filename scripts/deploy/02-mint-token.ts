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
  await governanceTokenContract.mint(signer.address, 1000);
  const balance = await governanceTokenContract.balanceOf(signer.address);
  console.log('Signer address balance:', balance.toString());

  // delegate voting power
  const tx = await governanceTokenContract
    .connect(signer)
    .delegate(signer.address);
  tx.wait(1);

  const votes = await governanceTokenContract.getVotes(signer.address);
  console.log('Votes:', votes.toString());
  console.log(
    `Balance of ${signer.address} is ${await ethers.provider.getBalance(signer.address)}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
