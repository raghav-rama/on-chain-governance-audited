import { ethers } from 'hardhat';
import { GovernanceToken } from '../../utils/constants';

async function main() {
  const governanceToken = GovernanceToken;
  const [signer, second] = await ethers.getSigners();
  console.log('Signers: ', signer.address, second.address);

  const governanceTokenFactory =
    await ethers.getContractFactory(governanceToken);
  const governanceTokenContract = await governanceTokenFactory.deploy(
    signer.address
  );
  await governanceTokenContract.waitForDeployment();
  const governanceTokenAddress = await governanceTokenContract.getAddress();
  console.log(governanceToken + ' deployed to:', governanceTokenAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
