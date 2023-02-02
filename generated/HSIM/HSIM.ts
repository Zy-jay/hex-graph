// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get approved(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ApprovalForAll extends ethereum.Event {
  get params(): ApprovalForAll__Params {
    return new ApprovalForAll__Params(this);
  }
}

export class ApprovalForAll__Params {
  _event: ApprovalForAll;

  constructor(event: ApprovalForAll) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get operator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get approved(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class HSIDetokenize extends ethereum.Event {
  get params(): HSIDetokenize__Params {
    return new HSIDetokenize__Params(this);
  }
}

export class HSIDetokenize__Params {
  _event: HSIDetokenize;

  constructor(event: HSIDetokenize) {
    this._event = event;
  }

  get timestamp(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get hsiTokenId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get hsiAddress(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get staker(): Address {
    return this._event.parameters[3].value.toAddress();
  }
}

export class HSIEnd extends ethereum.Event {
  get params(): HSIEnd__Params {
    return new HSIEnd__Params(this);
  }
}

export class HSIEnd__Params {
  _event: HSIEnd;

  constructor(event: HSIEnd) {
    this._event = event;
  }

  get timestamp(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get hsiAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get staker(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class HSIStart extends ethereum.Event {
  get params(): HSIStart__Params {
    return new HSIStart__Params(this);
  }
}

export class HSIStart__Params {
  _event: HSIStart;

  constructor(event: HSIStart) {
    this._event = event;
  }

  get timestamp(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get hsiAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get staker(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class HSITokenize extends ethereum.Event {
  get params(): HSITokenize__Params {
    return new HSITokenize__Params(this);
  }
}

export class HSITokenize__Params {
  _event: HSITokenize;

  constructor(event: HSITokenize) {
    this._event = event;
  }

  get timestamp(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get hsiTokenId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get hsiAddress(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get staker(): Address {
    return this._event.parameters[3].value.toAddress();
  }
}

export class HSITransfer extends ethereum.Event {
  get params(): HSITransfer__Params {
    return new HSITransfer__Params(this);
  }
}

export class HSITransfer__Params {
  _event: HSITransfer;

  constructor(event: HSITransfer) {
    this._event = event;
  }

  get timestamp(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get hsiAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get oldStaker(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get newStaker(): Address {
    return this._event.parameters[3].value.toAddress();
  }
}

export class RoyaltiesSet extends ethereum.Event {
  get params(): RoyaltiesSet__Params {
    return new RoyaltiesSet__Params(this);
  }
}

export class RoyaltiesSet__Params {
  _event: RoyaltiesSet;

  constructor(event: RoyaltiesSet) {
    this._event = event;
  }

  get tokenId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get royalties(): Array<RoyaltiesSetRoyaltiesStruct> {
    return this._event.parameters[1].value.toTupleArray<
      RoyaltiesSetRoyaltiesStruct
    >();
  }
}

export class RoyaltiesSetRoyaltiesStruct extends ethereum.Tuple {
  get account(): Address {
    return this[0].toAddress();
  }

  get value(): BigInt {
    return this[1].toBigInt();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class HSIM__getRaribleV2RoyaltiesResultValue0Struct extends ethereum.Tuple {
  get account(): Address {
    return this[0].toAddress();
  }

  get value(): BigInt {
    return this[1].toBigInt();
  }
}

export class HSIM__royaltyInfoResult {
  value0: Address;
  value1: BigInt;

  constructor(value0: Address, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }

  getReceiver(): Address {
    return this.value0;
  }

  getRoyaltyAmount(): BigInt {
    return this.value1;
  }
}

export class HSIM__stakeListsResultValue0Struct extends ethereum.Tuple {
  get stakeId(): BigInt {
    return this[0].toBigInt();
  }

  get stakedHearts(): BigInt {
    return this[1].toBigInt();
  }

  get stakeShares(): BigInt {
    return this[2].toBigInt();
  }

  get lockedDay(): i32 {
    return this[3].toI32();
  }

  get stakedDays(): i32 {
    return this[4].toI32();
  }

  get unlockedDay(): i32 {
    return this[5].toI32();
  }

  get isAutoStake(): boolean {
    return this[6].toBoolean();
  }
}

export class HSIM extends ethereum.SmartContract {
  static bind(address: Address): HSIM {
    return new HSIM("HSIM", address);
  }

  balanceOf(owner: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(owner: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getApproved(tokenId: BigInt): Address {
    let result = super.call("getApproved", "getApproved(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_getApproved(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getApproved",
      "getApproved(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getRaribleV2Royalties(
    id: BigInt
  ): Array<HSIM__getRaribleV2RoyaltiesResultValue0Struct> {
    let result = super.call(
      "getRaribleV2Royalties",
      "getRaribleV2Royalties(uint256):((address,uint96)[])",
      [ethereum.Value.fromUnsignedBigInt(id)]
    );

    return result[0].toTupleArray<
      HSIM__getRaribleV2RoyaltiesResultValue0Struct
    >();
  }

  try_getRaribleV2Royalties(
    id: BigInt
  ): ethereum.CallResult<Array<HSIM__getRaribleV2RoyaltiesResultValue0Struct>> {
    let result = super.tryCall(
      "getRaribleV2Royalties",
      "getRaribleV2Royalties(uint256):((address,uint96)[])",
      [ethereum.Value.fromUnsignedBigInt(id)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTupleArray<HSIM__getRaribleV2RoyaltiesResultValue0Struct>()
    );
  }

  hexStakeDetokenize(tokenId: BigInt): Address {
    let result = super.call(
      "hexStakeDetokenize",
      "hexStakeDetokenize(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(tokenId)]
    );

    return result[0].toAddress();
  }

  try_hexStakeDetokenize(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "hexStakeDetokenize",
      "hexStakeDetokenize(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  hexStakeEnd(hsiIndex: BigInt, hsiAddress: Address): BigInt {
    let result = super.call(
      "hexStakeEnd",
      "hexStakeEnd(uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(hsiIndex),
        ethereum.Value.fromAddress(hsiAddress)
      ]
    );

    return result[0].toBigInt();
  }

  try_hexStakeEnd(
    hsiIndex: BigInt,
    hsiAddress: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "hexStakeEnd",
      "hexStakeEnd(uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(hsiIndex),
        ethereum.Value.fromAddress(hsiAddress)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  hexStakeStart(amount: BigInt, length: BigInt): Address {
    let result = super.call(
      "hexStakeStart",
      "hexStakeStart(uint256,uint256):(address)",
      [
        ethereum.Value.fromUnsignedBigInt(amount),
        ethereum.Value.fromUnsignedBigInt(length)
      ]
    );

    return result[0].toAddress();
  }

  try_hexStakeStart(
    amount: BigInt,
    length: BigInt
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "hexStakeStart",
      "hexStakeStart(uint256,uint256):(address)",
      [
        ethereum.Value.fromUnsignedBigInt(amount),
        ethereum.Value.fromUnsignedBigInt(length)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  hexStakeTokenize(hsiIndex: BigInt, hsiAddress: Address): BigInt {
    let result = super.call(
      "hexStakeTokenize",
      "hexStakeTokenize(uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(hsiIndex),
        ethereum.Value.fromAddress(hsiAddress)
      ]
    );

    return result[0].toBigInt();
  }

  try_hexStakeTokenize(
    hsiIndex: BigInt,
    hsiAddress: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "hexStakeTokenize",
      "hexStakeTokenize(uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(hsiIndex),
        ethereum.Value.fromAddress(hsiAddress)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  hsiCount(user: Address): BigInt {
    let result = super.call("hsiCount", "hsiCount(address):(uint256)", [
      ethereum.Value.fromAddress(user)
    ]);

    return result[0].toBigInt();
  }

  try_hsiCount(user: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("hsiCount", "hsiCount(address):(uint256)", [
      ethereum.Value.fromAddress(user)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  hsiLists(param0: Address, param1: BigInt): Address {
    let result = super.call("hsiLists", "hsiLists(address,uint256):(address)", [
      ethereum.Value.fromAddress(param0),
      ethereum.Value.fromUnsignedBigInt(param1)
    ]);

    return result[0].toAddress();
  }

  try_hsiLists(param0: Address, param1: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "hsiLists",
      "hsiLists(address,uint256):(address)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  hsiToken(param0: BigInt): Address {
    let result = super.call("hsiToken", "hsiToken(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toAddress();
  }

  try_hsiToken(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("hsiToken", "hsiToken(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  isApprovedForAll(owner: Address, operator: Address): boolean {
    let result = super.call(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );

    return result[0].toBoolean();
  }

  try_isApprovedForAll(
    owner: Address,
    operator: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  ownerOf(tokenId: BigInt): Address {
    let result = super.call("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_ownerOf(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  royaltyInfo(tokenId: BigInt, salePrice: BigInt): HSIM__royaltyInfoResult {
    let result = super.call(
      "royaltyInfo",
      "royaltyInfo(uint256,uint256):(address,uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(tokenId),
        ethereum.Value.fromUnsignedBigInt(salePrice)
      ]
    );

    return new HSIM__royaltyInfoResult(
      result[0].toAddress(),
      result[1].toBigInt()
    );
  }

  try_royaltyInfo(
    tokenId: BigInt,
    salePrice: BigInt
  ): ethereum.CallResult<HSIM__royaltyInfoResult> {
    let result = super.tryCall(
      "royaltyInfo",
      "royaltyInfo(uint256,uint256):(address,uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(tokenId),
        ethereum.Value.fromUnsignedBigInt(salePrice)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new HSIM__royaltyInfoResult(value[0].toAddress(), value[1].toBigInt())
    );
  }

  stakeCount(user: Address): BigInt {
    let result = super.call("stakeCount", "stakeCount(address):(uint256)", [
      ethereum.Value.fromAddress(user)
    ]);

    return result[0].toBigInt();
  }

  try_stakeCount(user: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("stakeCount", "stakeCount(address):(uint256)", [
      ethereum.Value.fromAddress(user)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  stakeLists(
    user: Address,
    hsiIndex: BigInt
  ): HSIM__stakeListsResultValue0Struct {
    let result = super.call(
      "stakeLists",
      "stakeLists(address,uint256):((uint40,uint72,uint72,uint16,uint16,uint16,bool))",
      [
        ethereum.Value.fromAddress(user),
        ethereum.Value.fromUnsignedBigInt(hsiIndex)
      ]
    );

    return changetype<HSIM__stakeListsResultValue0Struct>(result[0].toTuple());
  }

  try_stakeLists(
    user: Address,
    hsiIndex: BigInt
  ): ethereum.CallResult<HSIM__stakeListsResultValue0Struct> {
    let result = super.tryCall(
      "stakeLists",
      "stakeLists(address,uint256):((uint40,uint72,uint72,uint16,uint16,uint16,bool))",
      [
        ethereum.Value.fromAddress(user),
        ethereum.Value.fromUnsignedBigInt(hsiIndex)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<HSIM__stakeListsResultValue0Struct>(value[0].toTuple())
    );
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  tokenByIndex(index: BigInt): BigInt {
    let result = super.call("tokenByIndex", "tokenByIndex(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(index)
    ]);

    return result[0].toBigInt();
  }

  try_tokenByIndex(index: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokenByIndex",
      "tokenByIndex(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(index)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenOfOwnerByIndex(owner: Address, index: BigInt): BigInt {
    let result = super.call(
      "tokenOfOwnerByIndex",
      "tokenOfOwnerByIndex(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(owner),
        ethereum.Value.fromUnsignedBigInt(index)
      ]
    );

    return result[0].toBigInt();
  }

  try_tokenOfOwnerByIndex(
    owner: Address,
    index: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokenOfOwnerByIndex",
      "tokenOfOwnerByIndex(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(owner),
        ethereum.Value.fromUnsignedBigInt(index)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenURI(tokenId: BigInt): string {
    let result = super.call("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toString();
  }

  try_tokenURI(tokenId: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  totalSupply(): BigInt {
    let result = super.call("totalSupply", "totalSupply():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalSupply(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalSupply", "totalSupply():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get hexAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }
}

export class HexStakeDetokenizeCall extends ethereum.Call {
  get inputs(): HexStakeDetokenizeCall__Inputs {
    return new HexStakeDetokenizeCall__Inputs(this);
  }

  get outputs(): HexStakeDetokenizeCall__Outputs {
    return new HexStakeDetokenizeCall__Outputs(this);
  }
}

export class HexStakeDetokenizeCall__Inputs {
  _call: HexStakeDetokenizeCall;

  constructor(call: HexStakeDetokenizeCall) {
    this._call = call;
  }

  get tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class HexStakeDetokenizeCall__Outputs {
  _call: HexStakeDetokenizeCall;

  constructor(call: HexStakeDetokenizeCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}

export class HexStakeEndCall extends ethereum.Call {
  get inputs(): HexStakeEndCall__Inputs {
    return new HexStakeEndCall__Inputs(this);
  }

  get outputs(): HexStakeEndCall__Outputs {
    return new HexStakeEndCall__Outputs(this);
  }
}

export class HexStakeEndCall__Inputs {
  _call: HexStakeEndCall;

  constructor(call: HexStakeEndCall) {
    this._call = call;
  }

  get hsiIndex(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get hsiAddress(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class HexStakeEndCall__Outputs {
  _call: HexStakeEndCall;

  constructor(call: HexStakeEndCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class HexStakeStartCall extends ethereum.Call {
  get inputs(): HexStakeStartCall__Inputs {
    return new HexStakeStartCall__Inputs(this);
  }

  get outputs(): HexStakeStartCall__Outputs {
    return new HexStakeStartCall__Outputs(this);
  }
}

export class HexStakeStartCall__Inputs {
  _call: HexStakeStartCall;

  constructor(call: HexStakeStartCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get length(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class HexStakeStartCall__Outputs {
  _call: HexStakeStartCall;

  constructor(call: HexStakeStartCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}

export class HexStakeTokenizeCall extends ethereum.Call {
  get inputs(): HexStakeTokenizeCall__Inputs {
    return new HexStakeTokenizeCall__Inputs(this);
  }

  get outputs(): HexStakeTokenizeCall__Outputs {
    return new HexStakeTokenizeCall__Outputs(this);
  }
}

export class HexStakeTokenizeCall__Inputs {
  _call: HexStakeTokenizeCall;

  constructor(call: HexStakeTokenizeCall) {
    this._call = call;
  }

  get hsiIndex(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get hsiAddress(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class HexStakeTokenizeCall__Outputs {
  _call: HexStakeTokenizeCall;

  constructor(call: HexStakeTokenizeCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class HsiTransferCall extends ethereum.Call {
  get inputs(): HsiTransferCall__Inputs {
    return new HsiTransferCall__Inputs(this);
  }

  get outputs(): HsiTransferCall__Outputs {
    return new HsiTransferCall__Outputs(this);
  }
}

export class HsiTransferCall__Inputs {
  _call: HsiTransferCall;

  constructor(call: HsiTransferCall) {
    this._call = call;
  }

  get currentHolder(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get hsiIndex(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get hsiAddress(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get newHolder(): Address {
    return this._call.inputValues[3].value.toAddress();
  }
}

export class HsiTransferCall__Outputs {
  _call: HsiTransferCall;

  constructor(call: HsiTransferCall) {
    this._call = call;
  }
}

export class HsiUpdateCall extends ethereum.Call {
  get inputs(): HsiUpdateCall__Inputs {
    return new HsiUpdateCall__Inputs(this);
  }

  get outputs(): HsiUpdateCall__Outputs {
    return new HsiUpdateCall__Outputs(this);
  }
}

export class HsiUpdateCall__Inputs {
  _call: HsiUpdateCall;

  constructor(call: HsiUpdateCall) {
    this._call = call;
  }

  get holder(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get hsiIndex(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get hsiAddress(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get share(): HsiUpdateCallShareStruct {
    return changetype<HsiUpdateCallShareStruct>(
      this._call.inputValues[3].value.toTuple()
    );
  }
}

export class HsiUpdateCall__Outputs {
  _call: HsiUpdateCall;

  constructor(call: HsiUpdateCall) {
    this._call = call;
  }
}

export class HsiUpdateCallShareStruct extends ethereum.Tuple {
  get _stake(): HsiUpdateCallShare_stakeStruct {
    return changetype<HsiUpdateCallShare_stakeStruct>(this[0].toTuple());
  }

  get _mintedDays(): BigInt {
    return this[1].toBigInt();
  }

  get _launchBonus(): BigInt {
    return this[2].toBigInt();
  }

  get _loanStart(): BigInt {
    return this[3].toBigInt();
  }

  get _loanedDays(): BigInt {
    return this[4].toBigInt();
  }

  get _interestRate(): BigInt {
    return this[5].toBigInt();
  }

  get _paymentsMade(): BigInt {
    return this[6].toBigInt();
  }

  get _isLoaned(): boolean {
    return this[7].toBoolean();
  }
}

export class HsiUpdateCallShare_stakeStruct extends ethereum.Tuple {
  get stakeId(): BigInt {
    return this[0].toBigInt();
  }

  get stakeShares(): BigInt {
    return this[1].toBigInt();
  }

  get lockedDay(): i32 {
    return this[2].toI32();
  }

  get stakedDays(): i32 {
    return this[3].toI32();
  }
}

export class SafeTransferFromCall extends ethereum.Call {
  get inputs(): SafeTransferFromCall__Inputs {
    return new SafeTransferFromCall__Inputs(this);
  }

  get outputs(): SafeTransferFromCall__Outputs {
    return new SafeTransferFromCall__Outputs(this);
  }
}

export class SafeTransferFromCall__Inputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SafeTransferFromCall__Outputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }
}

export class SafeTransferFrom1Call extends ethereum.Call {
  get inputs(): SafeTransferFrom1Call__Inputs {
    return new SafeTransferFrom1Call__Inputs(this);
  }

  get outputs(): SafeTransferFrom1Call__Outputs {
    return new SafeTransferFrom1Call__Outputs(this);
  }
}

export class SafeTransferFrom1Call__Inputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _data(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class SafeTransferFrom1Call__Outputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }
}

export class SetApprovalForAllCall extends ethereum.Call {
  get inputs(): SetApprovalForAllCall__Inputs {
    return new SetApprovalForAllCall__Inputs(this);
  }

  get outputs(): SetApprovalForAllCall__Outputs {
    return new SetApprovalForAllCall__Outputs(this);
  }
}

export class SetApprovalForAllCall__Inputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }

  get operator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get approved(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetApprovalForAllCall__Outputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }
}
