import {
  BigInt
} from "@graphprotocol/graph-ts"

import {
  binaryStrToBigInt
} from "../utils"

export class ClaimData {
  timestamp: BigInt //uint40
  stakeShares: BigInt //uint72
  launchBonus: BigInt //uint144

  constructor(data: string) {
    let timestamp = data.slice(-39);
    this.timestamp = binaryStrToBigInt(timestamp);

    let stakeShares = data.slice(-111, -40);
    this.stakeShares = binaryStrToBigInt(stakeShares);

    let launchBonus = data.slice(-255, -112);
    this.launchBonus = binaryStrToBigInt(launchBonus);
  }

  getTimestamp(): BigInt {
    return this.timestamp;
  }

  getStakeShares(): BigInt {
    return this.stakeShares;
  }

  getLaunchBonus(): BigInt {
    return this.launchBonus;
  }
}

export class MintData {
  timestamp: BigInt //uint40
  stakeShares: BigInt //uint72
  mintedDays: BigInt //uint16
  launchBonus: BigInt //uint8
  payout: BigInt //uint120

  constructor(data: string) {
    let timestamp = data.slice(-39);
    this.timestamp = binaryStrToBigInt(timestamp);

    let stakeShares = data.slice(-111, -40);
    this.stakeShares = binaryStrToBigInt(stakeShares);

    let mintedDays = data.slice(-127, -112);
    this.mintedDays = binaryStrToBigInt(mintedDays);

    let launchBonus = data.slice(-135, -128);
    this.launchBonus = binaryStrToBigInt(launchBonus);

    let payout = data.slice(-255, -136);
    this.payout = binaryStrToBigInt(payout);
  }

  getTimestamp(): BigInt {
    return this.timestamp;
  }

  getStakeShares(): BigInt {
    return this.stakeShares;
  }

  getMintedDays(): BigInt {
    return this.mintedDays;
  }

  getLaunchBonus(): BigInt {
    return this.launchBonus;
  }

  getPayout(): BigInt {
    return this.payout;
  }
}

export class LoanStartData {
  timestamp: BigInt //uint40
  stakeShares: BigInt //uint72
  loanedDays: BigInt //uint16
  interestRate: BigInt //uint32
  loanAmount: BigInt //uint96

  constructor(data: string) {
    let timestamp = data.slice(-39);
    this.timestamp = binaryStrToBigInt(timestamp);

    let stakeShares = data.slice(-111, -40);
    this.stakeShares = binaryStrToBigInt(stakeShares);

    let loanedDays = data.slice(-127, -112);
    this.loanedDays = binaryStrToBigInt(loanedDays);

    let interestRate = data.slice(-159, -128);
    this.interestRate = binaryStrToBigInt(interestRate);

    let loanAmount = data.slice(-255, -160);
    this.loanAmount = binaryStrToBigInt(loanAmount);
  }

  getTimestamp(): BigInt {
    return this.timestamp;
  }

  getStakeShares(): BigInt {
    return this.stakeShares;
  }

  getLoanedDays(): BigInt {
    return this.loanedDays;
  }

  getInterestRate(): BigInt {
    return this.interestRate;
  }

  getLoanAmount(): BigInt {
    return this.loanAmount;
  }
}

export class LoanPaymentData {
  timestamp: BigInt //uint40
  stakeShares: BigInt //uint72
  loanedDays: BigInt //uint16
  interestRate: BigInt //uint32
  paymentsMade: BigInt //uint8
  paymentAmount: BigInt //uint88

  constructor(data: string) {
    let timestamp = data.slice(-39);
    this.timestamp = binaryStrToBigInt(timestamp);

    let stakeShares = data.slice(-111, -40);
    this.stakeShares = binaryStrToBigInt(stakeShares);

    let loanedDays = data.slice(-127, -112);
    this.loanedDays = binaryStrToBigInt(loanedDays);

    let interestRate = data.slice(-159, -128);
    this.interestRate = binaryStrToBigInt(interestRate);

    let paymentsMade = data.slice(-167, -160);
    this.paymentsMade = binaryStrToBigInt(paymentsMade);

    let paymentAmount = data.slice(-255, -168);
    this.paymentAmount = binaryStrToBigInt(paymentAmount);
  }

  getTimestamp(): BigInt {
    return this.timestamp;
  }

