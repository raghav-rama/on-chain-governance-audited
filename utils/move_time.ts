import { ethers, network } from 'hardhat';

export async function moveTime(time: number) {
  if (network.name === 'hardhat' || network.name === 'localhost') {
    console.log('Moving time...');
    await ethers.provider.send('evm_increaseTime', [time]);
    console.log(`Moved ${time} seconds`);
  }
}
