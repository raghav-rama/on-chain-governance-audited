import { ethers } from 'hardhat';
import { SimpleStorage } from '../../utils/constants';

async function main() {
  const simpleStorage = await ethers.getContractFactory(SimpleStorage);
  const simpleStorageContract = await simpleStorage.deploy();
  await simpleStorageContract.waitForDeployment();
  const simpleStorageContractAddress = await simpleStorageContract.getAddress();
  console.log('SimpleStorage deployed to:', simpleStorageContractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log('🏮🏮🏮🏮🏮🏮');
    console.error(error);
    process.exit(1);
  });
