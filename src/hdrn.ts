import {
  Address,
  BigInt
} from "@graphprotocol/graph-ts"

import {
  HDRN,
  Claim,
  Mint,
  LoanStart,
  LoanPayment,
  LoanEnd,
  LoanLiquidateStart,
  LoanLiquidateBid,
  LoanLiquidateExit
} from "../generated/HDRN/HDRN"

import {
  Owner,
  HDRNLoan,
  HDRNLiquidation,
  HEXStake
} from "../generated/schema"

import {
  ClaimData,
  MintData,
  LoanStartData,
  LoanPaymentData,
  LoanEndData,
  LiquidationStartData,
  LiquidationBidData
} from './eventData/hedron'

import {
  bigIntToBinaryStr,
  hedronDayFromTimestamp,
  isGnosisSafe
} from "../src/utils"

export function handleClaim(event: Claim): void {
  let id = event.params.stakeId.toHexString();
  let hexStake = HEXStake.load(id);

  if (hexStake) {
    let rawData = event.params.data;
    let packedData = bigIntToBinaryStr(rawData);
    let data = new ClaimData(packedData);

    hexStake.hdrnLaunchBonus = data.getLaunchBonus();
    hexStake.hdrnMintedDays = BigInt.fromI32(0);

    hexStake.save();
  }
}

export function handleMint(event: Mint): void {
  let id = event.params.stakeId.toHexString();
  let hexStake = HEXStake.load(id);

  if (hexStake) {
    let rawData = event.params.data;
    let packedData = bigIntToBinaryStr(rawData);
    let data = new MintData(packedData);

    hexStake.hdrnLaunchBonus = data.getLaunchBonus();
    hexStake.hdrnMintedDays = data.getMintedDays();

    let owner = Owner.load(hexStake.owner);

    if (owner) {
      owner.hdrnMintAmount = data.getPayout();
      
      owner.save();
      hexStake.save();
    }
  }
}

export function handleLoanStart(event: LoanStart): void {
  let id = event.params.stakeId.toHexString();
  let loan = HDRNLoan.load(id);

  if (!loan) {
    loan = new HDRNLoan(id);
  }

  loan.hexStake = event.params.stakeId.toHexString();
  loan.borrower = event.params.borrower.toHexString();

  let rawData = event.params.data;
  let packedData = bigIntToBinaryStr(rawData);
  let data = new LoanStartData(packedData);

  loan.loanStartDay = hedronDayFromTimestamp(data.getTimestamp());
  loan.loanAmount = data.getLoanAmount();
  loan.loanedDays = data.getLoanedDays();
  loan.interestRate = data.getInterestRate();
  loan.paymentsMade = BigInt.fromI32(0);
  loan.paymentDueDay = loan.loanStartDay.plus(BigInt.fromI32(30));
  loan.liquidationDay = loan.loanStartDay.plus(BigInt.fromI32(90));
  loan.isActive = true;

  loan.save();
}

export function handleLoanPayment(event: LoanPayment): void {
  let id = event.params.stakeId.toHexString();
  let loan = HDRNLoan.load(id);

  if (loan) {
    let rawData = event.params.data;
    let packedData = bigIntToBinaryStr(rawData);
    let data = new LoanPaymentData(packedData);

    if (data.getPaymentsMade().times(BigInt.fromI32(30)).ge(loan.loanedDays)) {
      loan.previousBorrowers ?
        loan.previousBorrowers!.push(loan.borrower!) :
        new Array < string > ().push(loan.borrower!);

      loan.previousLoanAmounts ?
        loan.previousLoanAmounts!.push(loan.loanAmount) :
        new Array < BigInt > ().push(loan.loanAmount);

      loan.previousPaymentsMade ?
        loan.previousPaymentsMade!.push(data.getPaymentsMade()) :
        new Array < BigInt > ().push(data.getPaymentsMade());

      loan.previousLoanEndEvent ?
        loan.previousLoanEndEvent!.push("LoanPayment") :
        new Array < string > ().push("LoanPayment");

      loan.borrower = null;
      loan.isActive = false;
      loan.loanStartDay = BigInt.fromI32(0);
      loan.loanAmount = BigInt.fromI32(0);
      loan.loanedDays = BigInt.fromI32(0);
      loan.interestRate = BigInt.fromI32(0);
      loan.paymentsMade = BigInt.fromI32(0);
      loan.paymentDueDay = BigInt.fromI32(0);
      loan.liquidationDay = BigInt.fromI32(0);
    } else {
      loan.paymentsMade = data.getPaymentsMade();
      loan.paymentDueDay = loan.paymentDueDay.plus(BigInt.fromI32(30));
      loan.liquidationDay = loan.liquidationDay.plus(BigInt.fromI32(30));
    }

    loan.save();
  }
}

