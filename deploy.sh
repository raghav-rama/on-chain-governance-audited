#!/bin/bash

pnpm run deploy localhost 01-deploy-governor-token
pnpm run deploy localhost 02-mint-token
pnpm run deploy localhost 03-deploy-timelock-contract
pnpm run deploy localhost 04-deploy-my-governor
pnpm run deploy localhost 05-deploy-simple-storge
pnpm run deploy localhost 06-transfer-ownership-to-timelock
pnpm run deploy localhost 07-setup-governance-contracts
