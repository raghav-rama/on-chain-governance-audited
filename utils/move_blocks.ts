import { network as hardhatNetwork } from 'hardhat';

export async function moveBlocks(blocks: number) {
  if (
    hardhatNetwork.name === 'hardhat' ||
    hardhatNetwork.name === 'localhost'
  ) {
    console.log('Moving blocks...');
    for (let index = 0; index < blocks; index++) {
      await hardhatNetwork.provider.request({
        method: 'evm_mine',
        params: [],
      });
    }
    console.log(`Moved ${blocks} blocks`);
  } else {
    throw new Error('This function only works with hardhat network');
  }
}
