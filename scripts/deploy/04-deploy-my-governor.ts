import { ethers } from 'hardhat';
import {
  MyGovernor,
  GovernanceTokenContractAddress,
  TimeLockContractAddress,
  VOTING_DELAY,
  VOTING_PERIOD,
  QUORUM_PERCENTAGE,
  PROPOSAL_THRESHOLD,
} from '../../utils/constants';

async function main() {
  const [signer, second] = await ethers.getSigners();
  console.log('Signers: ', signer.address, second.address);

  const myGovernorFactory = await ethers.getContractFactory(MyGovernor);
  const myGovernorContract = await myGovernorFactory.deploy(
    GovernanceTokenContractAddress,
    TimeLockContractAddress,
    VOTING_DELAY,
    VOTING_PERIOD,
    PROPOSAL_THRESHOLD,
    QUORUM_PERCENTAGE
  );
  await myGovernorContract.waitForDeployment();
  const myGovernorAddress = await myGovernorContract.getAddress();
  console.log(MyGovernor + ' deployed to:', myGovernorAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log('🏮🏮🏮🏮🏮🏮');
    console.error(error);
    process.exit(1);
  });
