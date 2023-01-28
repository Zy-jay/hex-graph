import {
  BigInt
} from "@graphprotocol/graph-ts"

import {
  binaryStrToBigInt,
  binaryStrToBoolean
} from "../utils"

export class StakeStartData {
  timestamp: BigInt; // uint40
  stakedHearts: BigInt; // uint72
  stakeShares: BigInt; // uint72
  stakedDays: BigInt; // uint16
  isAutoStake: boolean; // uint8

  constructor(data: string) {
    let timestamp = data.slice(-39);
    this.timestamp = binaryStrToBigInt(timestamp);

    let stakedHearts = data.slice(-111, -40);
    this.stakedHearts = binaryStrToBigInt(stakedHearts);

    let stakeShares = data.slice(-183, -112);
    this.stakeShares = binaryStrToBigInt(stakeShares);

    let stakedDays = data.slice(-199, -184);
    this.stakedDays = binaryStrToBigInt(stakedDays);

    let isAutoStake = data.slice(-207, -200);
    this.isAutoStake = binaryStrToBoolean(isAutoStake);
  }

  getTimestamp(): BigInt {
    return this.timestamp;
  }
  getStakedHearts(): BigInt {
    return this.stakedHearts;
  }
  getStakedShares(): BigInt {
    return this.stakeShares;
  }
  getStakedDays(): BigInt {
    return this.stakedDays;
  }
  getIsAutoStake(): boolean {
    return this.isAutoStake;
  }
}

export class StakeEndData {
  timestamp: BigInt; // uint40
  stakedHearts: BigInt; // uint72
  stakeShares: BigInt; // uint72
  payout: BigInt; // uint72
  penalty: BigInt; // uint72
  servedDays: BigInt; // uint16
  prevUnlocked: boolean; // uint8

  constructor(data0: string, data1: string) {
    let timestamp = data0.slice(-39);
    this.timestamp = binaryStrToBigInt(timestamp);

    let stakedHearts = data0.slice(-111, -40);
    this.stakedHearts = binaryStrToBigInt(stakedHearts);

    let stakeShares = data0.slice(-183, -112);
    this.stakeShares = binaryStrToBigInt(stakeShares);

    let payout = data0.slice(-255, -184);
    this.payout = binaryStrToBigInt(payout);

    let penalty = data1.slice(-71);
    this.penalty = binaryStrToBigInt(penalty);

    let servedDays = data1.slice(-87, -72);
    this.servedDays = binaryStrToBigInt(servedDays);

    let prevUnlocked = data1.slice(-95, -88);
    this.prevUnlocked = binaryStrToBoolean(prevUnlocked);
  }

  getTimestamp(): BigInt {
    return this.timestamp;
  }
  getStakedHearts(): BigInt {
    return this.stakedHearts;
  }
  getStakedShares(): BigInt {
    return this.stakeShares;
  }
  getPayout(): BigInt {
    return this.payout;
  }
  getPenalty(): BigInt {
    return this.penalty;
  }
  getServedDays(): BigInt {
    return this.servedDays;
  }
  getPrevUnlocked(): boolean {
    return this.prevUnlocked;
  }
}

export class StakeGoodAccountingData {
  timestamp: BigInt; // uint40
  stakedHearts: BigInt; // uint72
  stakeShares: BigInt; // uint72
  payout: BigInt; // uint72
  penalty: BigInt; // uint72

  constructor(data0: string, data1: string) {
    let timestamp = data0.slice(-39);
    this.timestamp = binaryStrToBigInt(timestamp);

    let stakedHearts = data0.slice(-111, -40);
    this.stakedHearts = binaryStrToBigInt(stakedHearts);

    let stakeShares = data0.slice(-183, -112);
    this.stakeShares = binaryStrToBigInt(stakeShares);

    let payout = data0.slice(-255, -184);
    this.payout = binaryStrToBigInt(payout);

    let penalty = data1.slice(-71);
    this.penalty = binaryStrToBigInt(penalty);
  }

  getTimestamp(): BigInt {
    return this.timestamp;
  }
  getStakedHearts(): BigInt {
    return this.stakedHearts;
  }
  getStakedShares(): BigInt {
    return this.stakeShares;
  }
  getPayout(): BigInt {
    return this.payout;
  }
  getPenalty(): BigInt {
    return this.penalty;
  }
}