  getStakeShares(): BigInt {
    return this.stakeShares;
  }

  getLoanedDays(): BigInt {
    return this.loanedDays;
  }

  getInterestRate(): BigInt {
    return this.interestRate;
  }

  getPaymentsMade(): BigInt {
    return this.paymentsMade;
  }

  getPaymentAmount(): BigInt {
    return this.paymentAmount;
  }
}

export class LoanEndData {
  timestamp: BigInt //uint40
  stakeShares: BigInt //uint72
  loanedDays: BigInt //uint16
  interestRate: BigInt //uint32
  paymentsMade: BigInt //uint8
  payoff: BigInt //uint88

  constructor(data: string) {
    let timestamp = data.slice(-39);
    this.timestamp = binaryStrToBigInt(timestamp);

    let stakeShares = data.slice(-111, -40);
    this.stakeShares = binaryStrToBigInt(stakeShares);

    let loanedDays = data.slice(-127, -112);
    this.loanedDays = binaryStrToBigInt(loanedDays);

    let interestRate = data.slice(-159, -128);
    this.interestRate = binaryStrToBigInt(interestRate);

    let paymentsMade = data.slice(-167, -160);
    this.paymentsMade = binaryStrToBigInt(paymentsMade);

    let payoff = data.slice(-255, -168);
    this.payoff = binaryStrToBigInt(payoff);
  }

  getTimestamp(): BigInt {
    return this.timestamp;
  }

  getStakeShares(): BigInt {
    return this.stakeShares;
  }

  getLoanedDays(): BigInt {
    return this.loanedDays;
  }

  getInterestRate(): BigInt {
    return this.interestRate;
  }

  getPaymentsMade(): BigInt {
    return this.paymentsMade;
  }

  getPayoff(): BigInt {
    return this.payoff;
  }
}

export class LiquidationStartData {
  timestamp: BigInt //uint40
  stakeShares: BigInt //uint72
  loanedDays: BigInt //uint16
  interestRate: BigInt //uint32
  paymentsMade: BigInt //uint8
  startingBid: BigInt //uint88

  constructor(data: string) {
    let timestamp = data.slice(-39);
    this.timestamp = binaryStrToBigInt(timestamp);

    let stakeShares = data.slice(-111, -40);
    this.stakeShares = binaryStrToBigInt(stakeShares);

    let loanedDays = data.slice(-127, -112);
    this.loanedDays = binaryStrToBigInt(loanedDays);

    let interestRate = data.slice(-159, -128);
    this.interestRate = binaryStrToBigInt(interestRate);

    let paymentsMade = data.slice(-167, -160);
    this.paymentsMade = binaryStrToBigInt(paymentsMade);

    let startingBid = data.slice(-255, -168);
    this.startingBid = binaryStrToBigInt(startingBid);
  }

  getTimestamp(): BigInt {
    return this.timestamp;
  }

  getStakeShares(): BigInt {
    return this.stakeShares;
  }

  getLoanedDays(): BigInt {
    return this.loanedDays;
  }

  getInterestRate(): BigInt {
    return this.interestRate;
  }

  getPaymentsMade(): BigInt {
    return this.paymentsMade;
  }

  getStartingBid(): BigInt {
    return this.startingBid;
  }
}

export class LiquidationBidData {
  timestamp: BigInt //uint40
  bidAmount: BigInt //uint216

  constructor(data: string) {
    let timestamp = data.slice(-39);
    this.timestamp = binaryStrToBigInt(timestamp);

    let bidAmount = data.slice(-255, -40);
    this.bidAmount = binaryStrToBigInt(bidAmount);
  }

  getTimestamp(): BigInt {
    return this.timestamp;
  }

  getBidAmount(): BigInt {
    return this.bidAmount;
  }
}

export class LiquidationExitData {
  timestamp: BigInt //uint40
  finalBid: BigInt //uint216

  constructor(data: string) {
    let timestamp = data.slice(-39);
    this.timestamp = binaryStrToBigInt(timestamp);

    let finalBid = data.slice(-255, -40);
    this.finalBid = binaryStrToBigInt(finalBid);
  }

  getTimestamp(): BigInt {
    return this.timestamp;
  }

  getFinalBid(): BigInt {
    return this.finalBid;
  }
}