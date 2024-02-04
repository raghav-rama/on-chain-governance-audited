import { ZeroAddress } from 'ethers';
import { ethers } from 'hardhat';

import {
  MyGovernor,
  MyGovernorContractAddress,
  TimeLock,
  TimeLockContractAddress,
} from '../../utils/constants';

async function main() {
  const [signer] = await ethers.getSigners();

  const myGovernor = await ethers.getContractAt(
    MyGovernor,
    MyGovernorContractAddress
  );
  const timelock = await ethers.getContractAt(
    TimeLock,
    TimeLockContractAddress
  );

  const proposerRole = await timelock.PROPOSER_ROLE();
  const executorRole = await timelock.EXECUTOR_ROLE();
  const adminRole = await timelock.DEFAULT_ADMIN_ROLE();
  const cancellerRole = await timelock.CANCELLER_ROLE();

  const proposeTxId = await timelock.grantRole(
    proposerRole,
    MyGovernorContractAddress
  );
  await proposeTxId.wait(1);
  console.log('Proposer Role Granted\n', proposeTxId.data);
  // ----------------------------------------------------------
  const executorId = await timelock.grantRole(executorRole, ZeroAddress);
  await executorId.wait(1);
  console.log('Executor Role Granted\n', executorId.data);
  // ----------------------------------------------------------
  // Shoud not be done as this centralizes things and a better way is to use a multisig or a DAO
  const cancellerTxId = await timelock.grantRole(
    cancellerRole,
    MyGovernorContractAddress
  );
  await cancellerTxId.wait(1);
  console.log('Canceller Role Granted\n', cancellerTxId.data);
  // ----------------------------------------------------------
  // This is necessary to have the timelock undergo the governance process to anything
  const revokeAdminTxId = await timelock.revokeRole(adminRole, signer.address);
  await revokeAdminTxId.wait(1);
  console.log('Admin Role Revoked\n', revokeAdminTxId.data);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
