import { ethers } from 'hardhat';
import { TimeLock, MIN_DELAY } from '../../utils/constants';

async function main() {
  const [signer, second] = await ethers.getSigners();
  console.log('Signers: ', signer.address, second.address);

  const timeLockFactory = await ethers.getContractFactory(TimeLock);
  const timeLockContract = await timeLockFactory.deploy(
    MIN_DELAY,
    [],
    [],
    signer
  );
  await timeLockContract.waitForDeployment();
  const timeLockAddress = await timeLockContract.getAddress();
  console.log('Timelock deployed to:', timeLockAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
