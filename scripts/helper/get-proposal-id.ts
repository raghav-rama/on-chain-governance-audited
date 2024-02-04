import { BigNumberish } from 'ethers';
import { ethers } from 'hardhat';
import { MyGovernor, MyGovernorContractAddress } from '../../utils/constants';

async function main() {
  const governorContract = await ethers.getContractAt(
    MyGovernor,
    MyGovernorContractAddress
  );
  const filter =
    governorContract.filters[
      'ProposalCreated(uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,string)'
    ];
  const events = await governorContract.queryFilter(filter);
  for (const event of events) {
    console.log('Proposal Created:', event.args[0]);
    const res = await governorContract.state(event.args[0]);
    console.log('Proposal State:', res.toString());
  }
}

export const getProposalId = async (proposalIndex: number) => {
  const governorContract = await ethers.getContractAt(
    MyGovernor,
    MyGovernorContractAddress
  );
  const filter =
    governorContract.filters[
      'ProposalCreated(uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,string)'
    ];
  const events = await governorContract.queryFilter(filter);
  for (const event of events) {
    return event.args[proposalIndex] as BigNumberish;
  }
};

main()
  .then(() => {
    return 0;
  })
  .catch((error) => {
    console.error(error);
    return 1;
  });
