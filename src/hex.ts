import {
  BigInt
} from "@graphprotocol/graph-ts"

import {
  StakeStart,
  StakeEnd,
  StakeGoodAccounting
} from "../generated/HEX/HEX"

import {
  Owner,
  HEXStake
} from "../generated/schema"

import {
  StakeStartData,
  StakeEndData,
  StakeGoodAccountingData
} from './eventData/hex'

import {
  bigIntToBinaryStr,
  hexDayFromTimestamp,
  isGnosisSafe
} from "../src/utils"

export function handleStakeStart(event: StakeStart): void {
  let ownerId = event.params.stakerAddr.toHexString();
  let owner = Owner.load(ownerId);

  if (!owner) {
    owner = new Owner(ownerId);
    owner.isGnosisSafe = isGnosisSafe(event.params.stakerAddr);
    owner.hasMintedHdrn = false;
    owner.hasMintedMaxi = false;
    owner.hasMintedPlsd = false;
  }

  let hexStake = new HEXStake(event.params.stakeId.toHexString());

  let rawData = event.params.data0;
  let packedData = bigIntToBinaryStr(rawData);
  let data = new StakeStartData(packedData);

  hexStake.owner = ownerId;
  hexStake.previousOwners = [];
  hexStake.stakeId = event.params.stakeId;
  hexStake.isActive = true;
  hexStake.isBtcFreeClaim = data.getIsAutoStake();
  hexStake.isGoodAccounted = false;
  hexStake.isHdrnHsi = false;
  hexStake.isHdrnHsiTokenized = false;
  hexStake.stakeAmount = data.getStakedHearts();
  hexStake.stakeShares = data.getStakedShares();
  hexStake.stakedDays = data.getStakedDays();
  hexStake.stakeStartDay = hexDayFromTimestamp(data.getTimestamp()).plus(BigInt.fromI32(1));
  hexStake.stakeEndDayScheduled = hexStake.stakeStartDay.plus(hexStake.stakedDays);
  hexStake.hdrnLaunchBonus = BigInt.fromI32(0);
  hexStake.hdrnMintedDays = BigInt.fromI32(0);

  owner.save();
  hexStake.save();
}

export function handleStakeEnd(event: StakeEnd): void {
  let hexStakeId = event.params.stakeId.toHexString();
  let hexStake = HEXStake.load(hexStakeId);

  if (hexStake) {
    let rawData0 = event.params.data0;
    let rawData1 = event.params.data1;
    let packedData0 = bigIntToBinaryStr(rawData0);
    let packedData1 = bigIntToBinaryStr(rawData1);
    let data = new StakeEndData(packedData0, packedData1);

    hexStake.isActive = false;
    hexStake.stakeEndDayActual = hexDayFromTimestamp(data.getTimestamp());

    hexStake.stakePayout = data.getPayout();
    hexStake.stakePenalty = data.getPenalty();

    hexStake.save();
  }
}

export function handleStakeGoodAccounting(event: StakeGoodAccounting): void {
  let hexStakeId = event.params.stakeId.toHexString();
  let hexStake = HEXStake.load(hexStakeId);

  if (hexStake) {
    let rawData0 = event.params.data0;
    let rawData1 = event.params.data1;
    let packedData0 = bigIntToBinaryStr(rawData0);
    let packedData1 = bigIntToBinaryStr(rawData1);
    let data = new StakeGoodAccountingData(packedData0, packedData1);

    hexStake.isGoodAccounted = true;
    hexStake.stakeEndDayActual = hexDayFromTimestamp(data.getTimestamp());
    hexStake.stakePayout = data.getPayout();
    hexStake.stakePenalty = data.getPenalty();

    hexStake.save();
  }
}