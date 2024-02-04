import { ethers, network } from 'hardhat';
import {
  MyGovernor,
  MyGovernorContractAddress,
  VOTING_PERIOD,
  devChains,
} from '../../utils/constants';
import { moveBlocks } from '../../utils/move_blocks';
import { getProposalId } from '../helper/get-proposal-id';

const index = 0;

async function main(proposalIndex: number) {
  const proposalId = await getProposalId(proposalIndex);
  if (!proposalId) {
    throw new Error('Proposal not found');
  }
  console.log('Proposal Id:', proposalId.toString());
  const governorContract = await ethers.getContractAt(
    MyGovernor,
    MyGovernorContractAddress
  );
  const voteTxRes = await governorContract.castVoteWithReason(
    proposalId,
    1,
    'I like this proposal'
  );
  voteTxRes.wait(1);
  if (devChains.includes(network.name)) {
    await moveBlocks(VOTING_PERIOD + 1);
  }
  console.log('Voting period ended!');
}

main(index)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
