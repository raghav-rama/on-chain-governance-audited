import { ethers } from 'hardhat';
import {
  SimpleStorage,
  TimeLock,
  SimpleStorageContractAddress,
  TimeLockContractAddress,
} from '../../utils/constants';

async function main() {
  const simleStorageContract = await ethers.getContractAt(
    SimpleStorage,
    SimpleStorageContractAddress
  );
  const timeLockContract = await ethers.getContractAt(
    TimeLock,
    TimeLockContractAddress
  );
  const txId = await simleStorageContract.transferOwnership(
    await timeLockContract.getAddress()
  );
  await txId.wait(1);
  console.log('Ownership transferred to TimeLock\n', txId.data);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log('🏮🏮🏮🏮🏮🏮');
    console.error(error);
    process.exit(1);
  });