export function handleLoanEnd(event: LoanEnd): void {
  let id = event.params.stakeId.toHexString();
  let loan = HDRNLoan.load(id);

  if (loan) {
    let rawData = event.params.data;
    let packedData = bigIntToBinaryStr(rawData);
    let data = new LoanEndData(packedData);

    loan.previousBorrowers ?
      loan.previousBorrowers!.push(loan.borrower!) :
      new Array < string > ().push(loan.borrower!);

    loan.previousLoanAmounts ?
      loan.previousLoanAmounts!.push(loan.loanAmount) :
      new Array < BigInt > ().push(loan.loanAmount);

    loan.previousPaymentsMade ?
      loan.previousPaymentsMade!.push(data.getPaymentsMade()) :
      new Array < BigInt > ().push(data.getPaymentsMade());

    loan.previousLoanEndEvent ?
      loan.previousLoanEndEvent!.push("LoanEnd") :
      new Array < string > ().push("LoanEnd");

    loan.borrower = null;
    loan.isActive = false;
    loan.loanStartDay = BigInt.fromI32(0);
    loan.loanAmount = BigInt.fromI32(0);
    loan.loanedDays = BigInt.fromI32(0);
    loan.interestRate = BigInt.fromI32(0);
    loan.paymentsMade = BigInt.fromI32(0);
    loan.paymentDueDay = BigInt.fromI32(0);
    loan.liquidationDay = BigInt.fromI32(0);

    loan.save();
  }
}

export function handleLoanLiquidateStart(event: LoanLiquidateStart): void {
  let id = event.params.liquidationId.toHexString();
  let liquidation = HDRNLiquidation.load(id);

  if (!liquidation) {
    liquidation = new HDRNLiquidation(id);
  }

  let stakeId = event.params.stakeId.toHexString();
  let loan = HDRNLoan.load(stakeId);

  if (loan) {
    liquidation.loan = stakeId;
    liquidation.borrower = event.params.borrower.toHexString();
    liquidation.liquidationId = event.params.liquidationId;
    liquidation.isActive = true;

    let rawData = event.params.data;
    let packedData = bigIntToBinaryStr(rawData);
    let data = new LiquidationStartData(packedData);

    liquidation.liquidationStart = data.getTimestamp();
    liquidation.currentBid = data.getStartingBid();

    let ownerId = event.transaction.from.toHexString();
    let owner = Owner.load(ownerId);

    if (!owner) {
      owner = new Owner(ownerId);
      owner.isGnosisSafe = isGnosisSafe(event.transaction.from);
      owner.hasMintedHdrn = false;
      owner.hasMintedMaxi = false;
      owner.hasMintedPlsd = false;
    }

    liquidation.currentBidder = ownerId;
    liquidation.currentBidPlaced = data.getTimestamp();

    loan.previousBorrowers ?
      loan.previousBorrowers!.push(loan.borrower!) :
      new Array < string > ().push(loan.borrower!);

    loan.previousLoanAmounts ?
      loan.previousLoanAmounts!.push(loan.loanAmount) :
      new Array < BigInt > ().push(loan.loanAmount);

    loan.previousPaymentsMade ?
      loan.previousPaymentsMade!.push(data.getPaymentsMade()) :
      new Array < BigInt > ().push(data.getPaymentsMade());

    loan.previousLoanEndEvent ?
      loan.previousLoanEndEvent!.push("LoanLiquidateStart") :
      new Array < string > ().push("LoanLiquidateStart");

    loan.borrower = null;
    loan.isActive = false;
    loan.loanStartDay = BigInt.fromI32(0);
    loan.loanAmount = BigInt.fromI32(0);
    loan.loanedDays = BigInt.fromI32(0);
    loan.interestRate = BigInt.fromI32(0);
    loan.paymentsMade = BigInt.fromI32(0);
    loan.paymentDueDay = BigInt.fromI32(0);
    loan.liquidationDay = BigInt.fromI32(0);

    owner.save();
    liquidation.save();
    loan.save();
  }
}

export function handleLoanLiquidateBid(event: LoanLiquidateBid): void {
  let id = event.params.liquidationId.toHexString();
  let liquidation = HDRNLiquidation.load(id);

  if (liquidation) {
    let rawData = event.params.data;
    let packedData = bigIntToBinaryStr(rawData);
    let data = new LiquidationBidData(packedData);

    liquidation.previousBids ?
      liquidation.previousBids!.push(liquidation.currentBid) :
      new Array < BigInt > ().push(liquidation.currentBid);

    liquidation.previousBidders ?
      liquidation.previousBidders!.push(liquidation.currentBidder) :
      new Array < string > ().push(liquidation.currentBidder);

    liquidation.previousBidsPlaced ?
      liquidation.previousBidsPlaced!.push(liquidation.currentBidPlaced) :
      new Array < BigInt > ().push(liquidation.currentBidPlaced);

    let hedron = HDRN.bind(Address.fromString("0x3819f64f282bf135d62168C1e513280dAF905e06"));
    let liquidationEndOffest = hedron.liquidationList(event.params.liquidationId).getEndOffset();

    if (liquidationEndOffest.gt(BigInt.fromI32(0))) {
      liquidation.liquidationExtension = liquidationEndOffest;
    }

    liquidation.currentBid = data.getBidAmount();

    let ownerId = event.params.bidder.toHexString();
    let owner = Owner.load(ownerId);

    if (!owner) {
      owner = new Owner(ownerId);
      owner.isGnosisSafe = isGnosisSafe(event.params.bidder);
      owner.hasMintedHdrn = false;
      owner.hasMintedMaxi = false;
      owner.hasMintedPlsd = false;
    }

    liquidation.currentBidder = ownerId;
    liquidation.currentBidPlaced = data.getTimestamp();

    owner.save();
    liquidation.save();
  }
}

export function handleLoanLiquidateExit(event: LoanLiquidateExit): void {
  let id = event.params.liquidationId.toHexString();
  let liquidation = HDRNLiquidation.load(id);

  if (liquidation) {
    liquidation.isActive = false;
    liquidation.save();
  }
}