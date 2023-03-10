import {
  PledgeHEXCall
} from '../generated/MAXI/MAXI'

import {
  Owner
} from "../generated/schema"


export function handleInitialize(call: PledgeHEXCall): void {
  let ownerId = call.from.toHexString();
  let owner = Owner.load(ownerId);

  if (!owner) {
    owner = new Owner(ownerId);
    owner.hasMintedHdrn = false;
    owner.hasMintedMaxi = false;
    owner.hasMintedPlsd = false;
  }

  if (!owner.hasMintedMaxi) {
    owner.hasMintedMaxi = true;
  }
  
  owner.maxiMintAmount ?
    owner.maxiMintAmount!.plus(call.inputs.amount) :
    call.inputs.amount;

  owner.save();
}

export function handlePledgeHEX(event: PledgeHEXCall): void {}