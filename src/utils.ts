import {
  Address,
  BigInt
} from "@graphprotocol/graph-ts"

import {
  Gnosis111
} from "../generated/Gnosis111/Gnosis111"

export function bigIntToBinaryStr(input: BigInt): string {
  const zero = BigInt.fromI32(0);
  const two = BigInt.fromI32(2);
  let output = "";

  while (input.gt(zero)) {
    if (input.mod(two) === zero) {
      output = "0" + output;
    } else {
      output = "1" + output;
    }
    input = input.div(two);
  }

  while (output.length < 256) {
    output = "0" + output;
  }

  return output;
}

export function binaryStrToBigInt(binaryStr: string): BigInt {
  let decString = parseInt(binaryStr, 2).toString();
  let intString = decString.split('.');

  if (intString[0] === "NaN") {
    return BigInt.fromI32(0);
  }

  return BigInt.fromString(intString[0]);
}

export function binaryStrToBoolean(binaryStr: string): boolean {
  let decString = parseInt(binaryStr, 2);
  
  if (decString === 1) return true;
  return false;
}

export function hexDayFromTimestamp(number: BigInt): BigInt {
  const hexLaunch = new Date( < i64 > (1575331200 * 1000));
  let timestamp = new Date( < i64 > (parseInt(number.toString(), 10) * 1000));
  let timeDelta = timestamp.getTime() - hexLaunch.getTime();
  let hexDayFlt = < f64 > (timeDelta / (1000 * 3600 * 24));
  let hexDayStr = hexDayFlt.toString();
  let hexDay = hexDayStr.split('.');

  return BigInt.fromString(hexDay[0]);
}

export function hedronDayFromTimestamp(number: BigInt): BigInt {
  const hdrnLaunch = new Date( < i64 > (1645833600 * 1000));
  let timestamp = new Date( < i64 > (parseInt(number.toString(), 10) * 1000));
  let timeDelta = timestamp.getTime() - hdrnLaunch.getTime();
  let hdrnDayFlt = < f64 > (timeDelta / (1000 * 3600 * 24));
  let hdrnDayStr = hdrnDayFlt.toString();
  let hdrnDay = hdrnDayStr.split('.');

  return BigInt.fromString(hdrnDay[0]);
}

// only checking for Gnosis Safe 1.1.1, as this is what Staker.app uses.
// If that ever changes, this will have to be revisited.
export function isGnosisSafe(address: Address): boolean {
  let contract = Gnosis111.bind(address);
  let tryName  = contract.try_NAME();
  let tryVersion = contract.try_VERSION();

  if (tryName.reverted || tryVersion.reverted) {
    return false;
  }

  else if (tryName.value === "Gnosis Safe" && tryVersion.value === "1.1.1") {
    return true;
  }

  return false;
}