import {
  Claim
} from '../generated/PLSD/PLSD'

import {
  Owner
} from "../generated/schema"


export function handleInitialize(event: Claim): void {
  let ownerId = event.params.to.toHexString()
  let owner = Owner.load(ownerId);

  if (!owner) {
    owner = new Owner(ownerId);
    owner.hasMintedHdrn = false;
    owner.hasMintedMaxi = false;
    owner.hasMintedPlsd = false;
  }

  if (!owner.hasMintedPlsd) {
    owner.hasMintedPlsd = true;
  }

  owner.maxiMintAmount ?
    owner.plsdMintAmount!.plus(event.params.amount) :
    event.params.amount;

  owner.save();
}

export function handleClaim(event: Claim): void {}