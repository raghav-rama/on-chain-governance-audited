import { keccak256, toUtf8Bytes } from 'ethers';
import { ethers, network } from 'hardhat';
import {
  MyGovernor,
  MyGovernorContractAddress,
  SimpleStorage,
  SimpleStorageContractAddress,
  devChains,
  FunctionName,
  FunctionArgs,
  Description,
  MIN_DELAY,
} from '../../utils/constants';
import { moveBlocks } from '../../utils/move_blocks';
import { moveTime } from '../../utils/move_time';

async function main() {
  const governorContract = await ethers.getContractAt(
    MyGovernor,
    MyGovernorContractAddress
  );
  const simpleStorage = await ethers.getContractAt(
    SimpleStorage,
    SimpleStorageContractAddress
  );
  const encodedFunctioncCall = simpleStorage.interface.encodeFunctionData(
    FunctionName,
    [FunctionArgs]
  );
  const descriptionHash = keccak256(toUtf8Bytes(Description));
  console.log(`Queueing proposal to ${Description}`);
  const proposeTx = await governorContract.queue(
    [SimpleStorageContractAddress],
    [0],
    [encodedFunctioncCall],
    descriptionHash
  );
  await proposeTx.wait(1);
  if (devChains.includes(network.name)) {
    await moveTime(MIN_DELAY + 1);
    await moveBlocks(1);
  }
  console.log('Executing proposal');
  const executeTxId = await governorContract.execute(
    [SimpleStorageContractAddress],
    [0],
    [encodedFunctioncCall],
    descriptionHash
  );
  await executeTxId.wait(1);
  console.log('Proposal executed');
  const newValue = await simpleStorage.retrieve();
  console.log(`New value: ${newValue}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
