import { ethers, network } from 'hardhat';
import {
  MyGovernor,
  MyGovernorContractAddress,
  SimpleStorage,
  SimpleStorageContractAddress,
  VOTING_DELAY,
  devChains,
} from '../../utils/constants';
import { moveBlocks } from '../../utils/move_blocks';

async function propose() {
  const governorContract = await ethers.getContractAt(
    MyGovernor,
    MyGovernorContractAddress
  );
  const simpleStorage = await ethers.getContractAt(
    SimpleStorage,
    SimpleStorageContractAddress
  );
  const encodedFunctioncCall = simpleStorage.interface.encodeFunctionData(
    'store',
    [42n]
  );
  console.log('Proposing to set x to 42');

  const proposeTx = await governorContract.propose(
    [SimpleStorageContractAddress],
    [0],
    [encodedFunctioncCall],
    'Set x to 42'
  );
  await proposeTx.wait(1);

  if (devChains.includes(network.name)) {
    await moveBlocks(VOTING_DELAY + 1);
  }
}

propose()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
